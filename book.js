/* "My Book": a daily business book for one-person businesses (barbers, make-up artists, photographers…).
   Record jobs and expenses, see summaries, chase debts on WhatsApp, price services,
   make receipt/quote images and a shareable "Business Report Card".
   Everything is saved on the visitor's phone (localStorage "dwt-book"). */

Object.assign(I18N.pcm, {
  navBook: "My Book",
  bkToolBtn: "📒 Open my business book",
  bkEyebrow: "📒 My business book",
  bkTitle: "Write every job for 5 seconds",
  bkLede: "Your daily sales book for your phone: write jobs and expenses, see who owe you, price your work, send receipt, and share your business report card. E dey work without data and e stay for your phone.",
  bkSetupT: "Set up your book",
  bkTrade: "Wetin you dey do?",
  tr_barber: "Barber", tr_makeup: "Make-up artist", tr_photo: "Photographer", tr_salon: "Hair & nail salon", tr_tailor: "Tailor / fashion designer",
  tr_food: "Food seller", tr_pos: "POS / mobile money agent", tr_shop: "Shop / trader", tr_other: "Other",
  bkPhone: "Your business phone / WhatsApp (e go show for receipt)",
  bkOpen: "Open my book",
  bkT_add: "➕ Record", bkT_sum: "📊 Summary", bkT_owe: "💸 Who owe me", bkT_price: "🏷️ Price", bkT_doc: "🧾 Receipt", bkT_card: "📣 Share",
  bkJob: "Job / sale", bkExp: "Expense", bkWhat: "Wetin e be?", bkOtherPh: "Or type am…",
  bkAmount: "Amount", bkPaidAll: "Dem don pay everything", bkPaid: "How much dem don pay", bkClient: "Client name (if you want)", bkClientPhone: "Client phone (if you want)",
  bkDate: "Date", bkSave: "Save", bkSaved: "✅ E don save!", bkToday: "Today", bkNone: "You never write anything today.",
  bkDel: "Delete", bkMakeReceipt: "🧾 Receipt", bkOwing: "still owe {amt}", bkStreak: "🔥 {n} days straight", bkErr: "Write wetin e be and amount wey pass 0.",
  ex_materials: "Materials / products", ex_transport: "Transport", ex_rent: "Rent / chair money", ex_data: "Data & airtime", ex_power: "Fuel / light", ex_tools: "Tools & equipment",
  sv_barber_1: "Haircut", sv_barber_2: "Beard trim", sv_barber_3: "Hair dye", sv_barber_4: "Pikin haircut",
  sv_makeup_1: "Bridal make-up", sv_makeup_2: "Normal make-up", sv_makeup_3: "Gele tying", sv_makeup_4: "Make-up class",
  sv_photo_1: "Photo shoot", sv_photo_2: "Event coverage", sv_photo_3: "Photo editing", sv_photo_4: "Prints & frames",
  sv_salon_1: "Braids", sv_salon_2: "Hair treatment", sv_salon_3: "Manicure", sv_salon_4: "Pedicure",
  sv_tailor_1: "New outfit", sv_tailor_2: "Adjustment", sv_tailor_3: "Wedding outfit", sv_tailor_4: "Uniforms",
  sv_food_1: "Plate of food", sv_food_2: "Small chops", sv_food_3: "Drinks", sv_food_4: "Catering order",
  sv_pos_1: "Withdrawal charges", sv_pos_2: "Transfer charges", sv_pos_3: "Airtime sales", sv_pos_4: "Bill payment",
  sv_shop_1: "Goods sold", sv_shop_2: "Wholesale order", sv_shop_3: "Delivery", sv_shop_4: "Other sales",
  bkP_today: "Today", bkP_week: "Dis week", bkP_month: "Dis month",
  bkJobs: "Jobs", bkIncome: "Money from jobs", bkSpent: "Expenses", bkProfit: "Profit", bkOweT: "Money wey people owe you",
  bkTop: "Top services dis month", bkBestDay: "Your best day: {day}",
  bkAnalyse: "📈 Analyse am for di tool", bkCsv: "⬇️ Download my book (CSV)", bkEmpty: "Write your first job to see your summary.",
  bkNoExp: "Tip: write your expenses too, so your profit go correct.",
  bkOweNone: "🎉 Nobody owe you money.", bkDaysAgo: "{n} days ago", bkRemind: "💬 Remind am for WhatsApp", bkMarkPaid: "✅ Dem don pay",
  bkRemindMsg: "Hello {client}, na {biz} dey talk. Small reminder about di balance of {amt} for {item} ({date}). Thank you! 🙏",
  bkThere: "my customer",
  bkPriceT: "How much I suppose charge?", bkPriceLede: "Find di lowest price wey cover your costs and pay you di money wey you want.",
  bkSvc: "Service", bkMat: "Materials for one job", bkHours: "Hours for one job (add editing and travel)", bkTrans: "Transport for one job",
  bkFixed: "Fixed costs every month (rent, chair, data, equipment)", bkWant: "Money you want pay yourself every month", bkJobsMo: "Jobs every month",
  bkNow: "Your price now (if you want)",
  bkMin: "Lowest price", bkMinX: "If you charge below dis, you dey lose money or you no dey pay yourself wetin you want.",
  bkHourly: "You dey make per hour", bkBreak: "For one job: materials {m} + transport {t} + fixed costs {f} + your pay {p}",
  bkLow: "⚠️ You dey charge {now} — {gap} below your lowest price. Think about raising am.",
  bkOk: "✅ Your price {now} cover everything, with {gap} extra for each job.",
  bkDocT: "Receipt / quote", bkReceipt: "Receipt", bkQuote: "Quote", bkItem: "Item", bkQty: "Qty", bkLine: "+ Add line",
  bkDeposit: "Wetin dem don pay", bkBalance: "Balance", bkTotal: "Total", bkNote: "Note (if you want)",
  bkMake: "🧾 Make di image", bkShare: "📤 Share", bkDownload: "⬇️ Download",
  bkNo: "No.", bkThanks: "Thank you for your patronage!", bkValid: "Dis quote dey valid for 14 days.",
  bkCardT: "Your business report card", bkCardLede: "Share am for WhatsApp Status — make other business people try am free.",
  bkShowMoney: "Show my money numbers for di card", bkCardJobs: "{n} jobs dis month", bkCardTop: "Top service: {s}", bkCardStreak: "{n} days of records",
  bkCardCta: "Check your own business free 👉", bkMadeWith: "Made free with Data Wey Talk",
  bkShareText: "I just check my business health for Data Wey Talk — {score}/100 {badge}! Check your own free:",
  bkShareWA: "💬 Share link for WhatsApp",
  bkInstall: "📲 Put am for my phone like app", bkInstallTip: "📲 To use am without data: open your browser menu and choose 'Add to Home screen'.",
  bkPrivacy: "🔒 Your book dey only for dis phone. Download am sometimes as backup.",
});

