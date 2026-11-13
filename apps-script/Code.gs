/**
 * Data Wey Talk — survey + quiz receiver.
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
};

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
  const month = thisMonth_();
  return json({ ok: true, month: month, claimed: !!monthWinner_(month) });
}

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
      if (score / total <= PASS_MARK) return json({ ok: false, error: "score not above pass mark" });

      const month = thisMonth_();               // server decides the month, not the visitor's device
      const isWinner = !monthWinner_(month);
      const now = new Date();
      sheet_("quiz").appendRow([
        now, monthCell_(month), clean(d.name), clean(d.email), clean(d.phone), score, total,
        Math.round((score / total) * 100) + "%", clean(d.language), "Yes", isWinner ? "WINNER" : "", clean(d.submitted_at),
      ]);
      let emailStatus;
      if (isWinner) {
        sheet_("winners").appendRow([now, monthCell_(month), clean(d.name), clean(d.email), clean(d.phone), score + "/" + total, ""]);
        emailStatus = notifyOwner_(month, d, score, total);
      }
      return json({ ok: true, winner: isWinner, month: month, email: emailStatus });
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

function notifyTo_() { return NOTIFY_EMAIL; }

/** Emails you when a month's winner comes in. Returns "sent" or the reason it failed. */
function notifyOwner_(month, d, score, total) {
  try {
    const to = notifyTo_();
    if (!to) return "failed: no address (set NOTIFY_EMAIL)";
    MailApp.sendEmail(to, "🎉 Data Wey Talk quiz winner for " + month,
      "First person to score above 80% this month:\n\n" +
      "Name: " + clean(d.name) + "\nEmail: " + clean(d.email) + "\nPhone: " + clean(d.phone) +
      "\nScore: " + score + "/" + total + "\n\nSend their airtime/data, then mark 'Prize sent?' in the Winners tab.");
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
function clean(v) {
  v = String(v == null ? "" : v).slice(0, 200).trim();
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
