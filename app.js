/* Data Wey Talk — data analytics wey dey talk Pidgin.
   Everything runs in the browser. No file ever leaves the user's device. */

// ---------- Words (Pidgin + English) ----------
const I18N = {
  pcm: {
    heroTitle: "Make your numbers talk plain.",
    heroLede: "Put your sales, market or business record for here. We go show you wetin dey happen — for Pidgin, no big grammar.",
    dropTitle: "Press here to choose your file",
    dropHint: "Or drag am drop for here. Na CSV file we dey take (you fit save am from Excel or Google Sheets).",
    trySample: "No get file? Try am with sample data",
    download: "⬇️ Download sample data: Akara & Bread sales (CSV)",
    downloadHint: "Open am for Excel, change am, come put am back here.",
    privacy: "🔒 Your file no dey comot from your phone or computer. We no dey send am go anywhere.",
    newFile: "Use another file",
    privacyLink: "Privacy policy",
    pickCurrency: "Which money (currency)?",
    curNone: "No currency (na just numbers)",
    curFromFile: "we see am for your file",
    curFromCountry: "from your country",
    pickNumber: "Which number you wan check?",
    pickGroup: "Group am by wetin?",
    glance: "Wetin dey your data",
    talking: "Wetin di data dey talk",
    barHint: "Di long bar na di one wey big pass.",
    lineHint: "Touch or put your mouse for di line to see each one.",
    seeTable: "See di raw data",
    footer: "© Scitylana · Remodeling the Future · Data Wey Talk na free for everybody.",
    eyebrow: "Scitylana Academy · Free learning for everybody",
    learnEyebrow: "Learn as you go",
    learnTitle: "Small-small lesson: how to read your numbers",
    learnLede: "You no need to go school for data. Read dis six short lessons, then try am with di akara and bread sample.",
    l1t: "Wetin be Total?",
    l1b: "Na when you add all your sales join. If akara bring ₦15,700 for morning and ₦9,000 for evening, your total na ₦24,700.",
    l2t: "Wetin be Average?",
    l2b: "Share di total equal-equal. If you sell ₦30,000 for 3 days, average na ₦10,000 per day. E show you wetin normal day be.",
    l3t: "Wetin be Percentage (%)?",
    l3b: "Na how much out of every 100. If bread bring ₦45 out of every ₦100 wey you make, bread na 45% of your business.",
    l4t: "How to read bar chart",
    l4b: "Di longer di bar, di bigger di number. Di one for top na im dey carry your business — no let am fall your hand.",
    l5t: "How to read line chart",
    l5b: "Line wey dey climb mean say things dey go up. Line wey dey fall mean say make you check wetin happen dat time.",
    l6t: "How to save your file as CSV",
    l6b: "For Excel: File → Save As → choose \"CSV\". For Google Sheets: File → Download → CSV. Then bring am come here.",
    csrEyebrow: "Scitylana CSR",
    csrTitle: "Why Scitylana build dis",
    csrBody: "We believe say data no suppose be only for big company. Market woman, akara seller, shop owner — everybody suppose fit read im own numbers and take better decision. Dis tool na our way to give back: free education, for di language wey we dey speak.",
    pill1: "✓ Free for everybody",
    pill2: "✓ Pidgin first",
    pill3: "✓ Your data stay with you",
    shape: "{rows} rows · {cols} columns",
    total: "All of am join",
    totalX: "Everything add together.",
    avg: "Average",
    avgX: "If everything share equal, na dis each one go get.",
    max: "Di one wey high pass",
    min: "Di one wey low pass",
    maxX: "Na for: {where}",
    barTitle: "{num} for each {group}",
    lineTitle: "How {num} dey move from time to time",
    other: "Others",
    insTop: "<b>{top}</b> na di one wey carry first — e bring <b>{value}</b>, wey be {pct}% of everything.",
    insBottom: "<b>{bottom}</b> dey for back — na only <b>{value}</b> e bring.",
    insShare: "Di top {n} for {group} don carry {pct}% of everything. {advice}",
    insShareHigh: "Na dem you dey depend on — no let dem fall your hand.",
    insShareLow: "Your money dey spread well, no be one place e dey come from.",
    insUp: "From {first} reach {last}, {num} don <span class=\"up\">go up by {pct}% ▲</span>. Things dey move well!",
    insDown: "From {first} reach {last}, {num} don <span class=\"down\">fall by {pct}% ▼</span>. Check wetin happen.",
    insFlat: "From {first} reach {last}, {num} no too change — e just dey one level.",
    insBest: "Di best time na <b>{when}</b> — {num} reach <b>{value}</b>.",
    insCount: "You get {rows} records for here. Di average one na {avg}.",
    tableNote: "Na di first {n} rows we show here.",
    errEmpty: "Dis file no get data inside, or e no be CSV. Abeg check am try again.",
    errNoNum: "We no see any column wey get numbers for dis file. Make sure say your amount or quantity dey for im own column.",
    none: "(none)",
    blank: "(empty)",
  },
  en: {
    heroTitle: "Make your numbers speak plainly.",
    heroLede: "Upload your sales, market or business records. We'll show you what's happening in simple words.",
    dropTitle: "Tap here to choose your file",
    dropHint: "Or drag and drop it here. We accept CSV files (save from Excel or Google Sheets).",
    trySample: "No file? Try it with sample data",
    download: "⬇️ Download sample data: Akara & Bread sales (CSV)",
    downloadHint: "Open it in Excel, play with it, then upload it here.",
    privacy: "🔒 Your file never leaves your phone or computer. Nothing is uploaded.",
    newFile: "Use another file",
    privacyLink: "Privacy policy",
    pickCurrency: "Currency",
    curNone: "No currency (just numbers)",
    curFromFile: "found in your file",
    curFromCountry: "from your country",
    pickNumber: "Which number do you want to check?",
    pickGroup: "Group it by?",
    glance: "Your data at a glance",
    talking: "What your data is saying",
    barHint: "The longest bar is the biggest.",
    lineHint: "Touch or hover over the line to see each point.",
    seeTable: "See the raw data",
    footer: "© Scitylana · Remodeling the Future · Data Wey Talk is free for everyone.",
    eyebrow: "Scitylana Academy · Free learning for everyone",
    learnEyebrow: "Learn as you go",
    learnTitle: "Quick lessons: how to read your numbers",
    learnLede: "You don't need a degree to understand data. Read these six short lessons, then try them on the akara and bread sample.",
    l1t: "What is a Total?",
    l1b: "All your sales added together. If akara brought ₦15,700 in the morning and ₦9,000 in the evening, your total is ₦24,700.",
    l2t: "What is an Average?",
    l2b: "The total shared out equally. If you sold ₦30,000 over 3 days, the average is ₦10,000 per day — what a normal day looks like.",
    l3t: "What is a Percentage (%)?",
    l3b: "How much out of every 100. If bread brings ₦45 of every ₦100 you make, bread is 45% of your business.",
    l4t: "How to read a bar chart",
    l4b: "The longer the bar, the bigger the number. The top bar is what carries your business — protect it.",
    l5t: "How to read a line chart",
    l5b: "A rising line means things are going up. A falling line means you should check what happened at that time.",
    l6t: "How to save your file as CSV",
    l6b: "In Excel: File → Save As → choose \"CSV\". In Google Sheets: File → Download → CSV. Then upload it here.",
    csrEyebrow: "Scitylana CSR",
    csrTitle: "Why Scitylana built this",
    csrBody: "We believe data shouldn't be only for big companies. Market traders, akara sellers, shop owners — everyone should be able to read their own numbers and make better decisions. This tool is our way of giving back: free education, in the language we speak.",
    pill1: "✓ Free for everyone",
    pill2: "✓ Pidgin first",
    pill3: "✓ Your data stays with you",
    shape: "{rows} rows · {cols} columns",
    total: "Total",
    totalX: "Everything added together.",
    avg: "Average",
    avgX: "If everything were shared equally, each would get this.",
    max: "Highest",
    min: "Lowest",
    maxX: "At: {where}",
    barTitle: "{num} by {group}",
    lineTitle: "How {num} changes over time",
    other: "Others",
    insTop: "<b>{top}</b> is the leader — it brought in <b>{value}</b>, which is {pct}% of everything.",
    insBottom: "<b>{bottom}</b> is at the bottom with only <b>{value}</b>.",
    insShare: "The top {n} {group} values make up {pct}% of everything. {advice}",
    insShareHigh: "You rely heavily on them — protect them.",
    insShareLow: "Your total is well spread out, not dependent on one source.",
    insUp: "From {first} to {last}, {num} <span class=\"up\">went up {pct}% ▲</span>. Good progress!",
    insDown: "From {first} to {last}, {num} <span class=\"down\">fell {pct}% ▼</span>. Worth checking why.",
    insFlat: "From {first} to {last}, {num} stayed about the same.",
    insBest: "The best period was <b>{when}</b> — {num} reached <b>{value}</b>.",
    insCount: "You have {rows} records here. The average one is {avg}.",
    tableNote: "Showing the first {n} rows.",
    errEmpty: "This file has no data, or it isn't a CSV. Please check it and try again.",
    errNoNum: "We couldn't find any column with numbers. Make sure amounts or quantities are in their own column.",
    none: "(none)",
    blank: "(empty)",
  },
};