Object.assign(I18N.en, {
  navBook: "My Book",
  bkToolBtn: "📒 Open my business book",
  bkEyebrow: "📒 My business book",
  bkTitle: "Record every job in 5 seconds",
  bkLede: "Your daily sales book on your phone: record jobs and expenses, see who owes you, price your services, send receipts and share your business report card. Works offline and stays on your phone.",
  bkSetupT: "Set up your book",
  bkTrade: "What do you do?",
  tr_barber: "Barber", tr_makeup: "Make-up artist", tr_photo: "Photographer", tr_salon: "Hair & nail salon", tr_tailor: "Tailor / fashion designer",
  tr_food: "Food seller", tr_pos: "POS / mobile money agent", tr_shop: "Shop / trader", tr_other: "Other",
  bkPhone: "Your business phone / WhatsApp (shown on receipts)",
  bkOpen: "Open my book",
  bkT_add: "➕ Record", bkT_sum: "📊 Summary", bkT_owe: "💸 Who owes me", bkT_price: "🏷️ Price", bkT_doc: "🧾 Receipt", bkT_card: "📣 Share",
  bkJob: "Job / sale", bkExp: "Expense", bkWhat: "What was it?", bkOtherPh: "Or type it…",
  bkAmount: "Amount", bkPaidAll: "Paid in full", bkPaid: "Amount paid so far", bkClient: "Client name (optional)", bkClientPhone: "Client phone (optional)",
  bkDate: "Date", bkSave: "Save", bkSaved: "✅ Saved!", bkToday: "Today", bkNone: "Nothing recorded today yet.",
  bkDel: "Delete", bkMakeReceipt: "🧾 Receipt", bkOwing: "owes {amt}", bkStreak: "🔥 {n}-day streak", bkErr: "Enter what it was and an amount above 0.",
  ex_materials: "Materials / products", ex_transport: "Transport", ex_rent: "Rent / chair fee", ex_data: "Data & airtime", ex_power: "Fuel / power", ex_tools: "Tools & equipment",
  sv_barber_1: "Haircut", sv_barber_2: "Beard trim", sv_barber_3: "Hair dye", sv_barber_4: "Kids' haircut",
  sv_makeup_1: "Bridal make-up", sv_makeup_2: "Regular make-up", sv_makeup_3: "Gele tying", sv_makeup_4: "Make-up class",
  sv_photo_1: "Photo shoot", sv_photo_2: "Event coverage", sv_photo_3: "Photo editing", sv_photo_4: "Prints & frames",
  sv_salon_1: "Braids", sv_salon_2: "Hair treatment", sv_salon_3: "Manicure", sv_salon_4: "Pedicure",
  sv_tailor_1: "New outfit", sv_tailor_2: "Adjustment", sv_tailor_3: "Wedding outfit", sv_tailor_4: "Uniforms",
  sv_food_1: "Plate of food", sv_food_2: "Snacks", sv_food_3: "Drinks", sv_food_4: "Catering order",
  sv_pos_1: "Withdrawal charges", sv_pos_2: "Transfer charges", sv_pos_3: "Airtime sales", sv_pos_4: "Bill payment",
  sv_shop_1: "Goods sold", sv_shop_2: "Wholesale order", sv_shop_3: "Delivery", sv_shop_4: "Other sales",
  bkP_today: "Today", bkP_week: "This week", bkP_month: "This month",
  bkJobs: "Jobs", bkIncome: "Income from jobs", bkSpent: "Expenses", bkProfit: "Profit", bkOweT: "Owed to you",
  bkTop: "Top services this month", bkBestDay: "Your best day: {day}",
  bkAnalyse: "📈 Analyse in the tool", bkCsv: "⬇️ Download my book (CSV)", bkEmpty: "Record your first job to see your summary.",
  bkNoExp: "Tip: record your expenses too, so your profit is accurate.",
  bkOweNone: "🎉 Nobody owes you money.", bkDaysAgo: "{n} days ago", bkRemind: "💬 Remind on WhatsApp", bkMarkPaid: "✅ Mark as paid",
  bkRemindMsg: "Hello {client}, this is {biz}. A friendly reminder about the balance of {amt} for {item} ({date}). Thank you! 🙏",
  bkThere: "there",
  bkPriceT: "What should I charge?", bkPriceLede: "Find the lowest price that covers your costs and pays you what you want.",
  bkSvc: "Service", bkMat: "Materials per job", bkHours: "Hours per job (include editing and travel)", bkTrans: "Transport per job",
  bkFixed: "Monthly fixed costs (rent, chair, data, equipment)", bkWant: "Income you want to pay yourself each month", bkJobsMo: "Jobs per month",
  bkNow: "Your current price (optional)",
  bkMin: "Minimum price", bkMinX: "Below this you lose money or pay yourself less than your goal.",
  bkHourly: "You earn per hour", bkBreak: "Per job: materials {m} + transport {t} + fixed costs {f} + your pay {p}",
  bkLow: "⚠️ You charge {now} — {gap} below your minimum. Consider raising your price.",
  bkOk: "✅ Your price {now} covers everything, with {gap} extra per job.",
  bkDocT: "Receipt / quote", bkReceipt: "Receipt", bkQuote: "Quote", bkItem: "Item", bkQty: "Qty", bkLine: "+ Add line",
  bkDeposit: "Paid / deposit", bkBalance: "Balance", bkTotal: "Total", bkNote: "Note (optional)",
  bkMake: "🧾 Make image", bkShare: "📤 Share", bkDownload: "⬇️ Download",
  bkNo: "No.", bkThanks: "Thank you for your business!", bkValid: "This quote is valid for 14 days.",
  bkCardT: "Your business report card", bkCardLede: "Share it on WhatsApp Status — let other business owners try it free.",
  bkShowMoney: "Show my money numbers on the card", bkCardJobs: "{n} jobs this month", bkCardTop: "Top service: {s}", bkCardStreak: "{n} days of records",
  bkCardCta: "Check your own business free 👉", bkMadeWith: "Made free with Data Wey Talk",
  bkShareText: "I just checked my business health on Data Wey Talk — {score}/100 {badge}! Check yours free:",
  bkShareWA: "💬 Share the link on WhatsApp",
  bkInstall: "📲 Install on my phone", bkInstallTip: "📲 To use it offline: open your browser menu and choose 'Add to Home screen'.",
  bkPrivacy: "🔒 Your book stays on this phone only. Download it now and then as a backup.",
});

