/**
 * Data Wey Talk — survey + quiz + Business Boss game + Find Distributors receiver.
 * Find Distributors: posts land in the "Distributors" tab, photos in a Drive folder.
 * A post only shows on the website after you type Yes in its "Approved?" column.
 * Once approved, the poster can edit or remove it from the website ("My posts"): they need the same email + phone
 * and their private edit code (emailed to them when they post). You get an email for every edit.
 * Type Yes in "Verified?" to give a post the ✔ Verified badge (after you've called them). It clears itself if they change the phone number.
 * "Report this post" lands in the "Reports" tab and emails you. Shops can also post what they are LOOKING FOR (Poster type = Buyer).
 * Quiz: each person can take it ONCE a month (checked by email/phone). Every attempt is recorded.
 * Quiz prize: ONE winner per month = the FIRST person that month to score above 80%.
 * The winner is recorded automatically in the "Winners" tab and you get an email.
 *
 * Paste into the Google Sheet: Extensions → Apps Script.
 * Deploy as a Web app (Execute as: Me, Who has access: Anyone).
 * After changing this code: Deploy → Manage deployments → Edit → New version.
 */
const PASS_MARK = 0.8;            // must score ABOVE this
const TZ = "Africa/Lagos";        // month boundaries use Lagos time
// Who gets the "we have a winner" email. You can list several, separated by commas.
const NOTIFY_EMAIL = "scitylanaltd@gmail.com";

const SHEETS = {
  survey: {
    name: "Responses",
    headers: ["Received at", "Name", "Email", "Phone / WhatsApp", "Country", "City",
      "Goals", "Business type", "Business size", "Analyst level", "Language", "Consent", "Submitted at (device)"],
  },
  quiz: {
    name: "Quiz Entries",
    headers: ["Received at", "Month", "Name", "Email", "Phone / WhatsApp", "Score", "Out of", "Percent",
      "Language", "Consent", "Winner?", "Submitted at (device)"],
  },
  winners: {
    name: "Winners",
    headers: ["Won at", "Month", "Name", "Email", "Phone / WhatsApp", "Score", "Prize sent? (fill in)"],
  },
  game: {
    name: "Game Plays",
    headers: ["Received at", "Event", "Name", "Email", "Phone / WhatsApp", "Country", "Business name", "Business type",
      "Currency", "Period", "Sales", "Costs", "Profit", "Margin %", "Customers", "Profit goal", "Health score",
      "Language", "Submitted at (device)"],
  },
  listing: {
    name: "Distributors",
    headers: ["Received at", "ID", "Approved? (type Yes)", "Business name", "Contact name", "Public WhatsApp / phone",
      "Email (private)", "Account phone (private)", "Country", "City", "Product", "Description", "Units per case",
      "Cost per case", "Selling price per unit", "Currency", "Minimum order (cases)", "Photo link", "Language", "Submitted at (device)", "Poster type", "Edit key (private)", "Last edited by poster", "Verified? (type Yes)"],
  },
  reports: {
    name: "Reports",
    headers: ["Received at", "Post ID", "Product", "Business", "Reason", "Details", "Reporter name", "Reporter email", "Reporter phone", "Done? (fill in)"],
  },
};
const PHOTO_FOLDER = "Data Wey Talk – Product photos";
const MAX_PHOTO_CHARS = 1500000;   // ~1 MB picture (the site shrinks photos before sending)

function thisMonth_() { return Utilities.formatDate(new Date(), TZ, "yyyy-MM"); }