let lang = "pcm";
try { lang = localStorage.getItem("dwt-lang") || "pcm"; } catch (_) {}

function t(key, vars = {}) {
  const s = (I18N[lang] && I18N[lang][key]) ?? I18N.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ""));
}
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = (id) => document.getElementById(id);

// ---------- CSV parsing ----------
function parseCSV(text) {
  text = text.replace(/^﻿/, "");
  const firstLine = text.split(/\r?\n/, 1)[0] || "";
  const delim = (firstLine.split(";").length > firstLine.split(",").length) ? ";" : ",";
  const rows = [];
  let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false;
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === delim) { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  const clean = rows.filter((r) => r.some((v) => v.trim() !== ""));
  if (clean.length < 2) return null;
  const headers = clean[0].map((h, i) => h.trim() || `Column ${i + 1}`);
  const body = clean.slice(1).map((r) => headers.map((_, i) => (r[i] ?? "").trim()));
  return { headers, rows: body };
}

function parseNum(s) {
  if (s == null) return null;
  let v = String(s).trim();
  if (!v) return null;
  let neg = false;
  if (/^\(.*\)$/.test(v)) { neg = true; v = v.slice(1, -1); }
  v = v.replace(CUR_STRIP, "").replace(/\s/g, "");
  // Decimal comma (French style): "12,50" or "1.200,50" → 12.50 / 1200.50. "1,200" stays twelve hundred.
  if (/,\d{1,2}$/.test(v)) v = v.replace(/\./g, "").replace(",", ".");
  v = v.replace(/,/g, "");
  if (!/^-?\d*\.?\d+$/.test(v)) return null;
  const n = Number(v);
  return Number.isFinite(n) ? (neg ? -n : n) : null;
}

