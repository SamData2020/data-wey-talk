/* Second way into the analysis tool: type (or paste) sales into a ready-made table,
   then analyse it exactly like an uploaded CSV. The draft is saved on the device ("dwt-entry"). */

Object.assign(I18N.pcm, {
  tmUpload: "📁 Upload file", tmType: "✍️ Type my data",
  enTitle: "Type your sales for dis table",
  enHint: "One line for each sale. Put quantity and price — we go calculate di amount. Or just put di amount.",
  enPasteTip: "Tip: you fit copy lines from Excel, Google Sheets or WhatsApp (Date, Item, Quantity, Price, Amount) and paste am for any box.",
  enDate: "Date", enItem: "Wetin you sell", enQty: "Quantity", enPrice: "Price for one", enAmount: "Amount",
  enAddRow: "+ Add line", enAdd5: "+ 5 lines", enClear: "Clear table", enClearAsk: "You wan clear all di lines?", enRemove: "Remove line",
  enAnalyse: "📈 Analyse my data", enCsv: "⬇️ Download as CSV",
  enRows: "{n} lines · Total {total}", enErr: "Abeg fill at least 2 lines wey get amount.",
  enFileName: "My sales (typed)", enDraft: "🔒 Your table dey save for dis phone only, until you clear am.",
});

Object.assign(I18N.en, {
  tmUpload: "📁 Upload a file", tmType: "✍️ Type my data",
  enTitle: "Type your sales into this table",
  enHint: "One line per sale. Enter quantity and price and we'll work out the amount — or just enter the amount.",
  enPasteTip: "Tip: copy rows from Excel, Google Sheets or WhatsApp (Date, Item, Quantity, Price, Amount) and paste them into any box.",
  enDate: "Date", enItem: "Item sold", enQty: "Quantity", enPrice: "Price each", enAmount: "Amount",
  enAddRow: "+ Add line", enAdd5: "+ 5 lines", enClear: "Clear table", enClearAsk: "Clear all the lines?", enRemove: "Remove line",
  enAnalyse: "📈 Analyse my data", enCsv: "⬇️ Download as CSV",
  enRows: "{n} lines · Total {total}", enErr: "Please fill in at least 2 lines with an amount.",
  enFileName: "My sales (typed)", enDraft: "🔒 Your table is saved on this device only, until you clear it.",
});

