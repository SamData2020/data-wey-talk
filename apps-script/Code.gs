/**
 * Data Wey Talk — survey + quiz receiver, and monthly prize draw.
 * Paste into the Google Sheet: Extensions → Apps Script.
 * Deploy as a Web app (Execute as: Me, Who has access: Anyone).
 * After changing this code: Deploy → Manage deployments → Edit → New version.
 */
const WINNERS_PER_DRAW = 5;   // keep in step with quizPrize.winners in config.js
const PASS_MARK = 0.8;        // must score ABOVE this

const SHEETS = {
  survey: {
    name: "Responses",
    headers: ["Received at", "Name", "Email", "Phone / WhatsApp", "Country", "City",
      "Goals", "Business type", "Business size", "Analyst level", "Language", "Consent", "Submitted at (device)"],
  },
  quiz: {
    name: "Quiz Entries",
    headers: ["Received at", "Draw month", "Name", "Email", "Phone / WhatsApp", "Score", "Out of", "Percent",
      "Language", "Consent", "Submitted at (device)"],
  },
  winners: {
    name: "Winners",
    headers: ["Drawn at", "Draw month", "Name", "Email", "Phone / WhatsApp", "Score", "Prize sent? (fill in)"],
  },
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (d.website) return json({ ok: true });                 // honeypot: bot, ignore quietly
    if (!d.email || !d.phone || d.consent !== true) return json({ ok: false, error: "missing fields" });

    if (d.type === "quiz") {
      const score = Number(d.score), total = Number(d.total);
      if (!(total > 0) || !(score >= 0) || score > total) return json({ ok: false, error: "bad score" });
      if (score / total <= PASS_MARK) return json({ ok: false, error: "score not above pass mark" });
      const month = /^\d{4}-\d{2}$/.test(d.month) ? d.month : Utilities.formatDate(new Date(), "Africa/Lagos", "yyyy-MM");
      sheet_("quiz").appendRow([
        new Date(), month, clean(d.name), clean(d.email), clean(d.phone), score, total,
        Math.round((score / total) * 100) + "%", clean(d.language), "Yes", clean(d.submitted_at),
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

/** Adds a "Data Wey Talk" menu to the Sheet. */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("Data Wey Talk")
    .addItem("🎟️ Draw quiz winners…", "drawWinners")
    .addToUi();
}

/**
 * Picks WINNERS_PER_DRAW random winners for a month (asks which; default = this month).
 * One chance per person: duplicates by email OR phone count once.
 * Winners are written to the "Winners" tab.
 */
function drawWinners() {
  const ui = SpreadsheetApp.getUi();
  const thisMonth = Utilities.formatDate(new Date(), "Africa/Lagos", "yyyy-MM");
  const resp = ui.prompt("Draw quiz winners", "Which month? (format YYYY-MM)", ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return;
  const month = resp.getResponseText().trim() || thisMonth;
  if (!/^\d{4}-\d{2}$/.test(month)) { ui.alert("Please type the month like " + thisMonth); return; }

  const already = sheet_("winners").getDataRange().getValues().slice(1).some((r) => String(r[1]) === month);
  if (already && ui.alert("Winners for " + month + " were already drawn. Draw again anyway?", ui.ButtonSet.YES_NO) !== ui.Button.YES) return;

  const rows = sheet_("quiz").getDataRange().getValues().slice(1);
  const seen = new Set(), pool = [];
  rows.forEach((r) => {
    if (String(r[1]) !== month || !(Number(r[5]) / Number(r[6]) > PASS_MARK)) return;
    const email = String(r[3]).trim().toLowerCase(), phone = String(r[4]).replace(/\D/g, "").slice(-10);
    if (seen.has("e:" + email) || (phone && seen.has("p:" + phone))) return;
    seen.add("e:" + email); if (phone) seen.add("p:" + phone);
    pool.push(r);
  });
  if (!pool.length) { ui.alert("No qualifying entries for " + month + "."); return; }

  for (let i = pool.length - 1; i > 0; i--) {             // fair shuffle (Fisher–Yates)
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const winners = pool.slice(0, WINNERS_PER_DRAW);
  const ws = sheet_("winners"), at = new Date();
  winners.forEach((r) => ws.appendRow([at, month, r[2], r[3], r[4], r[5] + "/" + r[6], ""]));
  ui.alert(winners.length + " winner(s) drawn from " + pool.length + " qualifying people for " + month +
    ". See the Winners tab.");
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
