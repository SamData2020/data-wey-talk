/* "Business Boss" game: a business owner enters sales and costs, sees profit, plays with
   what-if sliders, uses goal seek ("I want ₦X profit"), and downloads an analyst report.
   Everything stays on the visitor's device (saved in localStorage "dwt-game"). */

Object.assign(I18N.pcm, {
  navGame: "Business Game",
  gmToolBtn: "🎮 Play di Business Boss game",
  gmEyebrow: "🎮 Business Boss game",
  gmTitle: "Be di oga: make your business profit grow",
  gmLede: "Put your sales and costs, see your profit, play 'what if', and tell di game how much profit you want — e go show you di road. Download your business report for free.",
  gmStart: "Start di game",
  gmDemo: "Try am with example (Mama Nkechi akara business)",
  gmResume: "Continue where I stop",
  gmLocked: "Abeg fill di short form for top first, then come back play.",
  gmLevel: "Level {n} of 3",
  gmL1: "Your business", gmL2: "Your sales", gmL3: "Your costs",
  gmName: "Business name", gmNamePh: "e.g. Mama Nkechi Akara",
  gmType: "Kind of business", gmCur: "Currency", gmPeriod: "Your numbers na for",
  gmP_day: "one day", gmP_week: "one week", gmP_month: "one month",
  gmPer_day: "per day", gmPer_week: "per week", gmPer_month: "per month",
  gmDays: "Which days you dey sell pass? (busiest days)",
  gmSalesHow: "How you wan put your sales?", gmTotalMode: "One total", gmItemsMode: "Item by item",
  gmSalesTotal: "Total sales ({per})",
  gmItem: "Product", gmQty: "How many you sell", gmPrice: "Price for one", gmAddItem: "+ Add product", gmRemove: "Remove",
  gmCustomers: "How many customers ({per})?",
  gmCostsHow: "How you wan put your costs?",
  gmCostTotal: "Total running cost ({per})",
  gmVarShare: "How much of dis cost na stock/ingredients wey dey increase when you sell more?",
  gmCostName: "Wetin you spend on", gmCostAmt: "How much", gmVaries: "E dey increase when I sell more",
  gmAddCost: "+ Add cost", gmIdeas: "Quick add:",
  gmPre_rent: "Shop rent", gmPre_staff: "Staff pay", gmPre_stock: "Stock / ingredients", gmPre_transport: "Transport",
  gmPre_power: "Fuel / light", gmPre_data: "Data & airtime",
  gmBack: "← Back", gmNext: "Next →", gmSee: "See my scoreboard 🏁",
  gmErr: "Abeg put your sales and your costs (numbers wey pass 0).",
  gmBoard: "{name} scoreboard",
  gmProfit: "Profit ({per})", gmLoss: "Loss ({per})",
  gmMargin: "Profit margin", gmMarginX: "From every 100 you sell, you keep {m}.",
  gmAvg: "Each customer dey spend", gmCpc: "Cost per customer",
  gmBE: "Break-even sales", gmBEX: "Sell at least dis ({per}) so you no lose money.",
  gmTotalSales: "Total sales", gmTotalCosts: "Total costs", gmCustK: "Customers",
  gmHealth: "Business health",
  gmB1: "🏆 Oga Patapata", gmB2: "💪 Steady Boss", gmB3: "🌱 Hustler", gmB4: "🚨 Danger zone",
  gmCostsT: "Where your money dey go",
  gmVarCosts: "Costs wey dey move with sales", gmFixedCosts: "Fixed costs",
  gmWhatIf: "What if…? Play with am",
  gmWiPrice: "Change your prices", gmWiCust: "Change number of customers", gmWiCut: "Cut your costs",
  gmWiNew: "New profit", gmWiVs: "{d} compared to now", gmReset: "Reset",
  gmGoal: "🎯 Goal seek: how much profit you want ({per})?",
  gmGoalBtn: "Show me di road", gmQ_be: "Just break even", gmQ_20: "+20% profit", gmQ_x2: "Double my profit",
  gmGoalDone: "🎉 You don already reach dis goal! Set a bigger one.",
  gmGap: "You need {gap} more profit. Choose your road:",
  gmRCut: "✂️ Cut costs by {amt} ({pct}% of all your costs). Start from {item} — na your biggest cost.",
  gmRCust: "👥 Get {n} more customers ({pct}% more), wey dey spend like your customers now.",
  gmRPrice: "🏷️ Raise prices by {pct}% (if your customers no run).",
  gmRMix: "⚖️ Small-small of each: cut costs {c}%, raise price {p}%, add {n} customers.",
  gmRNo: "This road no fit work alone.",
  gmApply: "Try di mixed plan for di sliders",
  gmHit: "🎯 Goal reached! Na so oga dey do am.",
  gmRecs: "Analyst advice",
  recLoss: "You dey lose {loss} ({per}). To stop di loss you need about {n} more customers, or cut costs by {cut}.",
  recThin: "Your margin ({m}) thin. Check your prices — small increase fit help well-well.",
  recGood: "Your margin ({m}) strong. Protect your best customers and keep your records.",
  recBig: "{item} take {pct}% of your costs. Compare suppliers, buy in bulk, or reduce waste.",
  recDays: "Get enough stock and hands for {days}. Do small promo for di quiet days to pull customers.",
  recUpsell: "Each customer dey spend {avg}. If each one buy small extra (+10%), you fit gain about {gain} ({per}).",
  recRecord: "Write your sales every day — next time, your numbers go correct pass.",
  gmAch: "Achievements", gmXP: "{xp} XP",
  achStart: "📒 Record keeper", achDetective: "🔍 Cost detective", achGoal: "🎯 Goal setter", achHit: "🚀 Goal hitter", achReport: "📄 Analyst",
  gmReport: "📄 Download my business report", gmPrint: "🖨️ Print / save as PDF", gmEdit: "✏️ Change my numbers", gmAgain: "Start again",
  rpTitle: "Business Analysis Report", rpFor: "Prepared for", rpDate: "Date", rpBy: "Made with Data Wey Talk by Scitylana — free data education for African businesses.",
  rpNumbers: "Key numbers", rpCosts: "Cost breakdown", rpSales: "Sales", rpItem: "Item", rpAmount: "Amount", rpShare: "Share",
  rpGoal: "Goal: {target} profit ({per})", rpWhatIf: "What-if scenario", rpBusiest: "Busiest days", rpPeriod: "Period",
  rpNote: "These are estimates from the numbers you entered. For deeper analysis, email scitylanaltd@gmail.com.",
});