function parseDate(s) {
  const v = String(s || "").trim();
  let m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return mkDate(+m[1], +m[2], +m[3]);
  // Nigeria writes day first: 31/12/2026
  m = v.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2}|\d{4})$/);
  if (m) {
    let [d, mo, y] = [+m[1], +m[2], +m[3]];
    if (y < 100) y += 2000;
    if (mo > 12 && d <= 12) [d, mo] = [mo, d];
    return mkDate(y, mo, d);
  }
  return null;
}
function mkDate(y, m, d) {
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dt = new Date(y, m - 1, d);
  return isNaN(dt) ? null : dt;
}

function detectTypes(headers, rows) {
  return headers.map((h, i) => {
    const vals = rows.map((r) => r[i]).filter((v) => v !== "");
    if (!vals.length) return "text";
    const sample = vals.slice(0, 500);
    const dates = sample.filter((v) => parseDate(v)).length;
    if (dates / sample.length >= 0.8) return "date";
    const nums = sample.filter((v) => parseNum(v) !== null).length;
    if (nums / sample.length >= 0.8) return "number";
    return "text";
  });
}

// ---------- Currency ----------
// Order matters: more specific marks first (GH₵ before ₵, E£ before £, N$ before $).
// after: true → written after the number (e.g. 12,500 CFA). c: countries from the survey.
const CURRENCIES = [
  { code: "NGN", sym: "₦", re: /₦|\bNGN\b|naira/i, c: ["Nigeria"] },
  { code: "GHS", sym: "GH₵", re: /GH[₵¢]|₵|\bGHS\b|\bcedis?\b/i, c: ["Ghana"] },
  { code: "KES", sym: "KSh", re: /\bKShs?|\bKES\b/i, c: ["Kenya"] },
  { code: "TZS", sym: "TSh", re: /\bTShs?|\bTZS\b/i, c: ["Tanzania"] },
  { code: "UGX", sym: "USh", re: /\bUShs?|\bUGX\b/i, c: ["Uganda"] },
  { code: "RWF", sym: "FRw", after: true, re: /\bRWF\b|FRw/i, c: ["Rwanda"] },
  { code: "ZAR", sym: "R", re: /\bZAR\b|\brand\b|\(R\)|^R\s?\d/i, c: ["South Africa", "Lesotho", "Eswatini"] },
  { code: "NAD", sym: "N$", re: /N\$|\bNAD\b/, c: ["Namibia"] },
  { code: "EGP", sym: "E£", re: /E£|\bEGP\b|\bLE\s?\d|ج\.م/i, c: ["Egypt"] },
  { code: "MAD", sym: "DH", after: true, re: /\bMAD\b|\bDHS?\b|dirham|د\.م/i, c: ["Morocco"] },
  { code: "DZD", sym: "DA", after: true, re: /\bDZD\b|\bDA\b|دج/, c: ["Algeria"] },
  { code: "TND", sym: "DT", after: true, re: /\bTND\b|\bDT\b|د\.ت/, c: ["Tunisia"] },
  { code: "XOF", sym: "CFA", after: true, re: /\bXOF\b|\bF?CFA\b/i,
    c: ["Senegal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Niger", "Togo", "Benin", "Guinea-Bissau"] },
  { code: "XAF", sym: "FCFA", after: true, re: /\bXAF\b/,
    c: ["Cameroon", "Gabon", "Chad", "Central African Republic", "Congo (Brazzaville)", "Equatorial Guinea"] },
  { code: "CDF", sym: "FC", after: true, re: /\bCDF\b/, c: ["Congo (DRC)"] },
  { code: "ETB", sym: "Br", re: /\bETB\b|\bbirr\b/i, c: ["Ethiopia"] },
  { code: "ZMW", sym: "K", re: /\bZMW\b|kwacha/i, c: ["Zambia"] },
  { code: "MWK", sym: "MK", re: /\bMWK\b/, c: ["Malawi"] },
  { code: "BWP", sym: "P", re: /\bBWP\b|\bpula\b/i, c: ["Botswana"] },
  { code: "MZN", sym: "MT", after: true, re: /\bMZN\b|metical/i, c: ["Mozambique"] },
  { code: "AOA", sym: "Kz", re: /\bAOA\b|\bKz\b/, c: ["Angola"] },
  { code: "GMD", sym: "D", re: /\bGMD\b|dalasi/i, c: ["Gambia"] },
  { code: "SLE", sym: "Le", re: /\bSL[LE]\b|\bleones?\b/i, c: ["Sierra Leone"] },
  { code: "LRD", sym: "L$", re: /L\$|\bLRD\b/, c: ["Liberia"] },
  { code: "MUR", sym: "Rs", re: /\bMUR\b/, c: ["Mauritius"] },
  { code: "MGA", sym: "Ar", after: true, re: /\bMGA\b|ariary/i, c: ["Madagascar"] },
  { code: "SDG", sym: "SDG", after: true, re: /\bSDG\b/, c: ["Sudan"] },
  { code: "LYD", sym: "LD", after: true, re: /\bLYD\b/, c: ["Libya"] },
  { code: "USD", sym: "$", re: /US\$|\$|\bUSD\b|dollars?/i, c: ["Zimbabwe", "Liberia", "Somalia", "South Sudan"] },
  { code: "EUR", sym: "€", re: /€|\bEUR\b|\beuros?\b/i, c: [] },
  { code: "GBP", sym: "£", re: /£|\bGBP\b|\bpounds?\b/i, c: [] },
];
// Everything that can sit around a money number, removed before reading the number.
const CUR_STRIP = /US\$|[NL]\$|GH[₵¢]|E£|[KTU]?Shs?|F?CFA|FRw|[₦$€£₵¢]|ج\.م|د\.م|دج|د\.ت|\b(?:NGN|GHS|KES|TZS|UGX|RWF|ZAR|NAD|EGP|MAD|DZD|TND|XOF|XAF|CDF|ETB|ZMW|MWK|BWP|MZN|AOA|GMD|SLE|SLL|LRD|MUR|MGA|SDG|LYD|USD|EUR|GBP|DHS?|DA|DT|Br|Kz|MT|Rs|LE|Ar|FC|Le|naira|cedis?)\b|^[RNK](?=\s?\d)/gi;
const CUR_BY_CODE = Object.fromEntries(CURRENCIES.map((c) => [c.code, c]));

