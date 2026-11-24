/* Find Distributors: distributors post a product (photo, cost per case/carton, suggested selling price per unit).
   Buyers see what they would earn, WhatsApp the distributor, or test it in the Business Game (goal seek).
   Posts go to the Google Sheet "Distributors" tab and only show here after the owner types Yes in "Approved?".
   Anyone can browse; posting needs the free sign-up. Words live in lang/distributors-i18n.js. */
(function () {
  const box = $("distBox");
  if (!box) return;
  const endpoint = (window.DWT_CONFIG && window.DWT_CONFIG.surveyEndpoint) || "";
  const CACHE_KEY = "dwt-listings";
  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} },
  };

  let listings = ls.get(CACHE_KEY) || null;    // last list we saw, so the page fills straight away
  let status = listings ? "ok" : "loading";      // loading | ok | error
  let canPost = true;                             // false while the Sheet script is the old version
  let view = "list";                              // list | form | sent
  let q = "", country = "";
  const cases = {};                               // cases per month typed on each card
  let photo = "";                                 // shrunk photo as a data: URL
  let draft = {};

  const N = (v) => { const n = parseNum(String(v ?? "")); return n === null ? 0 : n; };
  function money(n, code) {
    const c = CUR_BY_CODE[code], abs = Math.abs(n);
    const s = abs.toLocaleString("en-NG", { maximumFractionDigits: abs < 100 && abs % 1 ? 2 : 0 });
    const body = !c ? `${s} ${code || ""}`.trim() : c.after ? `${s} ${c.sym}` : /[A-Za-z]$/.test(c.sym) ? `${c.sym} ${s}` : c.sym + s;
    return (n < 0 ? "−" : "") + body;
  }
  const signedUp = () => !(window.dwtSurveyDone && !window.dwtSurveyDone());
  const profile = () => ls.get("dwt-profile") || {};
  const earn = (x) => { const rev = x.units * x.price, p = rev - x.cost; return { rev, p, m: rev ? (p / rev) * 100 : 0 }; };
  const safePhoto = (u) => (/^https:\/\/(drive\.google\.com|lh3\.googleusercontent\.com)\//.test(u || "") ? u : "");
  const loc = () => (lang === "pcm" ? "en-NG" : lang === "ar" ? "ar-u-nu-latn" : lang === "ur" ? "ur-u-nu-latn" : lang);
  function niceDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    try { return d.toLocaleDateString(loc(), { day: "numeric", month: "short", year: "numeric" }); } catch (_) { return d.toDateString(); }
  }

  // ---------- load approved posts ----------
  async function load() {
    if (!endpoint) { status = listings ? "ok" : "error"; render(); return; }
    try {
      const res = await fetch(endpoint + (endpoint.includes("?") ? "&" : "?") + "listings=1");
      const data = await res.json();
      if (Array.isArray(data.listings)) {
        listings = data.listings.filter((x) => x && x.product && x.cost > 0 && x.price > 0);
        ls.set(CACHE_KEY, listings); canPost = true;
      } else { listings = listings || []; canPost = false; }   // old script: nothing to list yet, posting not ready
      status = "ok";
    } catch (_) { status = listings ? "ok" : "error"; }
    if (view === "list") renderList(); else render();
  }

  // ---------- list ----------
  function card(x) {
    const e = earn(x), n = cases[x.id] ?? (x.minOrder > 0 ? x.minOrder : 10);
    const img = safePhoto(x.photo);
    const wa = String(x.phone || "").replace(/\D/g, "");
    const waText = encodeURIComponent(t("dsWaMsg", { product: x.product }));
    return `<article class="ds-card" data-id="${esc(x.id)}">
      <div class="ds-img">${img ? `<img src="${esc(img)}" alt="${esc(x.product)}" loading="lazy" referrerpolicy="no-referrer">` : `<span aria-hidden="true">📦</span>`}</div>
      <div class="ds-body">
        <h3 dir="auto">${esc(x.product)}</h3>
        <p class="ds-who" dir="auto">${esc(x.business)}${x.city || x.country ? ` · ${esc([x.city, x.country].filter(Boolean).join(", "))}` : ""}</p>
        ${x.description ? `<p class="ds-desc" dir="auto">${esc(x.description)}</p>` : ""}
        <dl class="ds-nums">
          <div><dt>${esc(t("dsCost"))}</dt><dd>${esc(money(x.cost, x.currency))}</dd></div>
          <div><dt>${esc(t("dsSell"))}</dt><dd>${esc(t("dsUnits", { n: x.units.toLocaleString("en"), price: money(x.price, x.currency) }))} = ${esc(money(e.rev, x.currency))}</dd></div>
          <div class="ds-earn ${e.p >= 0 ? "up" : "down"}"><dt>${esc(t("dsEarn"))}</dt><dd>${esc(money(e.p, x.currency))} · ${esc(fmtPct(e.m))}%</dd></div>
        </dl>
        ${e.p < 0 ? `<p class="error small">${esc(t("dsLoss"))}</p>` : ""}
        ${x.minOrder > 0 ? `<p class="muted small">${esc(t("dsMin", { n: x.minOrder.toLocaleString("en") }))}</p>` : ""}
        <div class="ds-calc">
          <label class="field"><span>${esc(t("dsCases"))}</span><input inputmode="numeric" data-cases="${esc(x.id)}" value="${esc(n)}" autocomplete="off"></label>
          <p>${esc(t("dsMonthly"))}<b data-out="${esc(x.id)}">${esc(money(e.p * N(n), x.currency))}</b></p>
        </div>
        <div class="ds-acts">
          <button type="button" class="btn small-btn" data-play="${esc(x.id)}">${esc(t("dsPlay"))}</button>
          ${wa.length >= 7 ? `<a class="chip wa" href="https://wa.me/${wa}?text=${waText}" target="_blank" rel="noopener">${esc(t("dsWa"))}</a>` : ""}
        </div>
        <p class="muted small">${esc(t("dsPosted", { date: niceDate(x.date) }))}</p>
      </div>
    </article>`;
  }
  function filtered() {
    const s = q.trim().toLowerCase();
    return (listings || []).filter((x) => (!country || x.country === country) &&
      (!s || [x.product, x.business, x.description, x.city].join(" ").toLowerCase().includes(s)));
  }
  function listHTML() {
    if (status === "loading") return `<p class="muted ds-msg">${esc(t("dsLoading"))}</p>`;
    if (status === "error") return `<p class="ds-msg">${esc(t("dsOffline"))} <button type="button" class="btn ghost small-btn" data-act="retry">↻</button></p>`;
    if (!listings.length) return `<p class="ds-msg">${esc(t("dsNone"))}</p>`;
    const list = filtered();
    return list.length ? `<div class="ds-grid">${list.map(card).join("")}</div>` : `<p class="ds-msg">${esc(t("dsNoMatch"))}</p>`;
  }
  function sList() {
    const cs = [...new Set((listings || []).map((x) => x.country).filter(Boolean))].sort();
    return `<div class="ds-bar">
        <input type="search" id="dsQ" value="${esc(q)}" placeholder="${esc(t("dsSearch"))}" aria-label="${esc(t("dsSearch"))}">
        ${cs.length > 1 ? `<select id="dsC" aria-label="${esc(t("svCountry"))}"><option value="">${esc(t("dsAllC"))}</option>${cs.map((c) => `<option${c === country ? " selected" : ""}>${esc(c)}</option>`).join("")}</select>` : ""}
        <button type="button" class="btn gold" data-act="post">${esc(t("dsPost"))}</button>
      </div>
      <div id="dsList">${listHTML()}</div>
      <p class="ds-safety small">${esc(t("dsSafety"))}</p>`;
  }
  function renderList() { const l = $("dsList"); if (l && view === "list") l.innerHTML = listHTML(); else render(); }

  // ---------- post form ----------
  function sForm() {
    if (!signedUp()) return (window.dwtLockCard ? window.dwtLockCard() : "") + back();
    if (!canPost) return `<p class="ds-msg">${esc(t("dsSoon"))}</p>` + back();
    const p = profile(), d = draft;
    const val = (k, dflt = "") => esc(d[k] ?? dflt);
    const curDefault = (CURRENCIES.find((c) => c.c.includes(p.country)) || { code: "NGN" }).code;
    const cur = d.currency || curDefault;
    const ctry = d.country ?? p.country ?? "";
    const countries = COUNTRIES.map(([c]) => `<option${c === ctry ? " selected" : ""}>${esc(c)}</option>`).join("");
    const f = (k, label, attrs = "", wide = false) => `<label class="field${wide ? " wide" : ""}"><span>${esc(label)}</span><input data-f="${k}" value="${val(k, k === "contact_phone" ? p.phone || "" : "")}" ${attrs}></label>`;
    return `<form class="ds-form" id="dsForm" novalidate>
      <h3>${esc(t("dsFormT"))}</h3>
      <p class="muted small">${esc(t("dsFormX"))}</p>
      <div class="grid2">
        ${f("business", t("dsBiz"), 'maxlength="80" required')}
        ${f("contact_phone", t("dsContact"), 'inputmode="tel" maxlength="30" required')}
        <label class="field"><span>${esc(t("svCountry"))}</span><select data-f="country"><option value="">${esc(t("svPick"))}</option>${countries}</select></label>
        ${f("city", t("svCity"), 'maxlength="60"')}
        ${f("product", t("dsProduct"), 'maxlength="80" required', true)}
        <label class="field wide"><span>${esc(t("dsDesc"))}</span><textarea data-f="description" rows="2" maxlength="500">${val("description")}</textarea></label>
        ${f("units", t("dsUnitsL"), 'inputmode="numeric" placeholder="24"')}
        <label class="field"><span>${esc(t("gmCur"))}</span><select data-f="currency">${CURRENCIES.map((c) => `<option value="${c.code}"${c.code === cur ? " selected" : ""}>${c.code} · ${esc(c.sym)}</option>`).join("")}</select></label>
        ${f("cost", t("dsCostL"), 'inputmode="decimal" placeholder="6,000" required')}
        ${f("price", t("dsPriceL"), 'inputmode="decimal" placeholder="300" required')}
        ${f("min_order", t("dsMinL"), 'inputmode="numeric" placeholder="5"')}
        <label class="field"><span>${esc(t("dsPhoto"))}</span><input type="file" id="dsPhoto" accept="image/*"></label>
      </div>
      <div class="ds-preview-row">${photo ? `<img class="ds-thumb" src="${photo}" alt="">` : ""}<p class="muted small">${esc(t("dsPhotoX"))}</p></div>
      <p class="gm-live" id="dsPrev">${previewText()}</p>
      <input class="hp" data-f="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <label class="check consent"><input type="checkbox" id="dsOk"${d.ok ? " checked" : ""}><span>${esc(t("dsConsent"))}</span></label>
      <p class="error" id="dsErr" role="alert" hidden></p>
      <div class="gm-nav"><button type="button" class="btn ghost" data-act="list">${esc(t("dsCancel"))}</button>
        <button type="submit" class="btn" id="dsSend">${esc(t("dsSubmit"))}</button></div>
    </form>`;
  }
  const back = () => `<p class="ds-back"><button type="button" class="btn ghost small-btn" data-act="list">← ${esc(t("dsTitle"))}</button></p>`;
  function previewText() {
    const units = Math.max(1, Math.round(N(draft.units)) || 1), cost = N(draft.cost), price = N(draft.price);
    if (!(cost > 0 && price > 0)) return "";
    const e = earn({ units, cost, price });
    return esc(t("dsPreview", { earn: money(e.p, draft.currency || (CURRENCIES.find((c) => c.c.includes(profile().country)) || { code: "NGN" }).code), m: fmtPct(e.m) }));
  }
  // Shrink the photo on the phone (max 900px, JPEG) so it sends fast and fits the Sheet script limit.
  function shrink(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file), img = new Image();
      img.onload = () => {
        const k = Math.min(1, 900 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        const ctx = c.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        let q = 0.8, out = c.toDataURL("image/jpeg", q);
        while (out.length > 1200000 && q > 0.35) { q -= 0.15; out = c.toDataURL("image/jpeg", q); }
        resolve(out);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("bad image")); };
      img.src = url;
    });
  }
  async function submit() {
    const err = $("dsErr"), btn = $("dsSend");
    const d = draft, units = Math.max(1, Math.round(N(d.units)) || 1), cost = N(d.cost), price = N(d.price);
    const okFields = (d.business || "").trim() && (d.product || "").trim() && (d.contact_phone ?? profile().phone ?? "").replace(/\D/g, "").length >= 7 && cost > 0 && price > 0 && photo;
    if (!okFields || !$("dsOk").checked) { err.textContent = t(okFields ? "svErrConsent" : "dsErr"); err.hidden = false; return; }
    const p = profile();
    const payload = {
      type: "listing", website: d.website || "", name: p.name || "", email: p.email || "", phone: p.phone || "", consent: true,
      business: d.business.trim(), contact_phone: (d.contact_phone ?? p.phone ?? "").trim(), country: d.country ?? p.country ?? "", city: (d.city || "").trim(),
      product: d.product.trim(), description: (d.description || "").trim(), units, cost, price,
      currency: d.currency || (CURRENCIES.find((c) => c.c.includes(p.country)) || { code: "NGN" }).code,
      min_order: Math.round(N(d.min_order)) || "", photo, language: lang, submitted_at: new Date().toISOString(),
    };
    btn.disabled = true; btn.textContent = t("dsSending"); err.hidden = true;
    const opts = { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) };
    let ok = false;
    try {
      const res = await fetch(endpoint, opts);
      const r = await res.json();
      ok = !!(r && r.ok && r.listing);
    } catch (_) {
      try { await fetch(endpoint, { ...opts, mode: "no-cors" }); ok = true; } catch (_) { ok = false; }   // sent, reply unreadable
    }
    if (!ok) { btn.disabled = false; btn.textContent = t("dsSubmit"); err.textContent = t("dsFail"); err.hidden = false; return; }
    draft = {}; photo = ""; view = "sent"; render();
  }

  // ---------- render + events ----------
  function render() {
    box.innerHTML = view === "form" ? sForm()
      : view === "sent" ? `<p class="qz-ok ds-msg">✅ ${esc(t("dsThanks"))}</p>` + back()
      : sList();
  }
  function playIt(x) {
    if (!window.dwtGameLoad) return;
    if (window.dwtGameHasOwn && window.dwtGameHasOwn() && !confirm(t("dsReplace"))) return;
    window.dwtGameLoad({ product: x.product, business: x.business, cur: x.currency, cases: Math.max(1, N(cases[x.id] ?? (x.minOrder > 0 ? x.minOrder : 10))), units: x.units, cost: x.cost, price: x.price });
  }

  box.addEventListener("input", (e) => {
    const el = e.target;
    if (el.id === "dsQ") { q = el.value; const l = $("dsList"); if (l) l.innerHTML = listHTML(); return; }
    if (el.dataset.cases) {
      const x = listings.find((y) => y.id === el.dataset.cases); if (!x) return;
      cases[x.id] = el.value;
      box.querySelector(`[data-out="${CSS.escape(x.id)}"]`).textContent = money(earn(x).p * N(el.value), x.currency);
      return;
    }
    if (el.dataset.f) { draft[el.dataset.f] = el.value; const pv = $("dsPrev"); if (pv) pv.innerHTML = previewText(); }
    if (el.id === "dsOk") draft.ok = el.checked;
  });
  box.addEventListener("change", async (e) => {
    const el = e.target;
    if (el.id === "dsC") { country = el.value; $("dsList").innerHTML = listHTML(); return; }
    if (el.tagName === "SELECT" && el.dataset.f) { draft[el.dataset.f] = el.value; const pv = $("dsPrev"); if (pv) pv.innerHTML = previewText(); return; }
    if (el.id === "dsPhoto" && el.files[0]) {
      try { photo = await shrink(el.files[0]); } catch (_) { photo = ""; }
      const row = box.querySelector(".ds-preview-row");
      if (row) row.innerHTML = (photo ? `<img class="ds-thumb" src="${photo}" alt="">` : "") + `<p class="muted small">${esc(t("dsPhotoX"))}</p>`;
    }
  });
  box.addEventListener("submit", (e) => { e.preventDefault(); submit(); });
  box.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.play) { const x = listings.find((y) => y.id === b.dataset.play); if (x) playIt(x); return; }
    switch (b.dataset.act) {
      case "post": view = "form"; render(); box.closest("section").scrollIntoView({ block: "start" }); return;
      case "list": view = "list"; render(); return;
      case "retry": status = "loading"; render(); load(); return;
    }
  });

  document.addEventListener("dwt:lang", render);
  document.addEventListener("dwt:unlocked", () => { if (view === "form") render(); });
  render();
  load();
})();
