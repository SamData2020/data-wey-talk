/* Correlation analysis + "email Scitylana for more analysis" button.
   Runs after each render of the results (event "dwt:rendered"). */

Object.assign(I18N.pcm, {
  corrTitle: "Wetin dey move together (correlation)",
  corrLede: "We check if your numbers dey go up and down together. Number near +1 or −1 mean say dem dey move together well-well. Near 0 mean say no real connection.",
  corrPick: "Press any line to see di picture.",
  corrCaution: "⚠️ Remember: two things wey dey move together no mean say one dey cause di other.",
  corrNone: "To check correlation, your file need at least two number columns, or one number column plus date.",
  corrTime: "Time",
  strStrong: "strong", strMedium: "medium", strWeak: "weak", strNone: "no real link",
  cPosStrong: "When {a} go up, {b} dey go up too — dem dey move together well-well.",
  cPosMed: "When {a} go up, {b} dey go up small-small.",
  cNegStrong: "When {a} go up, {b} dey come down — dem dey move opposite.",
  cNegMed: "When {a} go up, {b} dey come down small.",
  cWeak: "{a} and {b} no really dey move together.",
  cTimeUp: "As time dey pass, {b} dey go up.",
  cTimeDown: "As time dey pass, {b} dey come down.",
  cTimeFlat: "As time dey pass, {b} no really change.",
  cTimeUpWeak: "As time dey pass, {b} dey go up small-small.",
  cTimeDownWeak: "As time dey pass, {b} dey come down small-small.",
  scatterHint: "Each dot na one record. Di line show di general direction.",
  insCorr: "<b>{a}</b> and <b>{b}</b> dey move together ({strength}, {r}). Check di correlation section below.",
  insCorrNeg: "When <b>{a}</b> go up, <b>{b}</b> dey come down ({strength}, {r}). Check di correlation section below.",
  helpTitle: "You need more analysis?",
  helpBody: "Scitylana analysts fit help you go deeper — forecast your sales, plan your stock, set better price, or build dashboard for your business.",
  helpBtn: "📧 Email Scitylana for more analysis",
  helpNote: "E go open your email app. Remember to attach your CSV file before you send.",
  mailSubject: "Data Wey Talk – I need more analysis",
  mailIntro: "Hello Scitylana,\n\nI don use Data Wey Talk and I need more analysis for my data.",
  mailSummary: "Wetin di tool show me:",
  mailAsk: "Wetin I wan know:\n\n\n(I don attach my CSV file.)",
  mailContact: "My details:",
});

Object.assign(I18N.en, {
  corrTitle: "What moves together (correlation)",
  corrLede: "We check whether your numbers rise and fall together. Values near +1 or −1 mean they move together strongly. Near 0 means no real link.",
  corrPick: "Tap any row to see the chart.",
  corrCaution: "⚠️ Remember: two things moving together doesn't mean one causes the other.",
  corrNone: "To check correlation, your file needs at least two number columns, or one number column plus a date.",
  corrTime: "Time",
  strStrong: "strong", strMedium: "medium", strWeak: "weak", strNone: "no real link",
  cPosStrong: "When {a} goes up, {b} goes up too — they move together strongly.",
  cPosMed: "When {a} goes up, {b} tends to go up a little.",
  cNegStrong: "When {a} goes up, {b} goes down — they move in opposite directions.",
  cNegMed: "When {a} goes up, {b} tends to go down a little.",
  cWeak: "{a} and {b} don't really move together.",
  cTimeUp: "Over time, {b} is going up.",
  cTimeDown: "Over time, {b} is going down.",
  cTimeFlat: "Over time, {b} isn't really changing.",
  cTimeUpWeak: "Over time, {b} is rising slightly.",
  cTimeDownWeak: "Over time, {b} is falling slightly.",
  scatterHint: "Each dot is one record. The line shows the general direction.",
  insCorr: "<b>{a}</b> and <b>{b}</b> move together ({strength}, {r}). See the correlation section below.",
  insCorrNeg: "When <b>{a}</b> goes up, <b>{b}</b> goes down ({strength}, {r}). See the correlation section below.",
  helpTitle: "Need more analysis?",
  helpBody: "Scitylana's analysts can help you go deeper — forecast your sales, plan your stock, set better prices, or build a dashboard for your business.",
  helpBtn: "📧 Email Scitylana for more analysis",
  helpNote: "This opens your email app. Remember to attach your CSV file before sending.",
  mailSubject: "Data Wey Talk – I need more analysis",
  mailIntro: "Hello Scitylana,\n\nI used Data Wey Talk and would like more analysis of my data.",
  mailSummary: "What the tool showed me:",
  mailAsk: "What I want to know:\n\n\n(My CSV file is attached.)",
  mailContact: "My details:",
});