function curIn(text) { const s = String(text || ""); return s ? CURRENCIES.find((c) => c.re.test(s)) || null : null; }

// Which currency does this file use? Count marks in headers and number cells; else use the survey country.
function detectCurrency(headers, rows, types) {
  const count = {};
  const add = (c) => { if (c) count[c.code] = (count[c.code] || 0) + 1; };
  headers.forEach((h) => add(curIn(h)));
  rows.slice(0, 300).forEach((r) => types.forEach((tp, i) => { if (tp === "number") add(curIn(r[i])); }));
  const best = Object.keys(count).sort((a, b) => count[b] - count[a])[0];
  if (best) return { cur: CUR_BY_CODE[best], how: "file" };
  let country = "";
  try { country = JSON.parse(localStorage.getItem("dwt-profile") || "{}").country || ""; } catch (_) {}
  const byCountry = CURRENCIES.find((c) => c.c.includes(country));
  return byCountry ? { cur: byCountry, how: "country" } : { cur: null, how: "none" };
}

function isMoneyCol(header, rows, i) {
  if (/amount|price|sales|revenue|cost|profit|income|money|total|value|kudi|owo|ego|montant|prix|vente|chiffre|bei|mauzo|pesa|faida|gharama|imali|intengo|المبلغ|السعر|المبيعات/i.test(header)) return true;
  if (curIn(header)) return true;
  return rows.slice(0, 50).some((r) => curIn(r[i]));
}