Object.assign(I18N.en, {
  navGame: "Business Game",
  gmToolBtn: "🎮 Play the Business Boss game",
  gmEyebrow: "🎮 Business Boss game",
  gmTitle: "Be the boss: grow your business profit",
  gmLede: "Enter your sales and costs, see your profit, play 'what if', and tell the game how much profit you want — it shows you the way. Download your business report for free.",
  gmStart: "Start the game",
  gmDemo: "Try an example (Mama Nkechi's akara business)",
  gmResume: "Continue where I left off",
  gmLocked: "Please fill in the short form at the top first, then come back to play.",
  gmLevel: "Level {n} of 3",
  gmL1: "Your business", gmL2: "Your sales", gmL3: "Your costs",
  gmName: "Business name", gmNamePh: "e.g. Mama Nkechi Akara",
  gmType: "Type of business", gmCur: "Currency", gmPeriod: "Your numbers are for",
  gmP_day: "one day", gmP_week: "one week", gmP_month: "one month",
  gmPer_day: "per day", gmPer_week: "per week", gmPer_month: "per month",
  gmDays: "Which are your busiest days?",
  gmSalesHow: "How do you want to enter sales?", gmTotalMode: "One total", gmItemsMode: "Item by item",
  gmSalesTotal: "Total sales ({per})",
  gmItem: "Product", gmQty: "Quantity sold", gmPrice: "Price each", gmAddItem: "+ Add product", gmRemove: "Remove",
  gmCustomers: "How many customers ({per})?",
  gmCostsHow: "How do you want to enter costs?",
  gmCostTotal: "Total operating cost ({per})",
  gmVarShare: "How much of this cost is stock/ingredients that rises when you sell more?",
  gmCostName: "What you spend on", gmCostAmt: "Amount", gmVaries: "Rises when I sell more",
  gmAddCost: "+ Add cost", gmIdeas: "Quick add:",
  gmPre_rent: "Shop rent", gmPre_staff: "Staff pay", gmPre_stock: "Stock / ingredients", gmPre_transport: "Transport",
  gmPre_power: "Fuel / power", gmPre_data: "Data & airtime",
  gmBack: "← Back", gmNext: "Next →", gmSee: "See my scoreboard 🏁",
  gmErr: "Please enter your sales and your costs (numbers above 0).",
  gmBoard: "{name} scoreboard",
  gmProfit: "Profit ({per})", gmLoss: "Loss ({per})",
  gmMargin: "Profit margin", gmMarginX: "Of every 100 you sell, you keep {m}.",
  gmAvg: "Each customer spends", gmCpc: "Cost per customer",
  gmBE: "Break-even sales", gmBEX: "Sell at least this ({per}) to avoid a loss.",
  gmTotalSales: "Total sales", gmTotalCosts: "Total costs", gmCustK: "Customers",
  gmHealth: "Business health",
  gmB1: "🏆 Top Boss", gmB2: "💪 Steady Boss", gmB3: "🌱 Hustler", gmB4: "🚨 Danger zone",
  gmCostsT: "Where your money goes",
  gmVarCosts: "Costs that move with sales", gmFixedCosts: "Fixed costs",
  gmWhatIf: "What if…? Try it",
  gmWiPrice: "Change your prices", gmWiCust: "Change number of customers", gmWiCut: "Cut your costs",
  gmWiNew: "New profit", gmWiVs: "{d} compared to now", gmReset: "Reset",
  gmGoal: "🎯 Goal seek: how much profit do you want ({per})?",
  gmGoalBtn: "Show me the way", gmQ_be: "Just break even", gmQ_20: "+20% profit", gmQ_x2: "Double my profit",
  gmGoalDone: "🎉 You've already reached this goal! Set a bigger one.",
  gmGap: "You need {gap} more profit. Pick your route:",
  gmRCut: "✂️ Cut costs by {amt} ({pct}% of all your costs). Start with {item} — your biggest cost.",
  gmRCust: "👥 Get {n} more customers ({pct}% more) who spend like your current ones.",
  gmRPrice: "🏷️ Raise prices by {pct}% (if customers stay).",
  gmRMix: "⚖️ A bit of each: cut costs {c}%, raise prices {p}%, add {n} customers.",
  gmRNo: "This route can't do it alone.",
  gmApply: "Try the mixed plan on the sliders",
  gmHit: "🎯 Goal reached! That's how a boss does it.",
  gmRecs: "Analyst advice",
  recLoss: "You're losing {loss} ({per}). To stop the loss you need about {n} more customers, or to cut costs by {cut}.",
  recThin: "Your margin ({m}) is thin. Check your prices — a small increase can help a lot.",
  recGood: "Your margin ({m}) is strong. Look after your best customers and keep recording.",
  recBig: "{item} is {pct}% of your costs. Compare suppliers, buy in bulk, or cut waste.",
  recDays: "Have enough stock and staff for {days}. Run small promotions on quiet days to bring customers in.",
  recUpsell: "Each customer spends {avg}. If each buys a small extra (+10%), you could gain about {gain} ({per}).",
  recRecord: "Record your sales every day — next time your numbers will be even more accurate.",
  gmAch: "Achievements", gmXP: "{xp} XP",
  achStart: "📒 Record keeper", achDetective: "🔍 Cost detective", achGoal: "🎯 Goal setter", achHit: "🚀 Goal hitter", achReport: "📄 Analyst",
  gmReport: "📄 Download my business report", gmPrint: "🖨️ Print / save as PDF", gmEdit: "✏️ Change my numbers", gmAgain: "Start again",
  rpTitle: "Business Analysis Report", rpFor: "Prepared for", rpDate: "Date", rpBy: "Made with Data Wey Talk by Scitylana — free data education for African businesses.",
  rpNumbers: "Key numbers", rpCosts: "Cost breakdown", rpSales: "Sales", rpItem: "Item", rpAmount: "Amount", rpShare: "Share",
  rpGoal: "Goal: {target} profit ({per})", rpWhatIf: "What-if scenario", rpBusiest: "Busiest days", rpPeriod: "Period",
  rpNote: "These are estimates from the numbers you entered. For deeper analysis, email scitylanaltd@gmail.com.",
});