const SCITYLANA_EMAIL = "scitylanaltd@gmail.com";

function pearson(xs, ys) {
  const n = xs.length;
  if (n < 5) return null;
  let mx = 0, my = 0;
  for (let i = 0; i < n; i++) { mx += xs[i]; my += ys[i]; }
  mx /= n; my /= n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - mx, dy = ys[i] - my;
    sxy += dx * dy; sxx += dx * dx; syy += dy * dy;
  }
  if (sxx === 0 || syy === 0) return null;
  return sxy / Math.sqrt(sxx * syy);
}

function strengthKey(r) {
  const a = Math.abs(r);
  return a >= 0.7 ? "strStrong" : a >= 0.4 ? "strMedium" : a >= 0.2 ? "strWeak" : "strNone";
}

function corrSentence(p) {
  const a = p.a.name, b = p.b.name, s = strengthKey(p.r);
  if (p.a.isTime) {
    if (s === "strNone") return t("cTimeFlat", { b });
    if (s === "strWeak") return t(p.r > 0 ? "cTimeUpWeak" : "cTimeDownWeak", { b });
    return t(p.r > 0 ? "cTimeUp" : "cTimeDown", { b });
  }
  if (s === "strNone" || s === "strWeak") return t("cWeak", { a, b });
  if (p.r > 0) return t(s === "strStrong" ? "cPosStrong" : "cPosMed", { a, b });
  return t(s === "strStrong" ? "cNegStrong" : "cNegMed", { a, b });
}