// ---------- Formatting ----------
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function withCur(s, money) {
  const c = money && state.cur;
  if (!c) return s;
  if (c.after) return `${s} ${c.sym}`;
  return /[A-Za-z]$/.test(c.sym) ? `${c.sym} ${s}` : c.sym + s;   // "KSh 1,200" but "₦1,200"
}
function fmt(n, money) {
  const abs = Math.abs(n);
  const s = abs.toLocaleString("en-NG", { maximumFractionDigits: abs < 100 && abs % 1 ? 2 : 0 });
  return (n < 0 ? "-" : "") + withCur(s, money);
}
function fmtShort(n, money) {
  return withCur(new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n), money);
}
function fmtPct(p) { return (Math.round(p * 10) / 10).toLocaleString("en"); }

// ---------- State ----------
const state = { name: "", headers: [], rows: [], types: [], num: -1, group: -1, date: -1, cur: null, curHow: "none" };

function load(name, text) {
  $("error").hidden = true;
  const parsed = parseCSV(text);
  if (!parsed || !parsed.rows.length) return showError(t("errEmpty"));
  const types = detectTypes(parsed.headers, parsed.rows);
  if (!types.includes("number")) return showError(t("errNoNum"));
  Object.assign(state, { name, ...parsed, types });
  state.date = types.indexOf("date");
  const dc = detectCurrency(parsed.headers, parsed.rows, types);
  state.cur = dc.cur; state.curHow = dc.how;
  // Prefer a total-money column (Amount/Sales), then any money-like column, else the last number column.
  const numIdx = types.map((tp, i) => (tp === "number" ? i : -1)).filter((i) => i >= 0);
  state.num = numIdx.find((i) => /amount|sales|revenue|total|income/i.test(parsed.headers[i]))
    ?? numIdx.find((i) => isMoneyCol(parsed.headers[i], parsed.rows, i))
    ?? numIdx[numIdx.length - 1];
  // Group by the text column with a useful number of distinct values.
  const textIdx = types.map((tp, i) => (tp === "text" ? i : -1)).filter((i) => i >= 0);
  const scored = textIdx.map((i) => ({ i, n: new Set(parsed.rows.map((r) => r[i])).size }))
    .filter((x) => x.n > 1 && x.n <= Math.max(30, parsed.rows.length * 0.5))
    .sort((a, b) => a.n - b.n);
  state.group = scored.length ? scored[0].i : -1;
  buildSelects();
  $("start").hidden = true;
  $("results").hidden = false;
  render();
  window.scrollTo({ top: 0 });
}

function showError(msg) {
  const e = $("error");
  e.textContent = msg;
  e.hidden = false;
}

function buildSelects() {
  const numSel = $("numCol"), grpSel = $("groupCol");
  numSel.innerHTML = state.headers.map((h, i) => state.types[i] === "number"
    ? `<option value="${i}"${i === state.num ? " selected" : ""}>${esc(h)}</option>` : "").join("");
  grpSel.innerHTML = `<option value="-1">${esc(t("none"))}</option>` + state.headers.map((h, i) => state.types[i] === "text"
    ? `<option value="${i}"${i === state.group ? " selected" : ""}>${esc(h)}</option>` : "").join("");
  const cur = state.cur ? state.cur.code : "";
  const tag = (code) => code === cur && state.curHow !== "manual" && state.curHow !== "none" ? ` · ${t(state.curHow === "file" ? "curFromFile" : "curFromCountry")}` : "";
  $("curSel").innerHTML = `<option value="">${esc(t("curNone"))}</option>` +
    CURRENCIES.map((c) => `<option value="${c.code}"${c.code === cur ? " selected" : ""}>${c.code} · ${esc(c.sym)}${esc(tag(c.code))}</option>`).join("");
}