// Sheets turns "2026-11" into a date by itself, so read the month back either way.
function monthOf_(v) {
  return v instanceof Date ? Utilities.formatDate(v, TZ, "yyyy-MM") : String(v).replace(/^'/, "").trim();
}
// Write the month with a leading ' so Sheets keeps it as plain text.
function monthCell_(month) { return "'" + month; }

function monthWinner_(month) {
  const rows = sheet_("winners").getDataRange().getValues().slice(1);
  return rows.find((r) => monthOf_(r[1]) === month) || null;
}

/** GET ?status=1 → { month, claimed } so the site can say if this month's prize is gone. */
function doGet(e) {
  // ?check=mail → is this deployment allowed to send email? (sends nothing, writes nothing)
  if (e && e.parameter && e.parameter.check === "mail") {
    try { return json({ ok: true, mail: "allowed", quotaLeft: MailApp.getRemainingDailyQuota() }); }
    catch (err) { return json({ ok: true, mail: "NOT allowed", error: String(err).slice(0, 120) }); }
  }
  // ?listings=1 → approved Find Distributors posts (public details only, never the email)
  if (e && e.parameter && e.parameter.listings) return json({ ok: true, listings: approvedListings_() });
  const month = thisMonth_();
  return json({ ok: true, month: month, claimed: !!monthWinner_(month) });
}

function approvedListings_() {
  const rows = sheet_("listing").getDataRange().getValues().slice(1);
  return rows.filter((r) => isYes_(r[2])).map((r) => ({
    id: String(r[1]), date: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
    business: plain_(r[3]), contact: plain_(r[4]), phone: plain_(r[5]), country: plain_(r[8]), city: plain_(r[9]),
    product: plain_(r[10]), description: plain_(r[11]), units: Number(r[12]) || 1, cost: Number(r[13]) || 0,
    price: Number(r[14]) || 0, currency: plain_(r[15]), minOrder: Number(r[16]) || 0, photo: plain_(r[17]),
    role: roleOf_(r[20]), verified: isYes_(r[23]),
  })).reverse().slice(0, 300);
}
const ROLE_TEXT = { importer: "Importer looking for distributors", buyer: "Buyer looking for a product", distributor: "Distributor selling" };
function roleOf_(v) { v = String(v); return /importer/i.test(v) ? "importer" : /buyer/i.test(v) ? "buyer" : "distributor"; }
function roleText_(role) { return ROLE_TEXT[role] || ROLE_TEXT.distributor; }

// Undo the ' that clean() adds in front of values starting with = + - @
function plain_(v) { return String(v == null ? "" : v).replace(/^'/, ""); }

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);                       // one at a time, so two people can't both be "first"
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (d.website) return json({ ok: true });                 // honeypot: bot, ignore quietly
    if (!d.email || !d.phone || d.consent !== true) return json({ ok: false, error: "missing fields" });

    if (d.type === "quiz") {
      const score = Number(d.score), total = Number(d.total);
      if (!(total > 0) || !(score >= 0) || score > total) return json({ ok: false, error: "bad score" });

      const month = thisMonth_();               // server decides the month, not the visitor's device
      // ONE attempt per person per month: same email or same phone number = already tried.
      const email = String(d.email).trim().toLowerCase(), phone = digits_(d.phone);
      const tried = sheet_("quiz").getDataRange().getValues().slice(1).some((r) =>
        monthOf_(r[1]) === month && (String(r[3]).trim().toLowerCase() === email || (phone && digits_(r[4]) === phone)));
      if (tried) return json({ ok: true, already: true, winner: false, month: month });

      const passed = score / total > PASS_MARK;
      const isWinner = passed && !monthWinner_(month);
      const now = new Date();
      sheet_("quiz").appendRow([
        now, monthCell_(month), clean(d.name), clean(d.email), clean(d.phone), score, total,
        Math.round((score / total) * 100) + "%", clean(d.language) + (d.set != null ? " · set " + clean(d.set) : ""), "Yes",
        isWinner ? "WINNER" : passed ? "Passed (not first)" : "Not passed", clean(d.submitted_at),
      ]);
      let emailStatus;
      if (isWinner) {
        sheet_("winners").appendRow([now, monthCell_(month), clean(d.name), clean(d.email), clean(d.phone), score + "/" + total, ""]);
        emailStatus = notifyOwner_(month, d, score, total);
      }
      return json({ ok: true, winner: isWinner, passed: passed, month: month, email: emailStatus });
    }

    // Find Distributors: a distributor posts a product (shows on the site only after you approve it).
    if (d.type === "listing") return saveListing_(d);
    if (d.type === "myposts") return json({ ok: true, listing: true, posts: myPosts_(d) });
    if (d.type === "editpost" || d.type === "removepost") return editListing_(d);
    if (d.type === "report") return reportListing_(d);

    // Business Boss game: one row when someone reaches the scoreboard, one when they download the report.
    if (d.type === "game") {
      const n = (v) => (isFinite(Number(v)) ? Math.round(Number(v) * 100) / 100 : "");
      sheet_("game").appendRow([
        new Date(), d.event === "report" ? "Downloaded report" : d.event === "example" ? "Tried example" : "Played", clean(d.name), clean(d.email), clean(d.phone),
        clean(d.country), clean(d.business), clean(d.business_type), clean(d.currency), clean(d.period),
        n(d.sales), n(d.costs), n(d.profit), n(d.margin), n(d.customers), d.goal === "" || d.goal == null ? "" : n(d.goal),
        n(d.health), clean(d.language), clean(d.submitted_at),
      ]);
      return json({ ok: true });
    }

    sheet_("survey").appendRow([
      new Date(), clean(d.name), clean(d.email), clean(d.phone), clean(d.country), clean(d.city),
      clean(d.goals), clean(d.business_type), clean(d.business_size), clean(d.analyst_level),
      clean(d.language), "Yes", clean(d.submitted_at),
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function saveListing_(d) {
  const num = (v) => { const n = Number(v); return isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 0; };
  const units = Math.min(100000, Math.round(num(d.units)) || 1), cost = num(d.cost), price = num(d.price);
  const buyer = d.role === "buyer";   // shops looking for a product: target price per case, photo optional
  if (!d.business || !d.product || !d.contact_phone || !cost || (!price && !buyer)) return json({ ok: false, listing: true, error: "missing fields" });
  const id = Utilities.getUuid().slice(0, 8);
  const link = d.photo ? savePhoto_(d.photo, id) : "";
  if (!link && (d.photo || !buyer)) return json({ ok: false, listing: true, error: "bad photo" });
  const key = Utilities.getUuid().replace(/-/g, "").slice(0, 8).toUpperCase();   // private edit code for the poster

  listingSheet_().appendRow([
    new Date(), id, "", clean(d.business), clean(d.name), clean(d.contact_phone), clean(d.email), clean(d.phone),
    clean(d.country), clean(d.city), clean(d.product), clean(d.description, 500), units, cost, price,
    clean(d.currency), Math.round(num(d.min_order)) || "", link, clean(d.language), clean(d.submitted_at),
    roleText_(d.role), key, "", "",
  ]);
  try {   // the poster's own copy of the edit code, so they can edit from another phone
    MailApp.sendEmail(String(d.email).trim(), "Your Data Wey Talk post: " + clean(d.product),
      "Thank you for posting " + clean(d.product) + " on Data Wey Talk (Find Distributors).\n\n" +
      "We check every post before it shows. Once it is live you can change or remove it yourself:\n" +
      "open Find Distributors → ✏️ My posts, signed up with this email and phone.\n\n" +
      "Your edit code: " + key + "\n(Keep it private. You need it to edit from a different phone or browser.)\n\n— Scitylana");
  } catch (err) { /* never block the post because of email */ }
  try {
    MailApp.sendEmail(notifyTo_(), "🛒 New Find Distributors post to check: " + clean(d.product),
      (buyer ? "A shop looking for a product" : d.role === "importer" ? "An importer looking for distributors" : "A distributor") + " posted. It is NOT on the website yet.\n\n" +
      "Business: " + clean(d.business) + "\nProduct: " + clean(d.product) + "\nCost per case: " + cost + " " + clean(d.currency) +
      "\nSelling price per unit: " + price + " (" + units + " per case)\nPhone: " + clean(d.contact_phone) + "\nPhoto: " + link +
      "\n\nTo publish it, open the Distributors tab and type Yes in the 'Approved?' column for ID " + id + ".");
  } catch (err) { /* never block the post because of email */ }
  return json({ ok: true, listing: true, id: id, key: key });
}

// Saves a data:image photo to the Drive folder and returns its public thumbnail link ("" if the photo is not valid).
function savePhoto_(photo, id) {
  photo = String(photo || "");
  const m = photo.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+\/=]+)$/);
  if (!m || photo.length > MAX_PHOTO_CHARS) return "";
  const folders = DriveApp.getFoldersByName(PHOTO_FOLDER);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(PHOTO_FOLDER);
  const file = folder.createFile(Utilities.newBlob(Utilities.base64Decode(m[2]), "image/" + m[1], id + "-" + Date.now() + "." + (m[1] === "jpeg" ? "jpg" : m[1])));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w800";
}

// The Distributors tab, with the newer header cells filled in on sheets made before they existed.
function listingSheet_() {
  const sh = sheet_("listing"), h = SHEETS.listing.headers;
  const top = sh.getRange(1, 1, 1, h.length).getValues()[0];
  h.forEach((name, i) => { if (top[i] === "" || top[i] == null) sh.getRange(1, i + 1).setValue(name); });
  return sh;
}

const isYes_ = (v) => /^\s*y(es)?\s*$/i.test(String(v));
const samePerson_ = (r, d) => String(r[6]).trim().toLowerCase() === String(d.email || "").trim().toLowerCase() &&
  digits_(r[7]).length >= 7 && digits_(r[7]) === digits_(d.phone);

/** "My posts": everything this email + phone has posted, with its status (never the edit code). */
function myPosts_(d) {
  const rows = listingSheet_().getDataRange().getValues().slice(1);
  return rows.filter((r) => r[1] && samePerson_(r, d)).map((r) => ({
    id: String(r[1]), status: isYes_(r[2]) ? "live" : /removed/i.test(String(r[2])) ? "removed" : "pending",
    business: plain_(r[3]), phone: plain_(r[5]), country: plain_(r[8]), city: plain_(r[9]), product: plain_(r[10]),
    description: plain_(r[11]), units: Number(r[12]) || 1, cost: Number(r[13]) || 0, price: Number(r[14]) || 0,
    currency: plain_(r[15]), minOrder: Number(r[16]) || 0, photo: plain_(r[17]),
    role: roleOf_(r[20]), verified: isYes_(r[23]), needsKey: !!String(r[21] || "").trim(),
  })).reverse();
}

/** The poster edits or removes their own APPROVED post. Needs the same email + phone and the edit code. */
function editListing_(d) {
  const sh = listingSheet_(), rows = sh.getDataRange().getValues();
  const i = rows.findIndex((r, n) => n > 0 && String(r[1]) === String(d.id || ""));
  if (i < 1) return json({ ok: false, listing: true, error: "not found" });
  const r = rows[i], row = i + 1;
  if (!samePerson_(r, d)) return json({ ok: false, listing: true, error: "not yours" });
  const key = String(r[21] || "").trim();
  if (key && key !== String(d.key || "").trim().toUpperCase()) return json({ ok: false, listing: true, error: "bad key" });
  if (!isYes_(r[2])) return json({ ok: false, listing: true, error: "not approved" });

  if (d.type === "removepost") {
    sh.getRange(row, 3).setValue("Removed by poster");
    sh.getRange(row, 23).setValue(new Date());
    notifyEdit_(r, "REMOVED their post", "");
    return json({ ok: true, listing: true, removed: true });
  }
  const num = (v) => { const n = Number(v); return isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 0; };
  const units = Math.min(100000, Math.round(num(d.units)) || 1), cost = num(d.cost), price = num(d.price);
  const buyer = d.role === "buyer";
  if (!d.business || !d.product || !d.contact_phone || !cost || (!price && !buyer)) return json({ ok: false, listing: true, error: "missing fields" });
  if (!buyer && !d.photo && !r[17]) return json({ ok: false, listing: true, error: "bad photo" });
  let link = r[17];
  if (d.photo) { link = savePhoto_(d.photo, r[1]); if (!link) return json({ ok: false, listing: true, error: "bad photo" }); }

  const before = [plain_(r[5]), plain_(r[13]), plain_(r[14])];
  sh.getRange(row, 4, 1, 1).setValue(clean(d.business));
  sh.getRange(row, 6, 1, 1).setValue(clean(d.contact_phone));
  sh.getRange(row, 9, 1, 10).setValues([[clean(d.country), clean(d.city), clean(d.product), clean(d.description, 500), units, cost, price,
    clean(d.currency), Math.round(num(d.min_order)) || "", link]]);
  sh.getRange(row, 21).setValue(roleText_(d.role));
  sh.getRange(row, 23).setValue(new Date());
  const phoneChanged = digits_(r[5]) !== digits_(d.contact_phone);
  if (phoneChanged && isYes_(r[23])) sh.getRange(row, 24).setValue("No (phone changed — check again)");   // re-verify a new number
  notifyEdit_(r, "edited their post", "WhatsApp: " + before[0] + " → " + clean(d.contact_phone) +
    (phoneChanged && isYes_(r[23]) ? "  ⚠️ The ✔ Verified badge was removed because the number changed." : "") +
    "\nCost per case: " + before[1] + " → " + cost + "\nSelling price per unit: " + before[2] + " → " + price + (d.photo ? "\nNew photo: " + link : ""));
  return json({ ok: true, listing: true, id: String(r[1]) });
}

/** "Report this post": saved in the Reports tab, and you get an email. One report per person per post. */
function reportListing_(d) {
  const rows = listingSheet_().getDataRange().getValues();
  const r = rows.find((x, n) => n > 0 && String(x[1]) === String(d.id || ""));
  if (!r) return json({ ok: false, listing: true, error: "not found" });
  const sh = sheet_("reports"), email = String(d.email).trim().toLowerCase();
  const dup = sh.getDataRange().getValues().slice(1).some((x) => String(x[1]) === String(r[1]) && String(x[7]).trim().toLowerCase() === email);
  if (dup) return json({ ok: true, listing: true, already: true });
  const REASONS = { scam: "Scam or fake", price: "Wrong or misleading price", photo: "Bad or offensive photo", other: "Something else" };
  const reason = REASONS[d.reason] || REASONS.other;
  sh.appendRow([new Date(), String(r[1]), plain_(r[10]), plain_(r[3]), reason, clean(d.note, 500), clean(d.name), clean(d.email), clean(d.phone), ""]);
  try {
    MailApp.sendEmail(notifyTo_(), "🚩 Find Distributors report: " + plain_(r[10]) + " (" + reason + ")",
      "Someone reported a live post.\n\nPost: " + plain_(r[10]) + " by " + plain_(r[3]) + " (ID " + r[1] + ")\nReason: " + reason +
      "\nDetails: " + clean(d.note, 500) + "\nReported by: " + clean(d.name) + " · " + clean(d.email) + " · " + clean(d.phone) +
      "\n\nTo hide the post, clear its 'Approved?' cell in the Distributors tab.");
  } catch (err) { /* never block the report because of email */ }
  return json({ ok: true, listing: true });
}

function notifyEdit_(r, what, changes) {
  try {
    MailApp.sendEmail(notifyTo_(), "✏️ Find Distributors: " + plain_(r[3]) + " " + what,
      plain_(r[3]) + " " + what + " (ID " + r[1] + ", " + plain_(r[10]) + "). It is already live.\n\n" + changes +
      "\n\nIf anything looks wrong, change it back in the Distributors tab or clear the 'Approved?' cell to hide it.");
  } catch (err) { /* never block the edit because of email */ }
}

function notifyTo_() { return NOTIFY_EMAIL; }

/** Emails you when a month's winner comes in. Returns "sent" or the reason it failed. */
function notifyOwner_(month, d, score, total) {
  try {
    const to = notifyTo_();
    if (!to) return "failed: no address (set NOTIFY_EMAIL)";
    MailApp.sendEmail(to, "🎉 Data Wey Talk quiz winner for " + month,
      "First person to score above 80% this month:\n\n" +
      "Name: " + clean(d.name) + "\nEmail: " + clean(d.email) + "\nPhone: " + clean(d.phone) +
      "\nScore: " + score + "/" + total + "\n\nSend their $5 voucher / gift card by email or WhatsApp, then mark 'Prize sent?' in the Winners tab.");
    return "sent";
  } catch (err) {
    return "failed: " + String(err).slice(0, 150);   // never block the entry because of email
  }
}

/**
 * RUN THIS ONCE from the Apps Script editor (select "testEmail" at the top, click ▶ Run).
 * Google will ask you to allow sending email — say Allow. You should get a test email.
 */
function testEmail() {
  const to = notifyTo_();
  MailApp.sendEmail(to, "✅ Data Wey Talk: winner emails are working",
    "This is a test. When someone wins the monthly quiz prize, the details will come to " + to + ".");
  Logger.log("Test email sent to " + to + ". Emails left today: " + MailApp.getRemainingDailyQuota());
}

function sheet_(key) {
  const def = SHEETS[key];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(def.name) || ss.insertSheet(def.name);
  if (sh.getLastRow() === 0) { sh.appendRow(def.headers); sh.setFrozenRows(1); }
  return sh;
}

// Trim length and stop spreadsheet formula injection (values starting with = + - @).
function clean(v, max) {
  v = String(v == null ? "" : v).slice(0, max || 200).trim();
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

// Last 9 digits of a phone number, so "+234 803…" and "0803…" match.
function digits_(v) { return String(v == null ? "" : v).replace(/\D/g, "").slice(-9); }

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