(function correlation() {
  let pairs = [], selected = 0, vars = [];

  function buildVars() {
    const { headers, rows, types, date } = state;
    const out = [];
    if (date >= 0) {
      out.push({ name: t("corrTime"), isTime: true, vals: rows.map((r) => { const d = parseDate(r[date]); return d ? d.getTime() / 864e5 : null; }) });
    }
    types.forEach((tp, i) => {
      if (tp === "number") out.push({ name: headers[i], col: i, vals: rows.map((r) => parseNum(r[i])) });
    });
    return out;
  }

  function compute() {
    vars = buildVars();
    const out = [];
    for (let i = 0; i < vars.length; i++) {
      for (let j = i + 1; j < vars.length; j++) {
        const xs = [], ys = [];
        vars[i].vals.forEach((x, k) => { const y = vars[j].vals[k]; if (x !== null && y !== null) { xs.push(x); ys.push(y); } });
        const r = pearson(xs, ys);
        if (r !== null) out.push({ a: vars[i], b: vars[j], r, xs, ys });
      }
    }
    return out.sort((p, q) => Math.abs(q.r) - Math.abs(p.r)).slice(0, 8);
  }

  function renderList() {
    const card = $("corrCard");
    if (!pairs.length) {
      card.hidden = false;
      $("corrList").innerHTML = `<p class="muted">${esc(t("corrNone"))}</p>`;
      $("scatterWrap").innerHTML = "";
      $("corrPick").hidden = true;
      return;
    }
    card.hidden = false;
    $("corrPick").hidden = false;
    $("corrList").innerHTML = pairs.map((p, i) => {
      const pct = Math.abs(p.r) * 50; // half-width bar from the centre
      const side = p.r >= 0 ? `left:50%;width:${pct}%` : `right:50%;width:${pct}%`;
      const sign = p.r >= 0 ? "+" : "−";
      return `<button type="button" class="corr-row${i === selected ? " on" : ""}" data-i="${i}" aria-pressed="${i === selected}">
        <span class="corr-names">${esc(p.a.name)} <span aria-hidden="true">↔</span> ${esc(p.b.name)}</span>
        <span class="corr-meter" aria-hidden="true"><span class="mid"></span><span class="fill ${p.r >= 0 ? "pos" : "neg"}" style="${side}"></span></span>
        <span class="corr-r"><bdi>${sign}${Math.abs(p.r).toFixed(2)}</bdi> · ${esc(t(strengthKey(p.r)))}</span>
        <span class="corr-say">${esc(corrSentence(p))}</span>
      </button>`;
    }).join("");
    drawScatter();
  }

  function fmtVar(v, isTime, money) {
    if (isTime) { const d = new Date(v * 864e5); return `${d.getDate()} ${MONTHS[d.getMonth()]}`; }
    return fmtShort(v, money);
  }

  function drawScatter() {
    const wrap = $("scatterWrap");
    const p = pairs[selected];
    if (!p) { wrap.innerHTML = ""; return; }
    const moneyA = !p.a.isTime && isMoneyCol(p.a.name, state.rows, p.a.col);
    const moneyB = isMoneyCol(p.b.name, state.rows, p.b.col);
    // keep it light: at most 1500 dots
    const step = Math.max(1, Math.ceil(p.xs.length / 1500));
    const pts = [];
    for (let i = 0; i < p.xs.length; i += step) pts.push([p.xs[i], p.ys[i]]);

    const W = Math.max(280, wrap.clientWidth || 600), H = Math.round(Math.min(320, Math.max(220, W * 0.55)));
    const pad = { t: 12, r: 14, b: 40, l: 56 };
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const ext = (arr) => { let lo = Math.min(...arr), hi = Math.max(...arr); if (lo === hi) { lo -= 1; hi += 1; } return [lo, hi]; };
    let [x0, x1] = ext(p.xs), [y0, y1] = ext(p.ys);
    const xt = p.a.isTime ? null : niceTicks(Math.min(0, x0) === 0 && x0 >= 0 ? 0 : x0, x1, 4);
    const yt = niceTicks(y0 >= 0 ? 0 : y0, y1, 4);
    if (xt) { x0 = xt[0]; x1 = xt[xt.length - 1]; }
    y0 = yt[0]; y1 = yt[yt.length - 1];
    const X = (v) => pad.l + ((v - x0) / (x1 - x0)) * iw;
    const Y = (v) => pad.t + ih - ((v - y0) / (y1 - y0)) * ih;

    let g = "";
    for (const v of yt) g += `<line class="gridline" x1="${pad.l}" x2="${W - pad.r}" y1="${Y(v)}" y2="${Y(v)}"/><text class="tick" x="${pad.l - 8}" y="${Y(v) + 4}" text-anchor="end">${esc(fmtShort(v, moneyB))}</text>`;
    const xticks = xt || [0, 1, 2, 3].map((k) => x0 + ((x1 - x0) * k) / 3);
    xticks.forEach((v, k) => {
      const anchor = k === 0 ? "start" : k === xticks.length - 1 ? "end" : "middle";
      g += `<text class="tick" x="${X(v)}" y="${H - 22}" text-anchor="${anchor}">${esc(fmtVar(v, p.a.isTime, moneyA))}</text>`;
    });
    g += `<text class="axis-label" x="${pad.l + iw / 2}" y="${H - 4}" text-anchor="middle">${esc(p.a.name)} →</text>`;
    g += `<text class="axis-label" x="12" y="${pad.t + ih / 2}" text-anchor="middle" transform="rotate(-90 12 ${pad.t + ih / 2})">${esc(p.b.name)} →</text>`;
    g += `<line class="baseline" x1="${pad.l}" x2="${W - pad.r}" y1="${pad.t + ih}" y2="${pad.t + ih}"/>`;

    // least-squares trend line
    const n = p.xs.length;
    const mx = p.xs.reduce((s, v) => s + v, 0) / n, my = p.ys.reduce((s, v) => s + v, 0) / n;
    let sxy = 0, sxx = 0;
    for (let i = 0; i < n; i++) { sxy += (p.xs[i] - mx) * (p.ys[i] - my); sxx += (p.xs[i] - mx) ** 2; }
    const slope = sxx ? sxy / sxx : 0, b0 = my - slope * mx;
    const clampY = (v) => Math.max(y0, Math.min(y1, v));

    const dots = pts.map(([x, y]) =>
      `<circle class="dot-s" cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="4"><title>${esc(p.a.name)}: ${esc(p.a.isTime ? fmtVar(x, true) : fmt(x, moneyA))} · ${esc(p.b.name)}: ${esc(fmt(y, moneyB))}</title></circle>`).join("");
    const trend = `<line class="trend ${p.r >= 0 ? "pos" : "neg"}" x1="${X(x0)}" y1="${Y(clampY(b0 + slope * x0))}" x2="${X(x1)}" y2="${Y(clampY(b0 + slope * x1))}"/>`;

    wrap.innerHTML = `<p class="scatter-title"><b>${esc(p.a.name)}</b> ↔ <b>${esc(p.b.name)}</b> · <bdi>r = ${p.r >= 0 ? "+" : "−"}${Math.abs(p.r).toFixed(2)}</bdi></p>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.a.name)} vs ${esc(p.b.name)}: ${esc(corrSentence(p))}">${g}<g class="dots">${dots}</g>${trend}</svg>
      <p class="muted small">${esc(t("scatterHint"))}</p>`;
  }

  $("corrList").addEventListener("click", (e) => {
    const b = e.target.closest(".corr-row");
    if (!b) return;
    selected = +b.dataset.i;
    renderList();
  });

  // ----- "Email Scitylana" button -----
  function renderHelp() {
    const s = state.summary;
    if (!s) return;
    const F = (n) => fmt(n, s.money);
    const lines = [
      `• ${s.file} — ${s.rows} rows`,
      `• ${s.numName}: total ${F(s.total)}, average ${F(s.avg)}`,
    ];
    if (s.top) lines.push(`• Top ${s.groupName}: ${s.top.name} (${F(s.top.value)}, ${fmtPct(s.top.pct)}%)`);
    if (s.trend && s.trend.change !== null) lines.push(`• ${s.trend.first} → ${s.trend.last}: ${s.trend.change >= 0 ? "+" : ""}${fmtPct(s.trend.change)}%`);
    const strongest = pairs.find((p) => Math.abs(p.r) >= 0.4 && !(p.a.isTime));
    if (strongest) lines.push(`• Correlation: ${strongest.a.name} ↔ ${strongest.b.name} r=${strongest.r.toFixed(2)}`);
    let prof = {};
    try { prof = JSON.parse(localStorage.getItem("dwt-profile") || "{}"); } catch (_) {}
    const contact = [prof.name && `Name: ${prof.name}`, prof.phone && `Phone/WhatsApp: ${prof.phone}`, prof.email && `Email: ${prof.email}`].filter(Boolean);
    const body = [t("mailIntro"), "", t("mailSummary"), ...lines, "", t("mailAsk")]
      .concat(contact.length ? ["", t("mailContact"), ...contact] : []).join("\n");
    $("helpBtn").href = `mailto:${SCITYLANA_EMAIL}?subject=${encodeURIComponent(t("mailSubject"))}&body=${encodeURIComponent(body)}`;
  }

  document.addEventListener("dwt:rendered", () => {
    pairs = compute();
    if (selected >= pairs.length) selected = 0;
    renderList();
    // one plain-language insight for the strongest real link (skip the obvious time trend)
    const best = pairs.find((p) => !p.a.isTime && Math.abs(p.r) >= 0.4);
    if (best) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="icon" aria-hidden="true">🔗</span><span>${t(best.r >= 0 ? "insCorr" : "insCorrNeg", {
        a: esc(best.a.name), b: esc(best.b.name), strength: esc(t(strengthKey(best.r))), r: "<bdi>" + (best.r >= 0 ? "+" : "−") + Math.abs(best.r).toFixed(2) + "</bdi>",
      })}</span>`;
      $("insights").appendChild(li);
    }
    renderHelp();
  });

  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (!$("results").hidden) drawScatter(); }, 150); });
})();