// ---------- Analysis + rendering ----------
function render() {
  if ($("results").hidden) return;
  const { headers, rows, num, group, date } = state;
  const numName = headers[num];
  const groupName = group >= 0 ? headers[group] : "";
  const money = isMoneyCol(numName, rows, num);
  const F = (n) => fmt(n, money);

  $("fileName").textContent = state.name;
  $("fileShape").textContent = t("shape", { rows: rows.length.toLocaleString("en"), cols: headers.length });

  const recs = rows.map((r) => ({ r, v: parseNum(r[num]) })).filter((x) => x.v !== null);
  const total = recs.reduce((s, x) => s + x.v, 0);
  const avg = recs.length ? total / recs.length : 0;
  let maxR = recs[0], minR = recs[0];
  for (const x of recs) { if (x.v > maxR.v) maxR = x; if (x.v < minR.v) minR = x; }
  const where = (x) => {
    if (!x) return "";
    const parts = [];
    if (group >= 0) parts.push(x.r[group] || t("blank"));
    if (date >= 0 && x.r[date]) parts.push(x.r[date]);
    return parts.join(", ") || "—";
  };

  // Tiles
  const tiles = [
    { label: t("total"), value: F(total), x: t("totalX") },
    { label: t("avg"), value: F(avg), x: t("avgX") },
    { label: t("max"), value: maxR ? F(maxR.v) : "—", x: t("maxX", { where: where(maxR) }) },
    { label: t("min"), value: minR ? F(minR.v) : "—", x: t("maxX", { where: where(minR) }) },
  ];
  $("tiles").innerHTML = tiles.map((tl) =>
    `<div class="tile"><div class="label">${esc(tl.label)}</div><div class="value">${esc(tl.value)}</div><div class="explain">${esc(tl.x)}</div></div>`
  ).join("");

  // Summary for other features (correlation, "email Scitylana" button).
  const summary = { file: state.name, rows: rows.length, numName, groupName, money, total, avg, top: null, trend: null };

  const insights = [];
  insights.push(["🧾", t("insCount", { rows: recs.length.toLocaleString("en"), avg: esc(F(avg)) })]);

  // Grouped bars
  const barCard = $("barCard");
  if (group >= 0) {
    const sums = new Map();
    for (const x of recs) {
      const k = x.r[group] || t("blank");
      sums.set(k, (sums.get(k) || 0) + x.v);
    }
    const sorted = [...sums.entries()].sort((a, b) => b[1] - a[1]);
    const TOP = 10;
    let shown = sorted.slice(0, TOP);
    if (sorted.length > TOP) {
      shown.push([t("other"), sorted.slice(TOP).reduce((s, e) => s + e[1], 0), true]);
    }
    const maxV = Math.max(...shown.map((e) => e[1]), 0) || 1;
    $("barTitle").textContent = t("barTitle", { num: numName, group: groupName });
    $("bars").innerHTML = shown.map(([k, v, isOther]) => {
      const w = Math.max(0, (v / maxV) * 62);
      const pct = total ? (v / total) * 100 : 0;
      return `<div class="bar-row" title="${esc(k)}: ${esc(F(v))} (${fmtPct(pct)}%)">
        <span class="bar-label">${esc(k)}</span>
        <span class="bar-track"><span class="bar-fill${isOther ? " other" : ""}" style="width:${w}%"></span><span class="bar-value">${esc(F(v))}</span></span>
      </div>`;
    }).join("");
    barCard.hidden = false;

    if (sorted.length >= 2 && total > 0) {
      const [topK, topV] = sorted[0];
      const [botK, botV] = sorted[sorted.length - 1];
      summary.top = { name: topK, value: topV, pct: (topV / total) * 100 };
      insights.push(["🏆", t("insTop", { top: esc(topK), value: esc(F(topV)), pct: fmtPct((topV / total) * 100) })]);
      insights.push(["🐢", t("insBottom", { bottom: esc(botK), value: esc(F(botV)) })]);
      if (sorted.length >= 5) {
        const n = 3;
        const share = (sorted.slice(0, n).reduce((s, e) => s + e[1], 0) / total) * 100;
        insights.push(["🎯", t("insShare", {
          n, group: esc(groupName), pct: fmtPct(share),
          advice: share >= 60 ? t("insShareHigh") : t("insShareLow"),
        })]);
      }
    }
  } else {
    barCard.hidden = true;
  }

  // Time series
  const series = date >= 0 ? buildSeries(recs, date) : null;
  if (series && series.points.length >= 2) {
    const pts = series.points;
    const first = pts[0], last = pts[pts.length - 1];
    const change = first.v !== 0 ? ((last.v - first.v) / Math.abs(first.v)) * 100 : null;
    const vars = { first: first.label, last: last.label, num: esc(numName), pct: change === null ? "" : fmtPct(Math.abs(change)) };
    summary.trend = { first: first.label, last: last.label, change };
    if (change === null || Math.abs(change) < 3) insights.push(["➖", t("insFlat", vars)]);
    else if (change > 0) insights.push(["📈", t("insUp", vars)]);
    else insights.push(["📉", t("insDown", vars)]);
    const best = pts.reduce((a, b) => (b.v > a.v ? b : a));
    insights.push(["⭐", t("insBest", { when: best.label, num: esc(numName), value: esc(F(best.v)) })]);
    $("lineTitle").textContent = t("lineTitle", { num: numName });
    $("lineCard").hidden = false;
    drawLine(series.points, money);
  } else {
    $("lineCard").hidden = true;
  }

  $("insights").innerHTML = insights.map(([icon, html]) => `<li><span class="icon" aria-hidden="true">${icon}</span><span>${html}</span></li>`).join("");

  // Table
  const N = 100;
  $("table").innerHTML =
    `<thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>` +
    `<tbody>${rows.slice(0, N).map((r) => `<tr>${r.map((v, i) => `<td${state.types[i] === "number" ? ' class="num"' : ""}>${esc(v)}</td>`).join("")}</tr>`).join("")}</tbody>`;
  $("tableNote").textContent = rows.length > N ? t("tableNote", { n: N }) : "";

  state.summary = summary;
  document.dispatchEvent(new Event("dwt:rendered"));
}