(function businessGame() {
  const KEY = "dwt-game";
  const box = $("gameBox");
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (_) { return null; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (_) {} },
  };
  const BIZ = ["food", "retail", "fashion", "beauty", "agro", "transport", "pos", "electronics", "services", "other"];
  const PRESETS = [["rent", false], ["staff", false], ["stock", true], ["transport", true], ["power", true], ["data", false]];
  const WI = { price: [-30, 50], cust: [-50, 100], cut: [0, 50] };   // slider ranges (%)

  function defaultCur() {
    let country = "";
    try { country = JSON.parse(localStorage.getItem("dwt-profile") || "{}").country || ""; } catch (_) {}
    const c = CURRENCIES.find((x) => x.c.includes(country));
    return c ? c.code : "NGN";
  }
  const blank = () => ({
    stage: "intro", name: "", type: "", cur: defaultCur(), period: "month", days: [],
    salesMode: "items", salesTotal: "", items: [{ name: "", qty: "", price: "" }], customers: "",
    costMode: "items", costTotal: "", varShare: 40, costs: [{ name: "", amt: "", varies: false }],
    target: "", wi: { price: 0, cust: 0, cut: 0 }, ach: [],
  });
  let g = store.get() || blank();
  const saved = !!store.get();
  g.stage = "intro";

  const demo = () => Object.assign(blank(), {
    name: "Mama Nkechi Akara", type: "food", cur: "NGN", period: "month", days: [4, 5, 6],
    salesMode: "items", items: [
      { name: "Akara", qty: "9000", price: "100" }, { name: "Agege bread", qty: "1200", price: "600" }, { name: "Sliced bread", qty: "600", price: "900" }],
    customers: "4500", costMode: "items", costs: [
      { name: "Beans, oil & flour", amt: "980000", varies: true }, { name: "Shop rent", amt: "120000", varies: false },
      { name: "2 helpers", amt: "300000", varies: false }, { name: "Gas & fuel", amt: "150000", varies: true },
      { name: "Transport", amt: "60000", varies: true }, { name: "Data & airtime", amt: "15000", varies: false }],
  });

  // ---------- helpers ----------
  const N = (v) => { const n = parseNum(v); return n === null ? 0 : n; };
  const per = () => t("gmPer_" + g.period);
  const loc = () => (lang === "pcm" ? "en-NG" : lang === "ar" ? "ar-u-nu-latn" : lang);
  function dayName(i, style = "long") {
    try { return new Intl.DateTimeFormat(loc(), { weekday: style }).format(new Date(2026, 0, 5 + i)); }   // 5 Jan 2026 = Monday
    catch (_) { return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]; }
  }
  function money(n) {
    const c = CUR_BY_CODE[g.cur], abs = Math.abs(n);
    const s = abs.toLocaleString("en-NG", { maximumFractionDigits: abs < 100 && abs % 1 ? 2 : 0 });
    const body = !c ? s : c.after ? `${s} ${c.sym}` : /[A-Za-z]$/.test(c.sym) ? `${c.sym} ${s}` : c.sym + s;
    return (n < 0 ? "−" : "") + body;
  }
  const pc = (x) => `${fmtPct(x)}%`;
  const unlock = (a) => { if (!g.ach.includes(a)) { g.ach.push(a); return true; } return false; };
  const save = () => store.set(g);

  function calc(src = g) {
    const S = src.salesMode === "items" ? src.items.reduce((s, it) => s + N(it.qty) * N(it.price), 0) : N(src.salesTotal);
    const cust = N(src.customers);
    let F = 0, V = 0, list;
    if (src.costMode === "items") {
      list = src.costs.filter((c) => N(c.amt) > 0).map((c) => ({ name: c.name.trim() || t("gmCostName"), amt: N(c.amt), varies: !!c.varies }));
      list.forEach((c) => (c.varies ? (V += c.amt) : (F += c.amt)));
    } else {
      const C = N(src.costTotal);
      V = C * src.varShare / 100; F = C - V;
      list = [{ name: t("gmVarCosts"), amt: V, varies: true }, { name: t("gmFixedCosts"), amt: F }].filter((c) => c.amt > 0);
    }
    list.sort((a, b) => b.amt - a.amt);
    const C = F + V, P = S - C, v = S ? V / S : 0, avg = cust ? S / cust : 0;
    return { S, cust, F, V, C, P, v, avg, list, margin: S ? (P / S) * 100 : 0, contrib: avg * (1 - v), be: v < 1 ? F / (1 - v) : Infinity };
  }
  function whatIf(r) {
    const p = g.wi.price / 100, q = g.wi.cust / 100, k = g.wi.cut / 100;
    const S = r.S * (1 + p) * (1 + q), V = r.V * (1 + q) * (1 - k), F = r.F * (1 - k);
    return S - V - F;
  }
  function plan(r, T) {
    const gap = T - r.P;
    if (!(gap > 0)) return { done: true, gap };
    const cut = r.C ? (gap / r.C) * 100 : Infinity;
    const custN = r.contrib > 0 ? Math.ceil(gap / r.contrib) : Infinity;
    const custPct = r.cust ? (custN / r.cust) * 100 : Infinity;
    const price = r.S ? (gap / r.S) * 100 : Infinity;
    const share = isFinite(custN) ? 3 : 2;
    const m = { c: r.C ? (gap / share / r.C) * 100 : 0, p: r.S ? (gap / share / r.S) * 100 : 0, n: isFinite(custN) ? Math.ceil(gap / 3 / r.contrib) : 0 };
    m.q = r.cust ? (m.n / r.cust) * 100 : 0;
    return { gap, cut, custN, custPct, price, mix: m, big: r.list[0] };
  }
  function score(r) { return Math.max(0, Math.min(100, Math.round(40 + r.margin * 2))); }
  const badge = (s) => t(s >= 80 ? "gmB1" : s >= 60 ? "gmB2" : s >= 40 ? "gmB3" : "gmB4");

  function recs(r) {
    const out = [];
    if (r.P < 0) {
      const n = r.contrib > 0 ? Math.ceil(-r.P / r.contrib) : "—";
      out.push(t("recLoss", { loss: money(-r.P), per: per(), n, cut: money(-r.P) }));
    } else if (r.margin < 15) out.push(t("recThin", { m: pc(r.margin) }));
    else out.push(t("recGood", { m: pc(r.margin) }));
    const big = r.list[0];
    if (big && r.C && big.amt / r.C >= 0.3 && r.list.length > 1) out.push(t("recBig", { item: big.name, pct: fmtPct((big.amt / r.C) * 100) }));
    if (g.days.length) out.push(t("recDays", { days: g.days.slice().sort().map((d) => dayName(d)).join(", ") }));
    if (r.avg > 0) out.push(t("recUpsell", { avg: money(r.avg), gain: money(r.S * 0.1 * (1 - r.v)), per: per() }));
    out.push(t("recRecord"));
    return out;
  }

  // ---------- screens ----------
  const field = (label, html, wide) => `<label class="field${wide ? " wide" : ""}"><span>${esc(label)}</span>${html}</label>`;
  const inp = (k, val, extra = "") => `<input data-k="${k}" value="${esc(val ?? "")}" ${extra}>`;
  const numInp = (k, val, ph = "") => inp(k, val, `inputmode="decimal" autocomplete="off" placeholder="${esc(ph)}"`);
  const seg = (k, val, opts) => `<div class="seg" role="radiogroup">${opts.map(([v, l]) =>
    `<button type="button" role="radio" aria-checked="${val === v}" data-set="${k}" data-v="${v}">${esc(l)}</button>`).join("")}</div>`;
  const progress = (n) => `<div class="gm-level"><span>${esc(t("gmLevel", { n }))} · ${esc(t("gmL" + n))}</span>
    <span class="gm-xp" aria-hidden="true"><span style="width:${(n - 1) * 33 + 10}%"></span></span></div>`;
  const nav = (back, next, nextLabel) => `<div class="gm-nav">
    ${back ? `<button type="button" class="btn ghost" data-go="${back}">${esc(t("gmBack"))}</button>` : "<span></span>"}
    <button type="button" class="btn" data-go="${next}">${esc(nextLabel || t("gmNext"))}</button></div>`;

  function sIntro() {
    const locked = window.dwtSurveyDone && !window.dwtSurveyDone();
    return `<div class="gm-intro">
      ${locked ? `<p class="qz-banner">${esc(t("gmLocked"))} <a class="mail" href="#start">↑</a></p>` : ""}
      <button type="button" class="btn" data-act="start"${locked ? " disabled" : ""}>${esc(saved && g.name ? t("gmResume") : t("gmStart"))}</button>
      <button type="button" class="btn ghost" data-act="demo"${locked ? " disabled" : ""}>${esc(t("gmDemo"))}</button>
    </div>`;
  }
  function s1() {
    const types = `<select data-k="type"><option value="">${esc(t("svPick"))}</option>${BIZ.map((b) =>
      `<option value="${b}"${g.type === b ? " selected" : ""}>${esc(t("bt_" + b))}</option>`).join("")}</select>`;
    const curs = `<select data-k="cur">${CURRENCIES.map((c) => `<option value="${c.code}"${g.cur === c.code ? " selected" : ""}>${c.code} · ${esc(c.sym)}</option>`).join("")}</select>`;
    const days = `<div class="gm-days">${[0, 1, 2, 3, 4, 5, 6].map((d) =>
      `<button type="button" class="chip" aria-pressed="${g.days.includes(d)}" data-day="${d}">${esc(dayName(d, "short"))}</button>`).join("")}</div>`;
    return progress(1) + `<div class="grid2">
      ${field(t("gmName"), inp("name", g.name, `maxlength="60" placeholder="${esc(t("gmNamePh"))}"`))}
      ${field(t("gmType"), types)}
      ${field(t("gmCur"), curs)}
      <div class="field"><span>${esc(t("gmPeriod"))}</span>${seg("period", g.period, ["day", "week", "month"].map((p) => [p, t("gmP_" + p)]))}</div>
    </div>
    <fieldset class="gm-fs"><legend>${esc(t("gmDays"))}</legend>${days}</fieldset>` + nav("intro", "s2");
  }
  function s2() {
    let body;
    if (g.salesMode === "total") body = field(t("gmSalesTotal", { per: per() }), numInp("salesTotal", g.salesTotal, "500,000"), true);
    else body = `<div class="gm-rows">${g.items.map((it, i) => `<div class="gm-row">
        ${field(t("gmItem"), inp(`items.${i}.name`, it.name, 'maxlength="40"'))}
        ${field(t("gmQty"), numInp(`items.${i}.qty`, it.qty, "100"))}
        ${field(t("gmPrice"), numInp(`items.${i}.price`, it.price, "200"))}
        <button type="button" class="gm-x" data-del="items.${i}" aria-label="${esc(t("gmRemove"))}">×</button></div>`).join("")}
      <button type="button" class="btn ghost small-btn" data-add="items">${esc(t("gmAddItem"))}</button></div>`;
    const S = calc().S;
    return progress(2) + `<div class="field"><span>${esc(t("gmSalesHow"))}</span>${seg("salesMode", g.salesMode, [["total", t("gmTotalMode")], ["items", t("gmItemsMode")]])}</div>
      ${body}
      <p class="gm-live">${esc(t("gmTotalSales"))}: <b id="gmLiveS">${esc(money(S))}</b></p>
      ${field(t("gmCustomers", { per: per() }), numInp("customers", g.customers, "300"), true)}` + nav("s1", "s3");
  }
  function s3() {
    let body;
    if (g.costMode === "total") {
      body = field(t("gmCostTotal", { per: per() }), numInp("costTotal", g.costTotal, "350,000"), true) +
        `<label class="field wide"><span>${esc(t("gmVarShare"))} <b id="gmVS">${g.varShare}%</b></span>
         <input type="range" min="0" max="90" step="5" data-k="varShare" value="${g.varShare}"></label>`;
    } else {
      body = `<p class="gm-ideas"><span>${esc(t("gmIdeas"))}</span>${PRESETS.map(([k]) =>
        `<button type="button" class="chip" data-preset="${k}">+ ${esc(t("gmPre_" + k))}</button>`).join("")}</p>
        <div class="gm-rows">${g.costs.map((c, i) => `<div class="gm-row cost">
          ${field(t("gmCostName"), inp(`costs.${i}.name`, c.name, 'maxlength="40"'))}
          ${field(t("gmCostAmt"), numInp(`costs.${i}.amt`, c.amt, "50,000"))}
          <label class="check gm-var"><input type="checkbox" data-k="costs.${i}.varies"${c.varies ? " checked" : ""}><span>${esc(t("gmVaries"))}</span></label>
          <button type="button" class="gm-x" data-del="costs.${i}" aria-label="${esc(t("gmRemove"))}">×</button></div>`).join("")}
        <button type="button" class="btn ghost small-btn" data-add="costs">${esc(t("gmAddCost"))}</button></div>`;
    }
    return progress(3) + `<div class="field"><span>${esc(t("gmCostsHow"))}</span>${seg("costMode", g.costMode, [["total", t("gmTotalMode")], ["items", t("gmItemsMode")]])}</div>
      ${body}
      <p class="gm-live">${esc(t("gmTotalCosts"))}: <b id="gmLiveC">${esc(money(calc().C))}</b></p>
      <p class="error" id="gmErr" role="alert" hidden></p>` + nav("s2", "results", t("gmSee"));
  }

  function sResults() {
    const r = calc(), sc = score(r), T = N(g.target);
    const tile = (label, value, explain, cls = "") => `<div class="tile ${cls}"><div class="label">${esc(label)}</div><div class="value">${esc(value)}</div>${explain ? `<div class="explain">${esc(explain)}</div>` : ""}</div>`;
    const maxC = r.list[0] ? r.list[0].amt : 1;
    const bars = r.list.map((c) => `<div class="bar-row" title="${esc(c.name)}: ${esc(money(c.amt))} (${pc(r.C ? (c.amt / r.C) * 100 : 0)})">
        <span class="bar-label" dir="auto">${esc(c.name)}</span>
        <span class="bar-track"><span class="bar-fill" style="width:${(c.amt / maxC) * 50}%"></span><span class="bar-value">${esc(money(c.amt))} · ${pc(r.C ? (c.amt / r.C) * 100 : 0)}</span></span></div>`).join("");
    const slider = (k, label) => `<label class="field gm-slider"><span>${esc(label)} <b data-out="${k}">${g.wi[k] > 0 && k !== "cut" ? "+" : ""}${g.wi[k]}%</b></span>
      <input type="range" data-wi="${k}" min="${WI[k][0]}" max="${WI[k][1]}" step="1" value="${g.wi[k]}"></label>`;
    const quick = [["be", 0], ["20", r.P > 0 ? Math.round(r.P * 1.2) : 0], ["x2", r.P > 0 ? Math.round(r.P * 2) : 0]]
      .filter(([k, v]) => k === "be" || v > 0)
      .map(([k, v]) => `<button type="button" class="chip" data-target="${v}">${esc(t("gmQ_" + k))}</button>`).join("");
    const achs = ["achStart", "achDetective", "achGoal", "achHit", "achReport"];
    return `<h3 class="gm-board" dir="auto">${esc(t("gmBoard", { name: g.name || "My business" }))}</h3>
      <div class="gm-health"><div class="gm-health-top"><span>${esc(t("gmHealth"))}: <b>${sc}/100</b></span><span class="gm-badge">${esc(badge(sc))}</span></div>
        <div class="gm-meter" role="img" aria-label="${esc(t("gmHealth"))} ${sc}/100"><span style="width:${sc}%"></span></div></div>
      <div class="tiles">
        ${tile(t(r.P >= 0 ? "gmProfit" : "gmLoss", { per: per() }), money(r.P), "", r.P >= 0 ? "good" : "bad")}
        ${tile(t("gmMargin"), pc(r.margin), t("gmMarginX", { m: fmtPct(Math.max(0, r.margin)) }))}
        ${tile(t("gmTotalSales"), money(r.S), r.cust ? `${t("gmCustK")}: ${r.cust.toLocaleString("en")}` : "")}
        ${tile(t("gmTotalCosts"), money(r.C), r.cust ? `${t("gmCpc")}: ${money(r.C / r.cust)}` : "")}
        ${r.cust ? tile(t("gmAvg"), money(r.avg), "") : ""}
        ${isFinite(r.be) ? tile(t("gmBE"), money(r.be), t("gmBEX", { per: per() })) : ""}
      </div>
      <div class="card"><h3>${esc(t("gmCostsT"))}</h3><div class="bars">${bars}</div></div>

      <div class="card gm-goal">
        <h3>${esc(t("gmGoal", { per: per() }))}</h3>
        <div class="gm-goal-row">${numInp("target", g.target, money(Math.max(r.P, 0) * 1.5 || 100000))}
          <button type="button" class="btn" data-act="seek">${esc(t("gmGoalBtn"))}</button></div>
        <p class="gm-quick">${quick}</p>
        <div id="gmPlan">${planHTML(r, T)}</div>
      </div>

      <div class="card gm-whatif">
        <h3>${esc(t("gmWhatIf"))}</h3>
        ${slider("price", t("gmWiPrice"))}${slider("cust", t("gmWiCust"))}${slider("cut", t("gmWiCut"))}
        <div class="gm-wi-out" id="gmWiOut">${wiHTML(r)}</div>
        <button type="button" class="btn ghost small-btn" data-act="wireset">${esc(t("gmReset"))}</button>
      </div>

      <div class="card"><h3>${esc(t("gmRecs"))}</h3><ul class="gm-recs">${recs(r).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>

      <div class="card gm-ach"><h3>${esc(t("gmAch"))} · <span id="gmXP">${esc(t("gmXP", { xp: g.ach.length * 20 }))}</span></h3>
        <p>${achs.map((a) => `<span class="chip${g.ach.includes(a) ? " on" : ""}" data-ach="${a}">${esc(t(a))}</span>`).join("")}</p></div>

      <div class="gm-actions">
        <button type="button" class="btn gold" data-act="report">${esc(t("gmReport"))}</button>
        <button type="button" class="btn ghost" data-act="print">${esc(t("gmPrint"))}</button>
        <button type="button" class="btn ghost" data-go="s1">${esc(t("gmEdit"))}</button>
        <button type="button" class="btn ghost" data-act="again">${esc(t("gmAgain"))}</button>
      </div>`;
  }
  function planHTML(r, T) {
    if (!g.target) return "";
    const p = plan(r, T);
    if (p.done) return `<p class="qz-ok">${esc(t("gmGoalDone"))}</p>`;
    const li = (ok, txt) => `<li class="${ok ? "" : "no"}">${esc(txt)}${ok ? "" : ` <em>(${esc(t("gmRNo"))})</em>`}</li>`;
    return `<p><b>${esc(t("gmGap", { gap: money(p.gap) }))}</b></p><ul class="gm-routes">
      ${li(p.cut <= 100, t("gmRCut", { amt: money(p.gap), pct: fmtPct(p.cut), item: p.big ? p.big.name : "—" }))}
      ${isFinite(p.custN) ? li(true, t("gmRCust", { n: p.custN.toLocaleString("en"), pct: isFinite(p.custPct) ? fmtPct(p.custPct) : "—" })) : ""}
      ${li(isFinite(p.price), t("gmRPrice", { pct: fmtPct(p.price) }))}
      ${li(true, t("gmRMix", { c: fmtPct(p.mix.c), p: fmtPct(p.mix.p), n: p.mix.n.toLocaleString("en") }))}
    </ul><button type="button" class="btn ghost small-btn" data-act="apply">${esc(t("gmApply"))}</button>`;
  }
  function wiHTML(r) {
    const P2 = whatIf(r), d = P2 - r.P, T = N(g.target);
    const hit = g.target && T > r.P && P2 >= T;
    return `<span>${esc(t("gmWiNew"))}: <b class="${P2 >= 0 ? "up" : "down"}">${esc(money(P2))}</b></span>
      <span class="muted">${esc(t("gmWiVs", { d: (d >= 0 ? "+" : "") + money(d) }))}</span>
      ${hit ? `<p class="gm-hit">${esc(t("gmHit"))}</p>` : ""}`;
  }

  // ---------- report ----------
  function reportHTML() {
    const r = calc(), T = N(g.target), p = g.target ? plan(r, T) : null, sc = score(r);
    const dir = typeof RTL !== "undefined" && RTL.includes(lang) ? "rtl" : "ltr";
    const row = (a, b) => `<tr><th>${esc(a)}</th><td>${esc(b)}</td></tr>`;
    const typeName = g.type ? t("bt_" + g.type) : "";
    const salesRows = g.salesMode === "items"
      ? g.items.filter((it) => N(it.qty) * N(it.price) > 0).map((it) => `<tr><td dir="auto">${esc(it.name || "—")}</td><td>${esc(N(it.qty).toLocaleString("en"))} × ${esc(money(N(it.price)))}</td><td>${esc(money(N(it.qty) * N(it.price)))}</td></tr>`).join("")
      : "";
    const wiOn = g.wi.price || g.wi.cust || g.wi.cut;
    return `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t("rpTitle"))} – ${esc(g.name || "")}</title>
<style>
  body{font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1d1210;background:#fff;margin:0;padding:24px;max-width:820px;margin-inline:auto}
  header{background:#760308;color:#f7ecd9;padding:20px 24px;border-radius:14px;margin-bottom:20px}
  header h1{margin:0;font:700 24px Georgia,serif;color:#debb79} header p{margin:4px 0 0;opacity:.9}
  h2{font:700 18px Georgia,serif;color:#760308;border-bottom:2px solid #c59d58;padding-bottom:4px;margin-top:28px}
  table{border-collapse:collapse;width:100%} th,td{text-align:start;padding:7px 8px;border-bottom:1px solid #ece3d6;vertical-align:top}
  th{color:#5a4a45;font-weight:600;width:45%} td:last-child{font-variant-numeric:tabular-nums;white-space:nowrap}
  .big{display:flex;gap:12px;flex-wrap:wrap} .big div{flex:1 1 160px;border:1px solid #ece3d6;border-top:3px solid #c59d58;border-radius:10px;padding:10px 12px}
  .big b{display:block;font-size:20px} .big span{color:#5a4a45;font-size:13px}
  .loss b{color:#b3261e} .profit b{color:#006300}
  ul{padding-inline-start:20px} li{margin:4px 0}
  .bar{height:10px;background:#8a1018;border-radius:0 3px 3px 0;display:inline-block;vertical-align:middle;margin-inline-end:6px}
  footer{margin-top:32px;font-size:13px;color:#5a4a45;border-top:1px solid #ece3d6;padding-top:12px}
  @media print{body{padding:0} header{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<header><h1>${esc(t("rpTitle"))}</h1><p>${esc(t("rpFor"))}: <bdi>${esc(g.name || "—")}</bdi>${typeName ? " · " + esc(typeName) : ""} · ${esc(t("rpDate"))}: ${esc(new Date().toLocaleDateString(loc()))}</p></header>
<div class="big">
  <div class="${r.P >= 0 ? "profit" : "loss"}"><span>${esc(t(r.P >= 0 ? "gmProfit" : "gmLoss", { per: per() }))}</span><b>${esc(money(r.P))}</b></div>
  <div><span>${esc(t("gmMargin"))}</span><b>${esc(pc(r.margin))}</b></div>
  <div><span>${esc(t("gmHealth"))}</span><b>${sc}/100</b><span>${esc(badge(sc))}</span></div>
</div>
<h2>${esc(t("rpNumbers"))}</h2><table>
  ${row(t("rpPeriod"), t("gmP_" + g.period))}
  ${row(t("gmTotalSales"), money(r.S))}
  ${row(t("gmTotalCosts"), money(r.C))}
  ${row(t("gmFixedCosts"), money(r.F))}
  ${row(t("gmVarCosts"), money(r.V))}
  ${r.cust ? row(t("gmCustK"), r.cust.toLocaleString("en")) + row(t("gmAvg"), money(r.avg)) + row(t("gmCpc"), money(r.C / r.cust)) : ""}
  ${isFinite(r.be) ? row(t("gmBE"), money(r.be)) : ""}
  ${g.days.length ? row(t("rpBusiest"), g.days.slice().sort().map((d) => dayName(d)).join(", ")) : ""}
</table>
${salesRows ? `<h2>${esc(t("rpSales"))}</h2><table><tr><th>${esc(t("rpItem"))}</th><th></th><th>${esc(t("rpAmount"))}</th></tr>${salesRows}</table>` : ""}
<h2>${esc(t("rpCosts"))}</h2><table><tr><th>${esc(t("rpItem"))}</th><th>${esc(t("rpAmount"))}</th><th>${esc(t("rpShare"))}</th></tr>
${r.list.map((c) => { const s = r.C ? (c.amt / r.C) * 100 : 0; return `<tr><td dir="auto">${esc(c.name)}</td><td>${esc(money(c.amt))}</td><td><span class="bar" style="width:${Math.round(s)}px"></span>${esc(pc(s))}</td></tr>`; }).join("")}</table>
${p ? `<h2>${esc(t("rpGoal", { target: money(T), per: per() }))}</h2>${p.done ? `<p>${esc(t("gmGoalDone"))}</p>` : `<p>${esc(t("gmGap", { gap: money(p.gap) }))}</p><ul>
  <li>${esc(t("gmRCut", { amt: money(p.gap), pct: fmtPct(p.cut), item: p.big ? p.big.name : "—" }))}</li>
  ${isFinite(p.custN) ? `<li>${esc(t("gmRCust", { n: p.custN.toLocaleString("en"), pct: isFinite(p.custPct) ? fmtPct(p.custPct) : "—" }))}</li>` : ""}
  <li>${esc(t("gmRPrice", { pct: fmtPct(p.price) }))}</li>
  <li>${esc(t("gmRMix", { c: fmtPct(p.mix.c), p: fmtPct(p.mix.p), n: p.mix.n.toLocaleString("en") }))}</li></ul>`}` : ""}
${wiOn ? `<h2>${esc(t("rpWhatIf"))}</h2><table>
  ${row(t("gmWiPrice"), (g.wi.price > 0 ? "+" : "") + g.wi.price + "%")}
  ${row(t("gmWiCust"), (g.wi.cust > 0 ? "+" : "") + g.wi.cust + "%")}
  ${row(t("gmWiCut"), g.wi.cut + "%")}
  ${row(t("gmWiNew"), money(whatIf(r)))}</table>` : ""}
<h2>${esc(t("gmRecs"))}</h2><ul>${recs(r).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
<footer>${esc(t("rpNote"))}<br>${esc(t("rpBy"))}</footer>
</body></html>`;
  }
  function download() {
    const blob = new Blob([reportHTML()], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${(g.name || "business").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase() || "business"}-report.html`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function printReport() {
    const w = window.open("", "_blank");
    if (!w) { download(); return; }
    w.document.open(); w.document.write(reportHTML()); w.document.close();
    w.onload = () => w.print();
    setTimeout(() => { try { w.focus(); w.print(); } catch (_) {} }, 500);
  }

  // ---------- render + events ----------
  function render() {
    const screens = { intro: sIntro, s1, s2, s3, results: sResults };
    box.innerHTML = (screens[g.stage] || sIntro)();
    box.dataset.stage = g.stage;
  }
  function setPath(path, value) {
    const parts = path.split(".");
    let o = g;
    for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]];
    o[parts[parts.length - 1]] = value;
  }
  function liveTotals() {
    const r = calc();
    const s = $("gmLiveS"); if (s) s.textContent = money(r.S);
    const c = $("gmLiveC"); if (c) c.textContent = money(r.C);
  }
  function go(stage) {
    if (stage === "results") {
      const r = calc();
      if (!(r.S > 0) || !(r.C > 0)) { const e = $("gmErr"); if (e) { e.textContent = t("gmErr"); e.hidden = false; } return; }
      unlock("achStart");
      if (g.costMode === "items" && r.list.length >= 3) unlock("achDetective");
    }
    g.stage = stage; save(); render();
    box.closest("section").scrollIntoView({ block: "start" });
  }
  function seek(v) {
    if (v !== undefined) g.target = String(v);
    if (g.target === "" || g.target === null) return;
    unlock("achGoal"); save();
    const r = calc();
    $("gmPlan").innerHTML = planHTML(r, N(g.target));
    $("gmWiOut").innerHTML = wiHTML(r);
    refreshAch();
  }
  function refreshAch() {
    box.querySelectorAll("[data-ach]").forEach((el) => el.classList.toggle("on", g.ach.includes(el.dataset.ach)));
    const xp = $("gmXP"); if (xp) xp.textContent = t("gmXP", { xp: g.ach.length * 20 });
  }

  box.addEventListener("input", (e) => {
    const el = e.target;
    if (el.dataset.k) {
      const v = el.type === "checkbox" ? el.checked : el.type === "range" ? +el.value : el.value;
      setPath(el.dataset.k, v);
      if (el.dataset.k === "varShare") $("gmVS").textContent = v + "%";
      if (el.dataset.k === "target") { save(); return; }
      if (el.dataset.k === "cur" && g.stage === "s1") { save(); return; }
      liveTotals(); save();
    } else if (el.dataset.wi) {
      g.wi[el.dataset.wi] = +el.value;
      box.querySelector(`[data-out="${el.dataset.wi}"]`).textContent = (el.value > 0 && el.dataset.wi !== "cut" ? "+" : "") + el.value + "%";
      const r = calc();
      $("gmWiOut").innerHTML = wiHTML(r);
      const T = N(g.target);
      if (g.target && T > r.P && whatIf(r) >= T && unlock("achHit")) refreshAch();
      save();
    }
  });
  box.addEventListener("change", (e) => { if (e.target.tagName === "SELECT" && e.target.dataset.k) { setPath(e.target.dataset.k, e.target.value); save(); } });
  box.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.dataset.k === "target") { e.preventDefault(); seek(); } });
  box.addEventListener("click", (e) => {
    const b = e.target.closest("button, [data-ach]");
    if (!b) return;
    const d = b.dataset;
    if (d.go) return go(d.go);
    if (d.set) { g[d.set] = d.v; save(); render(); return; }
    if (d.day !== undefined) {
      const n = +d.day; g.days = g.days.includes(n) ? g.days.filter((x) => x !== n) : g.days.concat(n);
      b.setAttribute("aria-pressed", String(g.days.includes(n))); save(); return;
    }
    if (d.add) { g[d.add].push(d.add === "items" ? { name: "", qty: "", price: "" } : { name: "", amt: "", varies: false }); save(); render();
      const rows = box.querySelectorAll(".gm-row"); rows[rows.length - 1]?.querySelector("input")?.focus(); return; }
    if (d.del) { const [k, i] = d.del.split("."); g[k].splice(+i, 1); if (!g[k].length) g[k].push(k === "items" ? { name: "", qty: "", price: "" } : { name: "", amt: "", varies: false }); save(); render(); return; }
    if (d.preset) {
      const [, varies] = PRESETS.find(([k]) => k === d.preset);
      const empty = g.costs.findIndex((c) => !c.name && !c.amt);
      const item = { name: t("gmPre_" + d.preset), amt: "", varies };
      if (empty >= 0) g.costs[empty] = item; else g.costs.push(item);
      save(); render();
      const idx = empty >= 0 ? empty : g.costs.length - 1;
      box.querySelector(`[data-k="costs.${idx}.amt"]`)?.focus(); return;
    }
    if (d.target !== undefined) { const inpT = box.querySelector('[data-k="target"]'); if (inpT) inpT.value = d.target; return seek(d.target); }
    switch (d.act) {
      case "start": { if (window.dwtSurveyDone && !window.dwtSurveyDone()) return; const r = calc(); return go(r.S > 0 && r.C > 0 ? "results" : "s1"); }
      case "demo": g = demo(); return go("results");
      case "seek": { const inpT = box.querySelector('[data-k="target"]'); if (inpT) g.target = inpT.value; return seek(); }
      case "apply": {
        const p = plan(calc(), N(g.target)); if (p.done) return;
        const clamp = (k, v) => Math.max(WI[k][0], Math.min(WI[k][1], Math.ceil(v)));
        g.wi = { price: clamp("price", p.mix.p), cust: clamp("cust", p.mix.q || 0), cut: clamp("cut", p.mix.c) };
        save(); render();
        box.querySelector(".gm-whatif")?.scrollIntoView({ block: "center" });
        const r = calc(); if (whatIf(r) >= N(g.target) && unlock("achHit")) { save(); refreshAch(); }
        return;
      }
      case "wireset": g.wi = { price: 0, cust: 0, cut: 0 }; save(); render(); box.querySelector(".gm-whatif")?.scrollIntoView({ block: "center" }); return;
      case "report": unlock("achReport"); save(); refreshAch(); return download();
      case "print": unlock("achReport"); save(); refreshAch(); return printReport();
      case "again": g = blank(); save(); g.stage = "s1"; render(); return;
    }
  });

  window.dwtGameReport = reportHTML;   // handy for checking the report
  document.addEventListener("dwt:lang", render);
  render();
  // The survey may finish while this page is open: re-check the lock when people come to the game.
  document.querySelectorAll('a[href="#game"]').forEach((a) => a.addEventListener("click", () => { if (g.stage === "intro") render(); }));
})();
