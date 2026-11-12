/**
 * Data Wey Talk — survey receiver.
 * Paste into a Google Sheet: Extensions → Apps Script. Deploy as a Web app
 * (Execute as: Me, Who has access: Anyone). Each survey answer becomes a row.
 */
const SHEET_NAME = "Responses";
const HEADERS = [
  "Received at", "Name", "Email", "Phone / WhatsApp", "Country", "City",
  "Goals", "Business type", "Business size", "Analyst level",
  "Language", "Consent", "Submitted at (device)",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (d.website) return json({ ok: true });                 // honeypot: bot, ignore quietly
    if (!d.email || !d.phone || d.consent !== true) return json({ ok: false, error: "missing fields" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) { sh.appendRow(HEADERS); sh.setFrozenRows(1); }

    sh.appendRow([
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

// Trim length and stop spreadsheet formula injection (values starting with = + - @).
function clean(v) {
  v = String(v == null ? "" : v).slice(0, 200).trim();
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