function buildSeries(recs, dateIdx) {
  const dated = recs.map((x) => ({ d: parseDate(x.r[dateIdx]), v: x.v })).filter((x) => x.d);
  if (dated.length < 2) return null;
  const minT = Math.min(...dated.map((x) => +x.d)), maxT = Math.max(...dated.map((x) => +x.d));
  const byMonth = (maxT - minT) / 864e5 > 62;
  const buckets = new Map();
  for (const { d, v } of dated) {
    const key = byMonth ? d.getFullYear() * 100 + d.getMonth() : +new Date(d.getFullYear(), d.getMonth(), d.getDate());
    buckets.set(key, (buckets.get(key) || 0) + v);
  }
  const points = [...buckets.entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => {
    let label;
    if (byMonth) label = `${MONTHS[k % 100]} ${Math.floor(k / 100)}`;
    else { const d = new Date(k); label = `${d.getDate()} ${MONTHS[d.getMonth()]}`; }
    return { label, v };
  });
  return { points, byMonth };
}

// ---------- Line chart (SVG, with hover/touch crosshair) ----------
let lastLine = null;
function drawLine(points, money) {
  lastLine = { points, money };
  const wrap = $("lineWrap");
  wrap.querySelector("svg")?.remove();
  const W = Math.max(280, wrap.clientWidth || 600), H = Math.round(Math.min(300, Math.max(200, W * 0.45)));
  const pad = { t: 12, r: 12, b: 28, l: 52 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const vals = points.map((p) => p.v);
  let lo = Math.min(0, ...vals), hi = Math.max(...vals);
  if (hi === lo) hi = lo + 1;
  const ticks = niceTicks(lo, hi, 4);
  lo = ticks[0]; hi = ticks[ticks.length - 1];
  const x = (i) => pad.l + (points.length === 1 ? iw / 2 : (i / (points.length - 1)) * iw);
  const y = (v) => pad.t + ih - ((v - lo) / (hi - lo)) * ih;

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", $("lineTitle").textContent);

  let html = "";
  for (const tv of ticks) {
    const yy = y(tv);
    html += `<line class="${tv === 0 ? "baseline" : "gridline"}" x1="${pad.l}" x2="${W - pad.r}" y1="${yy}" y2="${yy}"/>`;
    html += `<text class="tick" x="${pad.l - 8}" y="${yy + 4}" text-anchor="end">${esc(fmtShort(tv, money))}</text>`;
  }
  // x labels: first, last, and a few between (avoid crowding)
  const maxLabels = Math.max(2, Math.floor(iw / 70));
  const step = Math.ceil(points.length / maxLabels);
  points.forEach((p, i) => {
    if (i % step === 0 || i === points.length - 1) {
      if (i !== points.length - 1 && points.length - 1 - i < step * 0.6) return;
      const anchor = i === 0 ? "start" : i === points.length - 1 ? "end" : "middle";
      html += `<text class="tick" x="${x(i)}" y="${H - 6}" text-anchor="${anchor}">${esc(p.label)}</text>`;
    }
  });
  const path = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join("");
  const area = `${path}L${x(points.length - 1)},${y(Math.max(lo, 0))}L${x(0)},${y(Math.max(lo, 0))}Z`;
  html += `<path class="area" d="${area}"/><path class="series" d="${path}"/>`;
  html += `<line class="cross" id="cross" y1="${pad.t}" y2="${pad.t + ih}" visibility="hidden"/>`;
  html += `<circle class="dot" id="dot" r="5" visibility="hidden"/>`;
  html += `<rect x="${pad.l}" y="0" width="${iw}" height="${H}" fill="transparent" id="hit"/>`;
  svg.innerHTML = html;
  wrap.prepend(svg);

  const tip = $("tip"), cross = svg.querySelector("#cross"), dot = svg.querySelector("#dot");
  const show = (evt) => {
    const rect = svg.getBoundingClientRect();
    const px = ((evt.clientX - rect.left) / rect.width) * W;
    const i = Math.max(0, Math.min(points.length - 1, Math.round(((px - pad.l) / iw) * (points.length - 1))));
    const cx = x(i), cy = y(points[i].v);
    cross.setAttribute("x1", cx); cross.setAttribute("x2", cx); cross.setAttribute("visibility", "visible");
    dot.setAttribute("cx", cx); dot.setAttribute("cy", cy); dot.setAttribute("visibility", "visible");
    tip.innerHTML = `<b>${esc(points[i].label)}</b> · ${esc(fmt(points[i].v, money))}`;
    tip.style.left = `${(cx / W) * 100}%`;
    tip.style.top = `${(cy / H) * rect.height}px`;
    tip.hidden = false;
  };
  const hide = () => { tip.hidden = true; cross.setAttribute("visibility", "hidden"); dot.setAttribute("visibility", "hidden"); };
  const hit = svg.querySelector("#hit");
  hit.addEventListener("pointermove", show);
  hit.addEventListener("pointerdown", show);
  hit.addEventListener("pointerleave", hide);
}

function niceTicks(lo, hi, count) {
  const span = hi - lo;
  const raw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= count) || 10 * mag;
  const start = Math.floor(lo / step) * step, end = Math.ceil(hi / step) * step;
  const out = [];
  for (let v = start; v <= end + step / 2; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}

// ---------- Sample data: small market trader, Jan–Jun 2026 ----------
function sampleCSV() {
  const items = [["Rice (50kg)", 62000], ["Garri (paint)", 2500], ["Beans (paint)", 3800], ["Palm Oil (5L)", 9500],
    ["Tomatoes (basket)", 28000], ["Yam (tuber)", 3200], ["Indomie (carton)", 11500], ["Groundnut Oil (5L)", 12500]];
  const places = ["Lagos", "Aba", "Kano", "Ibadan", "Onitsha"];
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const lines = ["Date,Item,Market,Quantity,Amount (₦)"];
  for (let m = 1; m <= 6; m++) {
    for (let k = 0; k < 28; k++) {
      const day = 1 + Math.floor(rnd() * 28);
      const it = items[Math.floor(Math.pow(rnd(), 1.4) * items.length)];
      const place = places[Math.floor(rnd() * places.length)];
      const qty = 1 + Math.floor(rnd() * 12 * (1 + m * 0.08));
      const amt = Math.round(qty * it[1] * (0.9 + rnd() * 0.2) / 50) * 50;
      lines.push(`${String(day).padStart(2, "0")}/${String(m).padStart(2, "0")}/2026,${it[0]},${place},${qty},"${amt.toLocaleString("en")}"`);
    }
  }
  return lines.join("\n");
}

// ---------- Wiring ----------
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL.includes(lang) ? "rtl" : "ltr";
  const sel = document.getElementById("langSel");
  if (sel) sel.value = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  if (state.headers.length) { buildSelects(); render(); }
  document.dispatchEvent(new Event("dwt:lang"));
}