const BOOK_TRADES = ["barber", "makeup", "photo", "salon", "tailor", "food", "pos", "shop", "other"];
const BOOK_EXPENSES = ["materials", "transport", "rent", "data", "power", "tools"];

(function myBook() {
  const KEY = "dwt-book";
  const box = $("bookBox");
  const pad = (n) => String(n).padStart(2, "0");
  const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => ymd(new Date());
  const N = (v) => { const n = parseNum(v); return n === null ? 0 : n; };
  const profile = () => { try { return JSON.parse(localStorage.getItem("dwt-profile") || "{}"); } catch (_) { return {}; } };
  function defaultCur() { const c = CURRENCIES.find((x) => x.c.includes(profile().country || "")); return c ? c.code : "NGN"; }
  let B;
  try { B = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (_) { B = null; }
  B = Object.assign({ trade: "", biz: "", phone: "", cur: defaultCur(), entries: [], calc: {}, doc: null, docNo: 1, showMoney: false }, B || {});
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(B)); } catch (_) {} };
  let tab = "add";
  let form = { k: "job", item: "", amt: "", full: true, paid: "", client: "", ph: "", d: today() };
  let flash = "";
  let lastImg = null;   // { blob, url, name }

  const loc = () => (lang === "pcm" ? "en-NG" : lang === "ar" ? "ar-u-nu-latn" : lang);
  const isRTL = () => typeof RTL !== "undefined" && RTL.includes(lang);
  function money(n) {
    const c = CUR_BY_CODE[B.cur], abs = Math.abs(n);
    const s = abs.toLocaleString("en-NG", { maximumFractionDigits: abs < 100 && abs % 1 ? 2 : 0 });
    const body = !c ? s : c.after ? `${s} ${c.sym}` : /[A-Za-z]$/.test(c.sym) ? `${c.sym} ${s}` : c.sym + s;
    return (n < 0 ? "−" : "") + body;
  }
  const dayName = (i) => { try { return new Intl.DateTimeFormat(loc(), { weekday: "long" }).format(new Date(2026, 0, 5 + i)); } catch (_) { return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]; } };
  const fmtD = (s) => { const [y, m, d] = s.split("-").map(Number); try { return new Date(y, m - 1, d).toLocaleDateString(loc(), { day: "numeric", month: "short" }); } catch (_) { return s; } };
  const services = () => (B.trade && B.trade !== "other" ? [1, 2, 3, 4].map((i) => t(`sv_${B.trade}_${i}`)) : []);
  const siteURL = () => location.origin + location.pathname;
  const ltr = (s) => (s ? `\u2066${s}\u2069` : s);   // keep phone numbers / links left-to-right inside Arabic text

  // ---------- numbers ----------
  const owing = (e) => (e.k === "job" ? Math.max(0, e.amt - e.paid) : 0);
  function inPeriod(e, p) {
    const now = new Date();
    if (p === "today") return e.d === today();
    if (p === "month") return e.d.slice(0, 7) === today().slice(0, 7);
    const mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    return e.d >= ymd(mon) && e.d <= today();
  }
  function stats(p) {
    const list = B.entries.filter((e) => inPeriod(e, p));
    const jobs = list.filter((e) => e.k === "job"), exps = list.filter((e) => e.k === "exp");
    const income = jobs.reduce((s, e) => s + e.amt, 0), spent = exps.reduce((s, e) => s + e.amt, 0);
    return { jobs: jobs.length, income, spent, profit: income - spent, owed: jobs.reduce((s, e) => s + owing(e), 0), list, jobList: jobs, expCount: exps.length };
  }
  function streak() {
    const days = new Set(B.entries.map((e) => e.d));
    const d = new Date();
    if (!days.has(ymd(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    while (days.has(ymd(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function health(s) {
    if (!(s.income > 0)) return null;
    const margin = (s.profit / s.income) * 100;
    return Math.max(0, Math.min(100, Math.round(40 + margin * 2)));
  }
  const badge = (sc) => t(sc >= 80 ? "gmB1" : sc >= 60 ? "gmB2" : sc >= 40 ? "gmB3" : "gmB4");
  function topServices(list) {
    const m = {};
    list.forEach((e) => { m[e.item] = (m[e.item] || 0) + e.amt; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }
  function bestDay(list) {
    const w = Array(7).fill(0);
    list.forEach((e) => { const [y, mo, d] = e.d.split("-").map(Number); w[(new Date(y, mo - 1, d).getDay() + 6) % 7] += e.amt; });
    const max = Math.max(...w);
    return max > 0 ? dayName(w.indexOf(max)) : "";
  }

  // ---------- CSV ----------
  const q = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  const dmy = (s) => s.split("-").reverse().join("/");
  function jobsCSV() {
    const rows = B.entries.filter((e) => e.k === "job").sort((a, b) => a.d.localeCompare(b.d));
    return [`Date,Service,Client,Amount (${B.cur}),Paid,Owing`]
      .concat(rows.map((e) => [dmy(e.d), q(e.item), q(e.client || ""), e.amt, e.paid, owing(e)].join(","))).join("\n");
  }
  function fullCSV() {
    const rows = B.entries.slice().sort((a, b) => a.d.localeCompare(b.d));
    return [`Date,Type,Item,Client,Client phone,Amount (${B.cur}),Paid,Owing`]
      .concat(rows.map((e) => [dmy(e.d), e.k === "job" ? "Job" : "Expense", q(e.item), q(e.client || ""), q(e.ph || ""), e.amt, e.k === "job" ? e.paid : "", owing(e)].join(","))).join("\n");
  }
  const slug = (s) => (s || "my-business").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase() || "my-business";
  function downloadBlob(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  // ---------- WhatsApp ----------
  function waNumber(ph) {
    let d = String(ph || "").replace(/[^\d+]/g, "");
    if (!d) return "";
    if (d.startsWith("+")) return d.slice(1);
    if (d.startsWith("00")) return d.slice(2);
    if (d.startsWith("0") && typeof COUNTRIES !== "undefined") {
      const c = COUNTRIES.find(([name]) => name === profile().country);
      if (c) return c[1].replace("+", "") + d.slice(1);
    }
    return d;
  }
  const waLink = (num, text) => `https://wa.me/${num || ""}?text=${encodeURIComponent(text)}`;

  // ---------- screens ----------
  const field = (label, html, cls = "") => `<label class="field ${cls}"><span>${esc(label)}</span>${html}</label>`;
  const inp = (k, v, extra = "") => `<input data-k="${k}" value="${esc(v ?? "")}" ${extra}>`;
  const num = (k, v, ph = "") => inp(k, v, `inputmode="decimal" autocomplete="off" placeholder="${esc(ph)}"`);

  function sLocked() { return `<p class="qz-banner">${esc(t("gmLocked"))} <a class="mail" href="#start">↑</a></p>`; }
  function sSetup() {
    const curs = `<select data-b="cur">${CURRENCIES.map((c) => `<option value="${c.code}"${B.cur === c.code ? " selected" : ""}>${c.code} · ${esc(c.sym)}</option>`).join("")}</select>`;
    return `<h3>${esc(t("bkSetupT"))}</h3>
      <div class="field"><span>${esc(t("bkTrade"))}</span><div class="bk-trades">${BOOK_TRADES.map((tr) =>
        `<button type="button" class="chip" aria-pressed="${B.trade === tr}" data-trade="${tr}">${esc(t("tr_" + tr))}</button>`).join("")}</div></div>
      <div class="grid2">
        ${field(t("gmName"), `<input data-b="biz" value="${esc(B.biz)}" maxlength="50" placeholder="${esc(t("gmNamePh"))}">`)}
        ${field(t("bkPhone"), `<input data-b="phone" value="${esc(B.phone || profile().phone || "")}" inputmode="tel" maxlength="24">`)}
        ${field(t("gmCur"), curs)}
      </div>
      <button type="button" class="btn" data-act="open">${esc(t("bkOpen"))}</button>`;
  }

  function sAdd() {
    const presets = form.k === "job" ? services() : BOOK_EXPENSES.map((x) => t("ex_" + x));
    const st = stats("today"), sk = streak();
    const todays = B.entries.filter((e) => e.d === today()).slice().reverse();
    return `<div class="seg" role="radiogroup">${[["job", t("bkJob")], ["exp", t("bkExp")]].map(([v, l]) =>
        `<button type="button" role="radio" aria-checked="${form.k === v}" data-kind="${v}">${esc(l)}</button>`).join("")}</div>
      <div class="field"><span>${esc(t("bkWhat"))}</span>
        <div class="bk-presets">${presets.map((p) => `<button type="button" class="chip" aria-pressed="${form.item === p}" data-item="${esc(p)}">${esc(p)}</button>`).join("")}</div>
        <input data-f="item" value="${esc(form.item)}" maxlength="50" placeholder="${esc(t("bkOtherPh"))}"></div>
      <div class="grid2">
        ${field(t("bkAmount"), `<input data-f="amt" value="${esc(form.amt)}" inputmode="decimal" autocomplete="off" class="bk-amt">`)}
        ${field(t("bkDate"), `<input type="date" data-f="d" value="${esc(form.d)}" max="${today()}">`)}
      </div>
      ${form.k === "job" ? `
        <label class="check"><input type="checkbox" data-f="full"${form.full ? " checked" : ""}><span>${esc(t("bkPaidAll"))}</span></label>
        ${form.full ? "" : field(t("bkPaid"), `<input data-f="paid" value="${esc(form.paid)}" inputmode="decimal" autocomplete="off">`, "bk-paid")}
        <details class="bk-more"${form.client || form.ph ? " open" : ""}><summary>${esc(t("bkClient"))}</summary><div class="grid2">
          ${field(t("bkClient"), `<input data-f="client" value="${esc(form.client)}" maxlength="50" autocomplete="off">`)}
          ${field(t("bkClientPhone"), `<input data-f="ph" value="${esc(form.ph)}" inputmode="tel" maxlength="24" autocomplete="off">`)}
        </div></details>` : ""}
      <p class="error" id="bkErr" role="alert" hidden></p>
      <div class="bk-save-row"><button type="button" class="btn" data-act="save">${esc(t("bkSave"))}</button>
        ${flash ? `<span class="bk-flash" role="status">${esc(flash)}</span>` : ""}
        ${sk > 1 ? `<span class="bk-streak">${esc(t("bkStreak", { n: sk }))}</span>` : ""}</div>
      <h4 class="bk-h">${esc(t("bkToday"))} · ${esc(money(st.income))} − ${esc(money(st.spent))} = <b>${esc(money(st.profit))}</b></h4>
      ${todays.length ? `<ul class="bk-list">${todays.map(rowHTML).join("")}</ul>` : `<p class="muted">${esc(t("bkNone"))}</p>`}
      <p class="muted small">${esc(t("bkPrivacy"))}</p>`;
  }
  function rowHTML(e) {
    const ow = owing(e);
    return `<li class="bk-row ${e.k}">
      <span class="bk-row-main"><b dir="auto">${esc(e.item)}</b>${e.client ? ` · <span dir="auto">${esc(e.client)}</span>` : ""}
        ${ow ? `<span class="bk-owe-tag">${esc(t("bkOwing", { amt: money(ow) }))}</span>` : ""}</span>
      <span class="bk-row-amt">${e.k === "exp" ? "−" : ""}${esc(money(e.amt))}</span>
      <span class="bk-row-act">${e.k === "job" ? `<button type="button" class="chip" data-receipt="${e.id}">${esc(t("bkMakeReceipt"))}</button>` : ""}
        <button type="button" class="chip" data-del="${e.id}" aria-label="${esc(t("bkDel"))}">✕</button></span></li>`;
  }

  function sSum() {
    if (!B.entries.length) return `<p class="muted">${esc(t("bkEmpty"))}</p>`;
    const card = (p) => { const s = stats(p); return `<div class="bk-stat"><h4>${esc(t("bkP_" + p))}</h4>
      <p><span>${esc(t("bkJobs"))}</span><b>${s.jobs}</b></p>
      <p><span>${esc(t("bkIncome"))}</span><b>${esc(money(s.income))}</b></p>
      <p><span>${esc(t("bkSpent"))}</span><b>${esc(money(s.spent))}</b></p>
      <p class="${s.profit >= 0 ? "up" : "down"}"><span>${esc(t("bkProfit"))}</span><b>${esc(money(s.profit))}</b></p></div>`; };
    const m = stats("month"), top = topServices(m.jobList).slice(0, 5), max = top[0] ? top[0][1] : 1;
    const totalOwed = B.entries.reduce((s, e) => s + owing(e), 0), bd = bestDay(m.jobList);
    return `<div class="bk-stats">${card("today")}${card("week")}${card("month")}</div>
      ${m.jobs && !m.expCount ? `<p class="qz-banner">${esc(t("bkNoExp"))}</p>` : ""}
      <p class="bk-owed"><span>${esc(t("bkOweT"))}</span> <b>${esc(money(totalOwed))}</b></p>
      ${top.length ? `<div class="card"><h3>${esc(t("bkTop"))}</h3><div class="bars">${top.map(([k, v]) => `<div class="bar-row">
          <span class="bar-label" dir="auto">${esc(k)}</span><span class="bar-track"><span class="bar-fill" style="width:${(v / max) * 55}%"></span><span class="bar-value">${esc(money(v))}</span></span></div>`).join("")}</div>
          ${bd ? `<p class="muted small">${esc(t("bkBestDay", { day: bd }))}</p>` : ""}</div>` : ""}
      <div class="gm-actions"><button type="button" class="btn" data-act="analyse">${esc(t("bkAnalyse"))}</button>
        <button type="button" class="btn ghost" data-act="csv">${esc(t("bkCsv"))}</button></div>`;
  }

  function sOwe() {
    const list = B.entries.filter((e) => owing(e) > 0).sort((a, b) => a.d.localeCompare(b.d));
    if (!list.length) return `<p class="qz-ok">${esc(t("bkOweNone"))}</p>`;
    const days = (d) => { const [y, m, dd] = d.split("-").map(Number); return Math.max(0, Math.round((new Date(today()) - new Date(y, m - 1, dd)) / 864e5)); };
    return `<p class="bk-owed"><span>${esc(t("bkOweT"))}</span> <b>${esc(money(list.reduce((s, e) => s + owing(e), 0)))}</b></p>
      <ul class="bk-list">${list.map((e) => {
        const msg = t("bkRemindMsg", { client: e.client || t("bkThere"), biz: B.biz || "", amt: money(owing(e)), item: e.item, date: fmtD(e.d) });
        return `<li class="bk-row owe"><span class="bk-row-main"><b dir="auto">${esc(e.client || "—")}</b> · <span dir="auto">${esc(e.item)}</span>
            <span class="muted small">${esc(fmtD(e.d))} · ${esc(t("bkDaysAgo", { n: days(e.d) }))}</span></span>
          <span class="bk-row-amt">${esc(money(owing(e)))}</span>
          <span class="bk-row-act"><a class="chip wa" href="${esc(waLink(waNumber(e.ph), msg))}" target="_blank" rel="noopener">${esc(t("bkRemind"))}</a>
            <button type="button" class="chip" data-paid="${e.id}">${esc(t("bkMarkPaid"))}</button></span></li>`;
      }).join("")}</ul>`;
  }

  function priceCalc() {
    const c = B.calc, jobs = N(c.jobs);
    if (!(jobs > 0)) return null;
    const m = N(c.mat), tr = N(c.trans), f = N(c.fixed) / jobs, p = N(c.want) / jobs, h = N(c.hours);
    const min = m + tr + f + p, now = N(c.now);
    const used = now || min;
    return { m, tr, f, p, min, now, hourly: h ? (used - m - tr - f) / h : null };
  }
  function priceOut() {
    const r = priceCalc();
    if (!r) return "";
    let verdict = "";
    if (r.now) verdict = r.now < r.min ? `<p class="bk-verdict low">${esc(t("bkLow", { now: money(r.now), gap: money(r.min - r.now) }))}</p>`
      : `<p class="bk-verdict ok">${esc(t("bkOk", { now: money(r.now), gap: money(r.now - r.min) }))}</p>`;
    return `<div class="tiles bk-price-tiles">
        <div class="tile good"><div class="label">${esc(t("bkMin"))}${B.calc.svc ? ` · <span dir="auto">${esc(B.calc.svc)}</span>` : ""}</div><div class="value">${esc(money(Math.ceil(r.min)))}</div><div class="explain">${esc(t("bkMinX"))}</div></div>
        ${r.hourly !== null ? `<div class="tile"><div class="label">${esc(t("bkHourly"))}</div><div class="value">${esc(money(Math.round(r.hourly)))}</div></div>` : ""}
      </div>
      <p class="muted small">${esc(t("bkBreak", { m: money(r.m), t: money(r.tr), f: money(Math.round(r.f)), p: money(Math.round(r.p)) }))}</p>${verdict}`;
  }
  function sPrice() {
    const c = B.calc, svcOpts = services();
    return `<h3>${esc(t("bkPriceT"))}</h3><p class="muted">${esc(t("bkPriceLede"))}</p>
      ${svcOpts.length ? `<div class="bk-presets">${svcOpts.map((s) => `<button type="button" class="chip" aria-pressed="${c.svc === s}" data-svc="${esc(s)}">${esc(s)}</button>`).join("")}</div>` : ""}
      <div class="grid2">
        ${field(t("bkSvc"), inp("calc.svc", c.svc, 'maxlength="40"'))}
        ${field(t("bkMat"), num("calc.mat", c.mat, "2,000"))}
        ${field(t("bkTrans"), num("calc.trans", c.trans, "500"))}
        ${field(t("bkHours"), num("calc.hours", c.hours, "2"))}
        ${field(t("bkFixed"), num("calc.fixed", c.fixed, "30,000"))}
        ${field(t("bkWant"), num("calc.want", c.want, "150,000"))}
        ${field(t("bkJobsMo"), num("calc.jobs", c.jobs, "40"))}
        ${field(t("bkNow"), num("calc.now", c.now, ""))}
      </div><div id="bkPriceOut">${priceOut()}</div>`;
  }

  function newDoc(fromEntry) {
    const d = { type: "receipt", client: "", ph: "", lines: [{ d: "", q: "1", p: "" }], paid: "", note: "", no: B.docNo, date: today() };
    if (fromEntry) Object.assign(d, { client: fromEntry.client || "", ph: fromEntry.ph || "", lines: [{ d: fromEntry.item, q: "1", p: String(fromEntry.amt) }], paid: String(fromEntry.paid), date: fromEntry.d });
    return d;
  }
  const docTotal = (d) => d.lines.reduce((s, l) => s + N(l.q || 1) * N(l.p), 0);
  function sDoc() {
    if (!B.doc) B.doc = newDoc();
    const d = B.doc;
    return `<div class="seg" role="radiogroup">${[["receipt", t("bkReceipt")], ["quote", t("bkQuote")]].map(([v, l]) =>
        `<button type="button" role="radio" aria-checked="${d.type === v}" data-doctype="${v}">${esc(l)}</button>`).join("")}</div>
      <div class="grid2">${field(t("bkClient"), inp("doc.client", d.client, 'maxlength="50"'))}${field(t("bkDate"), `<input type="date" data-k="doc.date" value="${esc(d.date)}">`)}</div>
      <div class="gm-rows">${d.lines.map((l, i) => `<div class="gm-row bk-line">
        ${field(t("bkItem"), inp(`doc.lines.${i}.d`, l.d, 'maxlength="50"'))}
        ${field(t("bkQty"), num(`doc.lines.${i}.q`, l.q, "1"))}
        ${field(t("gmPrice"), num(`doc.lines.${i}.p`, l.p, ""))}
        <button type="button" class="gm-x" data-delline="${i}" aria-label="${esc(t("gmRemove"))}">×</button></div>`).join("")}
        <button type="button" class="btn ghost small-btn" data-act="addline">${esc(t("bkLine"))}</button></div>
      <div class="grid2">${field(t("bkDeposit"), num("doc.paid", d.paid, "0"))}${field(t("bkNote"), inp("doc.note", d.note, 'maxlength="120"'))}</div>
      <p class="gm-live">${esc(t("bkTotal"))}: <b id="bkDocTotal">${esc(money(docTotal(d)))}</b></p>
      <button type="button" class="btn" data-act="makedoc">${esc(t("bkMake"))}</button>
      <div id="bkImg" class="bk-img">${imgHTML()}</div>`;
  }
  function imgHTML() {
    if (!lastImg) return "";
    return `<img src="${lastImg.url}" alt="">
      <div class="gm-actions"><button type="button" class="btn gold" data-act="shareimg">${esc(t("bkShare"))}</button>
      <button type="button" class="btn ghost" data-act="dlimg">${esc(t("bkDownload"))}</button></div>`;
  }

  function sCard() {
    const m = stats("month"), sc = health(m);
    if (sc === null) return `<p class="muted">${esc(t("bkEmpty"))}</p>`;
    const shareMsg = `${t("bkShareText", { score: sc, badge: badge(sc) })} ${siteURL()}`;
    return `<h3>${esc(t("bkCardT"))}</h3><p class="muted">${esc(t("bkCardLede"))}</p>
      <label class="check"><input type="checkbox" data-b="showMoney"${B.showMoney ? " checked" : ""}><span>${esc(t("bkShowMoney"))}</span></label>
      <div class="gm-actions"><button type="button" class="btn" data-act="makecard">${esc(t("bkMake"))}</button>
        <a class="btn ghost" href="${esc(waLink("", shareMsg))}" target="_blank" rel="noopener">${esc(t("bkShareWA"))}</a></div>
      <div id="bkImg" class="bk-img card-img">${imgHTML()}</div>`;
  }

  // ---------- images (canvas) ----------
  function canvasKit(W, H) {
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const c = cv.getContext("2d"), rtl = isRTL(), P = 70;
    try { c.direction = rtl ? "rtl" : "ltr"; } catch (_) {}
    const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif', SERIF = '"Roboto Slab", Georgia, serif';
    const font = (w, s, serif) => { c.font = `${w} ${s}px ${serif ? SERIF : SANS}`; };
    // side "start" = left in LTR, right in RTL
    const text = (s, y, side = "start", color = "#1d1210", x0) => {
      c.fillStyle = color;
      const startX = rtl ? W - P : P, endX = rtl ? P : W - P;
      c.textAlign = side === "center" ? "center" : (side === "start") !== rtl ? "left" : "right";
      c.fillText(String(s), side === "center" ? W / 2 : x0 !== undefined ? x0 : side === "start" ? startX : endX, y);
    };
    const wrap = (s, maxW) => {
      const words = String(s).split(" "), lines = []; let cur = "";
      words.forEach((w) => { const tryS = cur ? cur + " " + w : w; if (c.measureText(tryS).width > maxW && cur) { lines.push(cur); cur = w; } else cur = tryS; });
      if (cur) lines.push(cur); return lines;
    };
    return { cv, c, W, H, P, rtl, font, text, wrap };
  }
  function drawDoc() {
    const d = B.doc, lines = d.lines.filter((l) => l.d || N(l.p));
    const total = docTotal(d), paid = Math.min(N(d.paid), total), bal = total - paid;
    const H = 760 + lines.length * 74 + (d.note ? 70 : 0) + (d.type === "receipt" ? 80 : 0);
    const k = canvasKit(1080, H), { c, W, P, font, text } = k;
    c.fillStyle = "#fffdf9"; c.fillRect(0, 0, W, H);
    const g = c.createLinearGradient(0, 0, W, 230); g.addColorStop(0, "#760308"); g.addColorStop(1, "#4f0205");
    c.fillStyle = g; c.fillRect(0, 0, W, 230);
    font("700", 58, true); text(B.biz || "My business", 105, "start", "#debb79");
    font("400", 32); text([t("tr_" + (B.trade || "other")), ltr(B.phone)].filter(Boolean).join(" · "), 165, "start", "#f7ecd9");
    let y = 310;
    font("700", 44, true); text((d.type === "quote" ? t("bkQuote") : t("bkReceipt")).toUpperCase(), y, "start", "#760308");
    font("400", 30); text(`${t("bkNo")} ${ltr(String(d.no).padStart(4, "0"))} · ${fmtD(d.date)}`, y, "end", "#5a4a45");
    y += 60;
    if (d.client) { font("600", 34); text(d.client, y, "start"); y += 54; }
    c.fillStyle = "#c59d58"; c.fillRect(P, y, W - 2 * P, 3); y += 56;
    font("400", 34);
    lines.forEach((l) => {
      const qn = N(l.q || 1), pr = N(l.p);
      text(l.d || "—", y, "start");
      font("400", 28); text(qn !== 1 ? `${qn} × ${money(pr)}` : "", y, "center", "#5a4a45"); font("600", 34);
      text(money(qn * pr), y, "end"); font("400", 34);
      y += 74;
    });
    c.fillStyle = "#ece3d6"; c.fillRect(P, y - 30, W - 2 * P, 2); y += 30;
    font("700", 40); text(t("bkTotal"), y, "start"); text(money(total), y, "end"); y += 64;
    if (d.type === "receipt" || paid) {
      font("400", 34); text(t("bkDeposit"), y, "start", "#5a4a45"); text(money(paid), y, "end", "#5a4a45"); y += 56;
      font("700", 36); text(t("bkBalance"), y, "start", bal > 0 ? "#b3261e" : "#006300"); text(money(bal), y, "end", bal > 0 ? "#b3261e" : "#006300"); y += 60;
    }
    if (d.note) { font("italic 400", 30); text(d.note, y, "start", "#5a4a45"); y += 60; }
    font("600", 32); text(d.type === "quote" ? t("bkValid") : t("bkThanks"), y + 10, "center", "#760308");
    c.fillStyle = "#f7ecd9"; c.fillRect(0, H - 90, W, 90);
    font("400", 26); text(`${t("bkMadeWith")} · ${ltr(siteURL().replace(/^https?:\/\//, ""))}`, H - 36, "center", "#5a4a45");
    return k.cv;
  }
  function drawCard() {
    const m = stats("month"), sc = health(m), top = topServices(m.jobList)[0], sk = streak();
    const k = canvasKit(1080, 1920), { c, W, P, font, text, wrap } = k;
    const g = c.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, "#8a0a10"); g.addColorStop(1, "#3a0204");
    c.fillStyle = g; c.fillRect(0, 0, W, 1920);
    const gold = c.createLinearGradient(0, 0, W, 0); gold.addColorStop(0, "#b98a45"); gold.addColorStop(.45, "#f1d796"); gold.addColorStop(1, "#c59d58");
    font("700", 34); text("DATA WEY TALK", 150, "center", "#debb79");
    font("700", 76, true); k.wrap(B.biz || "My business", W - 2 * P).slice(0, 2).forEach((l, i) => text(l, 290 + i * 90, "center", "#ffffff"));
    font("400", 36); text(t("tr_" + (B.trade || "other")), 470, "center", "#f7ecd9");
    font("400", 40); text(t("gmHealth"), 640, "center", "#f7ecd9");
    font("700", 230, true); c.fillStyle = gold; c.textAlign = "center"; c.fillText(`${sc}`, W / 2, 880);
    font("400", 48); text("/ 100", 950, "center", "#f7ecd9");
    c.fillStyle = "rgba(255,255,255,.18)"; c.fillRect(P + 60, 1000, W - 2 * P - 120, 22);
    c.fillStyle = gold; c.fillRect(P + 60, 1000, (W - 2 * P - 120) * sc / 100, 22);
    font("700", 64); text(badge(sc), 1120, "center", "#ffffff");
    font("400", 42);
    let y = 1240;
    const line = (s) => { text(s, y, "center", "#f7ecd9"); y += 70; };
    line(t("bkCardJobs", { n: m.jobs }));
    if (top) line(t("bkCardTop", { s: top[0] }));
    if (sk > 1) line(t("bkCardStreak", { n: sk }));
    if (B.showMoney) line(`${t("bkProfit")}: ${money(m.profit)}`);
    c.fillStyle = gold; c.fillRect(P, 1580, W - 2 * P, 190);
    font("700", 46); text(t("bkCardCta"), 1660, "center", "#3a0204");
    font("600", 34); text(ltr(siteURL().replace(/^https?:\/\//, "")), 1725, "center", "#3a0204");
    font("400", 28); text(`${t("bkMadeWith")} · Scitylana`, 1850, "center", "rgba(247,236,217,.8)");
    return k.cv;
  }
  function showImage(cv, name) {
    cv.toBlob((blob) => {
      if (!blob) return;
      if (lastImg) URL.revokeObjectURL(lastImg.url);
      lastImg = { blob, url: URL.createObjectURL(blob), name };
      const el = $("bkImg"); if (el) { el.innerHTML = imgHTML(); el.scrollIntoView({ block: "nearest" }); }
    }, "image/png");
  }
  async function shareImage() {
    if (!lastImg) return;
    const file = new File([lastImg.blob], lastImg.name, { type: "image/png" });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text: siteURL() }); return; }
    } catch (_) { return; }   // the person closed the share sheet
    downloadBlob(lastImg.blob, lastImg.name);
  }

  // ---------- render ----------
  function render() {
    const locked = window.dwtSurveyDone && !window.dwtSurveyDone();
    if (locked) { box.innerHTML = sLocked(); return; }
    if (!B.trade) { box.innerHTML = sSetup(); return; }
    const tabs = ["add", "sum", "owe", "price", "doc", "card"];
    const owedCount = B.entries.filter((e) => owing(e) > 0).length;
    box.innerHTML = `<div class="bk-top"><span class="bk-biz" dir="auto">${esc(B.biz || t("tr_" + B.trade))}</span>
        <button type="button" class="chip" data-act="setup">⚙️</button>
        ${installEvt ? `<button type="button" class="chip" data-act="install">${esc(t("bkInstall"))}</button>` : ""}</div>
      <div class="bk-tabs" role="tablist">${tabs.map((x) => `<button type="button" role="tab" aria-selected="${tab === x}" data-tab="${x}">${esc(t("bkT_" + x))}${x === "owe" && owedCount ? ` <span class="bk-count">${owedCount}</span>` : ""}</button>`).join("")}</div>
      <div class="bk-panel" role="tabpanel">${{ add: sAdd, sum: sSum, owe: sOwe, price: sPrice, doc: sDoc, card: sCard }[tab]()}</div>
      ${!installEvt && !window.matchMedia?.("(display-mode: standalone)").matches ? `<p class="muted small bk-tip">${esc(t("bkInstallTip"))}</p>` : ""}`;
  }
  function setPath(obj, path, v) { const p = path.split("."); let o = obj; for (let i = 0; i < p.length - 1; i++) o = o[p[i]]; o[p[p.length - 1]] = v; }

  box.addEventListener("input", (e) => {
    const el = e.target, d = el.dataset;
    if (d.f) {
      form[d.f] = el.type === "checkbox" ? el.checked : el.value;
      if (d.f === "full") render();
      if (d.f === "item") box.querySelectorAll("[data-item]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.item === el.value)));
    } else if (d.b) {
      B[d.b] = el.type === "checkbox" ? el.checked : el.value; save();
    } else if (d.k) {
      setPath(B, d.k, el.value); save();
      if (d.k.startsWith("calc.")) $("bkPriceOut").innerHTML = priceOut();
      if (d.k.startsWith("doc.")) { const tEl = $("bkDocTotal"); if (tEl) tEl.textContent = money(docTotal(B.doc)); }
    }
  });
  box.addEventListener("change", (e) => { const d = e.target.dataset; if (e.target.tagName === "SELECT" && d.b) { B[d.b] = e.target.value; save(); } });
  box.addEventListener("click", (e) => {
    const b = e.target.closest("button, a"); if (!b) return;
    const d = b.dataset;
    if (d.trade) { B.trade = d.trade; save(); box.querySelectorAll("[data-trade]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); return; }
    if (d.tab) { tab = d.tab; flash = ""; render(); return; }
    if (d.kind) { form = { ...form, k: d.kind, item: "" }; render(); return; }
    if (d.item !== undefined) { form.item = d.item; render(); box.querySelector('[data-f="amt"]')?.focus(); return; }
    if (d.svc !== undefined) { B.calc.svc = d.svc; save(); render(); return; }
    if (d.del) { B.entries = B.entries.filter((x) => x.id !== d.del); save(); render(); return; }
    if (d.paid) { const x = B.entries.find((y) => y.id === d.paid); if (x) { x.paid = x.amt; save(); render(); } return; }
    if (d.receipt) { const x = B.entries.find((y) => y.id === d.receipt); B.doc = newDoc(x); save(); lastImg = null; tab = "doc"; render(); return; }
    if (d.doctype) { B.doc.type = d.doctype; save(); render(); return; }
    if (d.delline !== undefined) { B.doc.lines.splice(+d.delline, 1); if (!B.doc.lines.length) B.doc.lines.push({ d: "", q: "1", p: "" }); save(); render(); return; }
    switch (d.act) {
      case "open": if (!B.trade) return; B.phone = box.querySelector('[data-b="phone"]')?.value || B.phone; save(); render(); return;
      case "setup": B.trade = ""; render(); return;
      case "save": {
        const amt = N(form.amt), item = String(form.item).trim();
        if (!item || !(amt > 0)) { const er = $("bkErr"); er.textContent = t("bkErr"); er.hidden = false; return; }
        const paid = form.k === "job" ? (form.full ? amt : Math.min(amt, N(form.paid))) : 0;
        B.entries.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), d: form.d || today(), k: form.k, item, amt, paid,
          client: form.k === "job" ? String(form.client).trim() : "", ph: form.k === "job" ? String(form.ph).trim() : "" });
        save();
        form = { k: form.k, item: "", amt: "", full: true, paid: "", client: "", ph: "", d: form.d };
        flash = t("bkSaved"); render(); setTimeout(() => { flash = ""; const f = box.querySelector(".bk-flash"); if (f) f.remove(); }, 2500);
        return;
      }
      case "analyse": {
        if (typeof load !== "function") return;
        load(`${B.biz || "My book"}.csv`, jobsCSV());
        setTimeout(() => $("results")?.scrollIntoView({ block: "start" }), 50);
        return;
      }
      case "csv": downloadBlob(new Blob([fullCSV()], { type: "text/csv;charset=utf-8" }), `${slug(B.biz)}-book-${today()}.csv`); return;
      case "addline": B.doc.lines.push({ d: "", q: "1", p: "" }); save(); render(); return;
      case "makedoc": showImage(drawDoc(), `${B.doc.type}-${String(B.doc.no).padStart(4, "0")}.png`); if (B.doc.no >= B.docNo) { B.docNo = B.doc.no + 1; save(); } return;
      case "makecard": showImage(drawCard(), `${slug(B.biz)}-report-card.png`); return;
      case "shareimg": shareImage(); return;
      case "dlimg": if (lastImg) downloadBlob(lastImg.blob, lastImg.name); return;
      case "install": if (installEvt) { installEvt.prompt(); installEvt = null; render(); } return;
    }
  });

  // "Install as app" (Android Chrome); iPhone users get the tip text instead.
  let installEvt = null;
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installEvt = e; render(); });
  document.addEventListener("dwt:lang", render);
  document.querySelectorAll('a[href="#book"]').forEach((a) => a.addEventListener("click", () => render()));
  render();
})();

// Offline support: cache the site so the book opens without data.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