(function typedData() {
  const KEY = "dwt-entry", MODE = "dwt-tool-mode";
  const box = $("entryBox");
  const COLS = ["d", "item", "qty", "price", "amt"];
  const pad = (n) => String(n).padStart(2, "0");
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const blankRow = (d) => ({ d: d || today(), item: "", qty: "", price: "", amt: "", man: false });
  const N = (v) => { const n = parseNum(v); return n === null ? 0 : n; };
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} },
  };
  let rows;
  try { rows = JSON.parse(store.get(KEY) || "null"); } catch (_) { rows = null; }
  if (!Array.isArray(rows) || !rows.length) rows = Array.from({ length: 5 }, () => blankRow());
  const save = () => store.set(KEY, JSON.stringify(rows));

  function currency() {
    let country = "";
    try { country = JSON.parse(store.get("dwt-profile") || "{}").country || ""; } catch (_) {}
    const c = CURRENCIES.find((x) => x.c.includes(country));
    return c || CUR_BY_CODE.NGN;
  }
  function money(n) {
    const c = currency(), s = Math.abs(n).toLocaleString("en-NG", { maximumFractionDigits: 2 });
    return (n < 0 ? "−" : "") + (c.after ? `${s} ${c.sym}` : /[A-Za-z]$/.test(c.sym) ? `${c.sym} ${s}` : c.sym + s);
  }
  const amountOf = (r) => (r.man ? N(r.amt) : N(r.qty) * N(r.price) || N(r.amt));
  const filled = () => rows.filter((r) => amountOf(r) > 0);

  // ---------- render ----------
  function rowHTML(r, i) {
    const auto = !r.man && N(r.qty) && N(r.price) ? String(N(r.qty) * N(r.price)) : "";
    const cell = (c, html) => `<label class="en-cell en-${c}"><span class="en-lab">${esc(t({ d: "enDate", item: "enItem", qty: "enQty", price: "enPrice", amt: "enAmount" }[c]))}</span>${html}</label>`;
    const num = (c, v, ph = "") => `<input data-r="${i}" data-c="${c}" value="${esc(v)}" inputmode="decimal" autocomplete="off" placeholder="${esc(ph)}">`;
    return `<div class="en-row">
      ${cell("d", `<input type="date" data-r="${i}" data-c="d" value="${esc(r.d)}">`)}
      ${cell("item", `<input data-r="${i}" data-c="item" value="${esc(r.item)}" maxlength="60" autocomplete="off">`)}
      ${cell("qty", num("qty", r.qty))}
      ${cell("price", num("price", r.price))}
      ${cell("amt", num("amt", r.man ? r.amt : auto || r.amt, auto))}
      <button type="button" class="gm-x" data-del="${i}" aria-label="${esc(t("enRemove"))}">×</button>
    </div>`;
  }
  function summary() {
    const f = filled();
    return t("enRows", { n: f.length, total: money(f.reduce((s, r) => s + amountOf(r), 0)) });
  }
  function render() {
    box.innerHTML = `<div class="entry">
      <h3>${esc(t("enTitle"))}</h3>
      <p class="muted small">${esc(t("enHint"))}</p>
      <div class="en-head" aria-hidden="true">${COLS.map((c) => `<span>${esc(t({ d: "enDate", item: "enItem", qty: "enQty", price: "enPrice", amt: "enAmount" }[c]))}</span>`).join("")}<span></span></div>
      <div class="en-rows">${rows.map(rowHTML).join("")}</div>
      <div class="en-tools">
        <button type="button" class="btn ghost small-btn" data-act="add1">${esc(t("enAddRow"))}</button>
        <button type="button" class="btn ghost small-btn" data-act="add5">${esc(t("enAdd5"))}</button>
        <button type="button" class="btn ghost small-btn" data-act="clear">${esc(t("enClear"))}</button>
        <span class="en-sum" id="enSum">${esc(summary())}</span>
      </div>
      <p class="muted small">${esc(t("enPasteTip"))}</p>
      <p class="error" id="enErr" role="alert" hidden></p>
      <div class="gm-actions">
        <button type="button" class="btn" data-act="analyse">${esc(t("enAnalyse"))}</button>
        <button type="button" class="btn ghost" data-act="csv">${esc(t("enCsv"))}</button>
      </div>
      <p class="muted small">${esc(t("enDraft"))}</p>
    </div>`;
  }

  // ---------- CSV ----------
  const q = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  function buildCSV() {
    const f = filled();
    const hasQty = f.some((r) => N(r.qty)), hasPrice = f.some((r) => N(r.price)), hasDate = f.some((r) => r.d);
    const head = [], cols = [];
    if (hasDate) { head.push(t("enDate")); cols.push((r) => r.d || ""); }
    head.push(t("enItem")); cols.push((r) => r.item.trim() || "—");
    if (hasQty) { head.push(t("enQty")); cols.push((r) => (N(r.qty) || "")); }
    if (hasPrice) { head.push(t("enPrice")); cols.push((r) => (N(r.price) || "")); }
    const amtIdx = head.length;
    head.push(`${t("enAmount")} (${currency().code})`); cols.push((r) => amountOf(r));
    const lines = [head.map(q).join(",")].concat(f.map((r) => cols.map((fn) => q(fn(r))).join(",")));
    return { csv: lines.join("\n"), amtIdx, count: f.length };
  }

  // ---------- paste from Excel / Sheets / WhatsApp ----------
  function toISO(v) {
    const d = parseDate(v);
    return d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : "";
  }
  box.addEventListener("paste", (e) => {
    const el = e.target;
    if (!el.dataset || el.dataset.r === undefined) return;
    const text = (e.clipboardData || window.clipboardData).getData("text");
    if (!/[\t\n]/.test(text.trim())) return;                 // a single value: let the browser paste it
    e.preventDefault();
    const sep = text.includes("\t") ? "\t" : ";";
    let lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim()).map((l) => l.split(sep).map((c) => c.trim()));
    if (lines.length && !lines[0].some((c) => /\d/.test(c))) lines = lines.slice(1);   // skip a header row
    let r = +el.dataset.r;
    const c0 = COLS.indexOf(el.dataset.c);
    lines.forEach((cells) => {
      if (!rows[r]) rows.push(blankRow(""));
      cells.forEach((v, k) => {
        const c = COLS[c0 + k];
        if (!c) return;
        if (c === "d") rows[r].d = toISO(v) || rows[r].d;
        else if (c === "amt") { rows[r].amt = v; rows[r].man = v !== ""; }
        else rows[r][c] = v;
      });
      r++;
    });
    save(); render();
  });

  // ---------- events ----------
  box.addEventListener("input", (e) => {
    const el = e.target, i = el.dataset.r, c = el.dataset.c;
    if (i === undefined) return;
    const r = rows[+i];
    if (c === "amt") { r.amt = el.value; r.man = el.value !== ""; }
    else r[c] = el.value;
    if ((c === "qty" || c === "price") && !r.man) {
      const a = box.querySelector(`[data-r="${i}"][data-c="amt"]`), v = N(r.qty) * N(r.price);
      if (a) { a.value = v ? String(v) : ""; a.placeholder = a.value; }
    }
    save();
    const s = $("enSum"); if (s) s.textContent = summary();
  });
  box.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.del !== undefined) { rows.splice(+b.dataset.del, 1); if (!rows.length) rows.push(blankRow()); save(); render(); return; }
    const lastDate = () => (rows.length ? rows[rows.length - 1].d : today());
    switch (b.dataset.act) {
      case "add1": rows.push(blankRow(lastDate())); save(); render(); box.querySelectorAll('[data-c="item"]')[rows.length - 1]?.focus(); return;
      case "add5": for (let k = 0; k < 5; k++) rows.push(blankRow(lastDate())); save(); render(); return;
      case "clear": if (confirm(t("enClearAsk"))) { rows = Array.from({ length: 5 }, () => blankRow()); save(); render(); } return;
      case "analyse": {
        const { csv, amtIdx, count } = buildCSV();
        if (count < 2) { const er = $("enErr"); er.textContent = t("enErr"); er.hidden = false; return; }
        load(`${t("enFileName")}.csv`, csv, { num: amtIdx });
        setTimeout(() => $("results")?.scrollIntoView({ block: "start" }), 50);
        return;
      }
      case "csv": {
        const { csv, count } = buildCSV();
        if (!count) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
        a.download = `my-sales-${today()}.csv`;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 3000);
      }
    }
  });

  // ---------- upload / type switch ----------
  function setMode(m) {
    document.querySelectorAll(".tool-mode [data-mode]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.mode === m)));
    $("modeUpload").hidden = m !== "upload";
    $("modeType").hidden = m !== "type";
    store.set(MODE, m);
  }
  document.querySelectorAll(".tool-mode [data-mode]").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));
  setMode(store.get(MODE) === "type" ? "type" : "upload");
  document.addEventListener("dwt:lang", render);
  render();
})();