const RTL = ["ar"]; // right-to-left languages
document.getElementById("langSel").addEventListener("change", (e) => {
  lang = e.target.value;
  try { localStorage.setItem("dwt-lang", lang); } catch (_) {}
  applyLang();
});

function readFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => load(file.name, String(reader.result));
  reader.onerror = () => showError(t("errEmpty"));
  reader.readAsText(file);
}
$("file").addEventListener("change", (e) => readFile(e.target.files[0]));
const drop = $("drop");
["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop", (e) => readFile(e.dataTransfer.files[0]));
const SAMPLE_URL = "data/akara-and-bread-sales.csv";
$("sample").addEventListener("click", async () => {
  if (window.dwtSurveyDone && !window.dwtSurveyDone()) return; // survey first
  try {
    const res = await fetch(SAMPLE_URL);
    if (!res.ok) throw new Error(res.status);
    load("akara-and-bread-sales.csv", await res.text());
  } catch (_) {
    // Opened straight from disk (file://) — fetch no work there, so use built-in sample.
    load("Sample: Mama Nkechi Provisions", sampleCSV());
  }
});
$("reset").addEventListener("click", () => {
  $("results").hidden = true; $("start").hidden = false; $("file").value = "";
  state.headers = [];
});
$("numCol").addEventListener("change", (e) => { state.num = +e.target.value; render(); });
$("groupCol").addEventListener("change", (e) => { state.group = +e.target.value; render(); });
$("curSel").addEventListener("change", (e) => { state.cur = CUR_BY_CODE[e.target.value] || null; state.curHow = "manual"; buildSelects(); render(); });

let rt;
window.addEventListener("resize", () => {
  clearTimeout(rt);
  rt = setTimeout(() => { if (lastLine && !$("lineCard").hidden) drawLine(lastLine.points, lastLine.money); }, 150);
});

applyLang();
// ?sample auto-load is handled in survey.js, after the survey is done.
