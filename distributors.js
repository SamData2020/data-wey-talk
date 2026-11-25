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
  let canPost = null;                             // null = still checking; false while the Sheet script is the old version
  let view = "list";                              // list | form | sent | mine | saved
  let editing = null;                             // the post being edited (from "My posts"), or null for a new post
  let mine = null, mineStatus = "";               // the signed-up person's own posts: loading | ok | error
  const KEYS = "dwt-edit-keys";                   // { postId: edit code } for posts made on this device
  let q = "", country = "", role = "";
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
    if (!endpoint) { status = listings ? "ok" : "error"; canPost = false; render(); return; }
    try {
      const res = await fetch(endpoint + (endpoint.includes("?") ? "&" : "?") + "listings=1");
      const data = await res.json();
      if (Array.isArray(data.listings)) {
        listings = data.listings.filter((x) => x && x.product && x.cost > 0 && (x.price > 0 || x.role === "buyer"));
        ls.set(CACHE_KEY, listings); canPost = true;
      } else { listings = listings || []; canPost = false; }   // old script: nothing to list yet, posting not ready
      status = "ok";
    } catch (_) { status = listings ? "ok" : "error"; if (canPost === null) canPost = true; }   // offline: let them fill it in
    if (view === "list") renderList(); else if (!$("dsForm")) render();   // never wipe a form someone is filling in
    showLinked();
  }

  // ---------- list ----------
  function card(x) {
    const buyer = x.role === "buyer", e = earn(x), n = cases[x.id] ?? (x.minOrder > 0 ? x.minOrder : 10);
    const img = safePhoto(x.photo);
    const wa = String(x.phone || "").replace(/\D/g, "");
    const waText = encodeURIComponent(t(buyer ? "dsWaMsgBuy" : x.role === "importer" ? "dsWaMsgImp" : "dsWaMsg", { product: x.product }));
    const link = SITE_URL + "#p=" + encodeURIComponent(x.id);
    const shareText = buyer ? t("dsShareWant", { product: x.product, url: link })
      : t("dsShareTxt", { product: x.product, cost: money(x.cost, x.currency), earn: money(e.p, x.currency), url: link });
    const badgeKey = buyer ? "dsBadgeBuy" : x.role === "importer" ? "dsBadgeImp" : "dsBadgeDist";
    const nums = buyer
      ? `<dl class="ds-nums"><div><dt>${esc(t("dsTarget"))}</dt><dd>${esc(money(x.cost, x.currency))}</dd></div></dl>
         ${x.minOrder > 0 ? `<p class="muted small">${esc(t("dsWantQty", { n: x.minOrder.toLocaleString("en") }))}</p>` : ""}`
      : `<dl class="ds-nums">
          <div><dt>${esc(t("dsCost"))}</dt><dd>${esc(money(x.cost, x.currency))}</dd></div>
          <div><dt>${esc(t("dsSell"))}</dt><dd>${esc(t("dsUnits", { n: x.units.toLocaleString("en"), price: money(x.price, x.currency) }))} = ${esc(money(e.rev, x.currency))}</dd></div>
          <div class="ds-earn ${e.p >= 0 ? "up" : "down"}"><dt>${esc(t("dsEarn"))}</dt><dd>${esc(money(e.p, x.currency))} · ${esc(fmtPct(e.m))}%</dd></div>
        </dl>
        ${e.p < 0 ? `<p class="error small">${esc(t("dsLoss"))}</p>` : ""}
        ${x.minOrder > 0 ? `<p class="muted small">${esc(t("dsMin", { n: x.minOrder.toLocaleString("en") }))}</p>` : ""}
        <div class="ds-calc">
          <label class="field"><span>${esc(t("dsCases"))}</span><input inputmode="numeric" data-cases="${esc(x.id)}" value="${esc(n)}" autocomplete="off"></label>
          <p>${esc(t("dsMonthly"))}<b data-out="${esc(x.id)}">${esc(money(e.p * N(n), x.currency))}</b></p>
        </div>`;
    return `<article class="ds-card${buyer ? " ds-want" : ""}${x.id === linkedId ? " ds-hl" : ""}" data-id="${esc(x.id)}">
      <div class="ds-img">${img ? `<img src="${esc(img)}" alt="${esc(x.product)}" loading="lazy" referrerpolicy="no-referrer">` : `<span aria-hidden="true">${buyer ? "🛒" : "📦"}</span>`}</div>
      <div class="ds-body">
        <p class="ds-tags"><span class="ds-badge ${buyer ? "buy" : x.role === "importer" ? "imp" : ""}">${esc(t(badgeKey))}</span>
          ${x.verified ? `<span class="ds-ver">${esc(t("dsVerified"))}</span>` : ""}</p>
        <h3 dir="auto">${esc(x.product)}</h3>
        <p class="ds-who" dir="auto">${esc(x.business)}${x.city || x.country ? ` · ${esc([x.city, x.country].filter(Boolean).join(", "))}` : ""}</p>
        ${x.description ? `<p class="ds-desc" dir="auto">${esc(x.description)}</p>` : ""}
        ${nums}
        <div class="ds-acts">
          ${buyer ? "" : `<button type="button" class="btn small-btn" data-play="${esc(x.id)}">${esc(t("dsPlay"))}</button>`}
          ${wa.length >= 7 ? `<a class="chip wa" href="https://wa.me/${wa}?text=${waText}" target="_blank" rel="noopener" data-track="contact">${esc(t(buyer ? "dsSupply" : "dsWa"))}</a>` : ""}
          <a class="chip" href="${esc(waShareURL(shareText))}" target="_blank" rel="noopener" data-track="share-product">${esc(t("dsShare"))}</a>
          <button type="button" class="chip ds-rep" data-report="${esc(x.id)}">${esc(t("dsReport"))}</button>
        </div>
        <div class="ds-report" data-rbox="${esc(x.id)}" hidden></div>
        <p class="muted small">${esc(t("dsPosted", { date: niceDate(x.date) }))}</p>
      </div>
    </article>`;
  }
  function filtered() {
    const s = q.trim().toLowerCase();
    return (listings || []).filter((x) => (!country || x.country === country) && (!role || (x.role || "distributor") === role) &&
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
        ${(listings || []).length ? `<select id="dsR" aria-label="${esc(t("dsRoleQ"))}"><option value="">${esc(t("dsAllRoles"))}</option>
          <option value="importer"${role === "importer" ? " selected" : ""}>${esc(t("dsFImp"))}</option>
          <option value="distributor"${role === "distributor" ? " selected" : ""}>${esc(t("dsFDist"))}</option>
          <option value="buyer"${role === "buyer" ? " selected" : ""}>${esc(t("dsFBuy"))}</option></select>` : ""}
        <button type="button" class="btn gold" data-act="post">${esc(t("dsPost"))}</button>
        <button type="button" class="btn ghost" data-act="mine">${esc(t("dsMine"))}</button>
      </div>
      <div id="dsList">${listHTML()}</div>
      <p class="ds-safety small">${esc(t("dsSafety"))}</p>`;
  }
  function renderList() { const l = $("dsList"); if (l && view === "list") l.innerHTML = listHTML(); else render(); }

  // A shared link (…/#p=ID) opens Find Distributors on that one post.
  let linkedDone = "", linkedId = "";
  function showLinked() {
    const m = location.hash.match(/^#p=([\w-]+)/);
    if (!m || linkedDone === location.hash || !listings || !listings.length) return;
    linkedDone = location.hash; linkedId = m[1];
    q = ""; country = ""; role = ""; view = "list"; editing = null; render();
    setTimeout(() => {   // after the page has finished drawing
      const el = box.querySelector(`[data-id="${CSS.escape(linkedId)}"]`);
      (el || box.closest("section")).scrollIntoView({ block: "start", behavior: "instant" });
    }, 300);
  }
  window.addEventListener("hashchange", showLinked);

  // ---------- Report this post ----------
  function reportBox(id) {
    if (!signedUp()) return `<p class="small">${esc(t("dsReportLogin"))} <a class="btn small-btn" href="#start">${esc(t("lkBtn"))}</a></p>`;
    return `<label class="field"><span>${esc(t("dsReportQ"))}</span><select data-rr="${esc(id)}">
        ${["scam", "price", "photo", "other"].map((r) => `<option value="${r}">${esc(t("dsR_" + r))}</option>`).join("")}</select></label>
      <label class="field"><span>${esc(t("dsReportNote"))}</span><textarea data-rn="${esc(id)}" rows="2" maxlength="500"></textarea></label>
      <p class="error small" data-re="${esc(id)}" hidden></p>
      <div class="ds-acts"><button type="button" class="btn small-btn" data-rsend="${esc(id)}">${esc(t("dsReportSend"))}</button>
        <button type="button" class="btn ghost small-btn" data-report="${esc(id)}">${esc(t("dsCancel"))}</button></div>`;
  }
  async function sendReport(id, btn) {
    const sel = box.querySelector(`[data-rr="${CSS.escape(id)}"]`), note = box.querySelector(`[data-rn="${CSS.escape(id)}"]`);
    const panel = box.querySelector(`[data-rbox="${CSS.escape(id)}"]`), err = box.querySelector(`[data-re="${CSS.escape(id)}"]`);
    btn.disabled = true;
    try {
      const r = await postJSON({ type: "report", id, reason: sel.value, note: note.value.trim(), name: profile().name || "", ...who() });
      if (!r || !r.ok) throw new Error("not ok");
      panel.innerHTML = `<p class="qz-ok small">✅ ${esc(t("dsReported"))}</p>`;
      window.dwtTrack("report");
    } catch (_) { btn.disabled = false; err.textContent = t("dsFail"); err.hidden = false; }
  }

  // ---------- post form ----------
  function sForm() {
    if (!signedUp()) return (window.dwtLockCard ? window.dwtLockCard() : "") + back();
    if (canPost === null && !editing) return `<p class="muted ds-msg">${esc(t("dsLoading"))}</p>` + back();
    if (!canPost && !editing) return `<p class="ds-msg">${esc(t("dsSoon"))}</p>` + back();
    const p = profile(), d = draft, buyer = d.role === "buyer";
    const val = (k, dflt = "") => esc(d[k] ?? dflt);
    const curDefault = (CURRENCIES.find((c) => c.c.includes(p.country)) || { code: "NGN" }).code;
    const cur = d.currency || curDefault;
    const ctry = d.country ?? p.country ?? "";
    const countries = COUNTRIES.map(([c]) => `<option${c === ctry ? " selected" : ""}>${esc(c)}</option>`).join("");
    const f = (k, label, attrs = "", wide = false) => `<label class="field${wide ? " wide" : ""}"><span>${esc(label)}</span><input data-f="${k}" value="${val(k, k === "contact_phone" ? p.phone || "" : "")}" ${attrs}></label>`;
    return `<form class="ds-form" id="dsForm" novalidate>
      <h3>${esc(t(editing ? "dsEditT" : "dsFormT"))}</h3>
      <p class="muted small">${esc(editing ? editing.product : t("dsFormX"))}</p>
      <fieldset class="ds-role"><legend>${esc(t("dsRoleQ"))}</legend>
        ${[["importer", "dsRoleImp"], ["distributor", "dsRoleDist"], ["buyer", "dsRoleBuy"]].map(([v, k]) =>
          `<label class="check"><input type="radio" name="dsRole" value="${v}"${d.role === v ? " checked" : ""}><span>${esc(t(k))}</span></label>`).join("")}
      </fieldset>
      <div class="grid2">
        ${f("business", t("gmName"), 'maxlength="80" required')}
        ${f("contact_phone", t("dsContact"), 'inputmode="tel" maxlength="30" required')}
        <label class="field"><span>${esc(t("svCountry"))}</span><select data-f="country"><option value="">${esc(t("svPick"))}</option>${countries}</select></label>
        ${f("city", t("svCity"), 'maxlength="60"')}
        ${f("product", t("dsProduct"), 'maxlength="80" required', true)}
        <label class="field wide"><span>${esc(t("dsDesc"))}</span><textarea data-f="description" rows="2" maxlength="500">${val("description")}</textarea></label>
        ${buyer ? "" : f("units", t("dsUnitsL"), 'inputmode="numeric" placeholder="24"')}
        <label class="field"><span>${esc(t("gmCur"))}</span><select data-f="currency">${CURRENCIES.map((c) => `<option value="${c.code}"${c.code === cur ? " selected" : ""}>${c.code} · ${esc(c.sym)}</option>`).join("")}</select></label>
        ${f("cost", t(buyer ? "dsTargetL" : "dsCostL"), 'inputmode="decimal" placeholder="6,000" required')}
        ${buyer ? "" : f("price", t("dsPriceL"), 'inputmode="decimal" placeholder="300" required')}
        ${f("min_order", t(buyer ? "dsQtyL" : "dsMinL"), 'inputmode="numeric" placeholder="5"')}
        <label class="field"><span>${esc(t("dsPhoto"))}</span><input type="file" id="dsPhoto" accept="image/*"></label>
      </div>
      <div class="ds-preview-row">${thumbHTML()}</div>
      ${editing && editing.needsKey && !(ls.get(KEYS) || {})[editing.id] ? `<label class="field ds-key"><span>${esc(t("dsKey"))}</span><input data-f="key" value="${val("key")}" maxlength="12" autocomplete="off" autocapitalize="characters"></label>` : ""}
      <p class="gm-live" id="dsPrev">${previewText()}</p>
      <input class="hp" data-f="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <label class="check consent"><input type="checkbox" id="dsOk"${d.ok ? " checked" : ""}><span>${esc(t("dsConsent"))}</span></label>
      <p class="error" id="dsErr" role="alert" hidden></p>
      <div class="gm-nav"><button type="button" class="btn ghost" data-act="list">${esc(t("dsCancel"))}</button>
        <button type="submit" class="btn" id="dsSend">${esc(t(editing ? "dsSave" : "dsSubmit"))}</button></div>
    </form>`;
  }
  function thumbHTML() {
    const src = photo || (editing ? safePhoto(editing.photo) : "");
    return (src ? `<img class="ds-thumb" src="${esc(src)}" alt="" referrerpolicy="no-referrer">` : "") +
      `<p class="muted small">${esc(t(editing ? "dsPhotoKeep" : "dsPhotoX"))}</p>`;
  }
  const back = () => `<p class="ds-back"><button type="button" class="btn ghost small-btn" data-act="list">← ${esc(t("dsTitle"))}</button></p>`;
  function previewText() {
    const units = Math.max(1, Math.round(N(draft.units)) || 1), cost = N(draft.cost), price = N(draft.price);
    if (!(cost > 0 && price > 0) || draft.role === "buyer") return "";
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
    const okFields = d.role && (d.business || "").trim() && (d.product || "").trim() && (d.contact_phone ?? profile().phone ?? "").replace(/\D/g, "").length >= 7 && cost > 0 && (price > 0 || d.role === "buyer") && (photo || editing || d.role === "buyer");
    if (!okFields || !$("dsOk").checked) { err.textContent = t(!d.role ? "dsErrRole" : okFields ? "svErrConsent" : "dsErr"); err.hidden = false; return; }
    const p = profile();
    const payload = {
      type: editing ? "editpost" : "listing", id: editing ? editing.id : undefined,
      key: editing ? ((ls.get(KEYS) || {})[editing.id] || String(d.key || "").trim().toUpperCase()) : undefined, role: d.role, website: d.website || "", name: p.name || "", email: p.email || "", phone: p.phone || "", consent: true,
      business: d.business.trim(), contact_phone: (d.contact_phone ?? p.phone ?? "").trim(), country: d.country ?? p.country ?? "", city: (d.city || "").trim(),
      product: d.product.trim(), description: (d.description || "").trim(), units, cost, price,
      currency: d.currency || (CURRENCIES.find((c) => c.c.includes(p.country)) || { code: "NGN" }).code,
      min_order: Math.round(N(d.min_order)) || "", photo, language: lang, submitted_at: new Date().toISOString(),
    };
    btn.disabled = true; btn.textContent = t("dsSending"); err.hidden = true;
    const opts = { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) };
    let ok = false, r = null;
    try {
      const res = await fetch(endpoint, opts);
      r = await res.json();
      ok = !!(r && r.ok && r.listing);
    } catch (_) {
      if (!editing) { try { await fetch(endpoint, { ...opts, mode: "no-cors" }); ok = true; } catch (_) { ok = false; } }   // sent, reply unreadable
    }
    if (!ok) {
      btn.disabled = false; btn.textContent = t(editing ? "dsSave" : "dsSubmit");
      err.textContent = t(r && r.error === "bad key" ? "dsKeyErr" : r && r.error ? "dsEditFail" : "dsFail"); err.hidden = false; return;
    }
    if (r && r.id && r.key) { const k = ls.get(KEYS) || {}; k[r.id] = r.key; ls.set(KEYS, k); }   // remember the edit code on this device
    if (editing && d.key) { const k = ls.get(KEYS) || {}; k[editing.id] = String(d.key).trim().toUpperCase(); ls.set(KEYS, k); }
    const wasEdit = !!editing;
    window.dwtTrack(wasEdit ? "post-edit" : "post-" + (d.role || "new"));
    draft = {}; photo = ""; editing = null; view = wasEdit ? "saved" : "sent"; render();
    if (wasEdit) load();
  }

  // ---------- render + events ----------
  function render() {
    box.innerHTML = view === "form" ? sForm()
      : view === "sent" ? `<p class="qz-ok ds-msg">✅ ${esc(t("dsThanks"))}<br><span class="muted small">${esc(t("dsThanksKey"))}</span></p>` + back()
      : view === "saved" ? `<p class="qz-ok ds-msg">✅ ${esc(t("dsSaved"))}</p>` + back()
      : view === "mine" ? sMine()
      : sList();
  }

  // ---------- My posts: edit or remove your own approved posts ----------
  const postJSON = async (payload) => {
    const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
    return res.json();
  };
  const who = () => { const p = profile(); return { email: p.email || "", phone: p.phone || "", consent: true }; };
  async function loadMine() {
    mineStatus = "loading"; render();
    try {
      const r = await postJSON({ type: "myposts", ...who() });
      if (!r || !Array.isArray(r.posts)) throw new Error("old script");
      mine = r.posts; mineStatus = "ok";
    } catch (_) { mineStatus = "error"; }
    if (view === "mine") render();
  }
  function sMine() {
    if (!signedUp()) return (window.dwtLockCard ? window.dwtLockCard() : "") + back();
    let body;
    if (mineStatus === "loading") body = `<p class="muted ds-msg">${esc(t("dsLoading"))}</p>`;
    else if (mineStatus === "error") body = `<p class="ds-msg">${esc(t("dsOffline"))} <button type="button" class="btn ghost small-btn" data-act="mine">↻</button></p>`;
    else if (!mine.length) body = `<p class="ds-msg">${esc(t("dsMineNone"))}</p>`;
    else body = `<ul class="ds-mine">${mine.map((x) => {
      const img = safePhoto(x.photo);
      const st = x.status === "live" ? "dsLive" : x.status === "removed" ? "dsRemoved" : "dsPending";
      return `<li>${img ? `<img class="ds-thumb" src="${esc(img)}" alt="" referrerpolicy="no-referrer">` : `<span class="ds-thumb ds-noimg" aria-hidden="true">📦</span>`}
        <div><b dir="auto">${esc(x.product)}</b><br><span class="ds-status ${x.status}">${esc(t(st))}</span>
          <span class="muted small"> · ${esc(money(x.cost, x.currency))}</span></div>
        ${x.status === "live" ? `<div class="ds-acts"><button type="button" class="btn small-btn" data-edit="${esc(x.id)}">${esc(t("dsEdit"))}</button>
          <button type="button" class="btn ghost small-btn" data-remove="${esc(x.id)}">${esc(t("dsRemove"))}</button></div>` : ""}</li>`;
    }).join("")}</ul>`;
    return `<h3 class="ds-mine-t">${esc(t("dsMineT"))}</h3>${body}<p class="ds-err-line error" id="dsMineErr" role="alert" hidden></p>` + back();
  }
  function startEdit(x) {
    editing = x; photo = "";
    draft = { role: x.role, business: x.business, contact_phone: x.phone, country: x.country, city: x.city, product: x.product,
      description: x.description, units: String(x.units), cost: String(x.cost), price: String(x.price), currency: x.currency,
      min_order: x.minOrder ? String(x.minOrder) : "", ok: false };
    view = "form"; render(); box.closest("section").scrollIntoView({ block: "start" });
  }
  async function removePost(x, btn) {
    if (!confirm(t("dsRemoveQ"))) return;
    let key = (ls.get(KEYS) || {})[x.id] || "";
    if (x.needsKey && !key) { key = (prompt(t("dsKey")) || "").trim().toUpperCase(); if (!key) return; }
    btn.disabled = true;
    try {
      const r = await postJSON({ type: "removepost", id: x.id, key, ...who() });
      if (!r || !r.ok) throw r;
      if (key) { const k = ls.get(KEYS) || {}; k[x.id] = key; ls.set(KEYS, k); }
      await loadMine(); load();
    } catch (r) {
      btn.disabled = false;
      const e = $("dsMineErr"); if (e) { e.textContent = t(r && r.error === "bad key" ? "dsKeyErr" : "dsEditFail"); e.hidden = false; }
    }
  }
  function playIt(x) {
    if (!window.dwtGameLoad) return;
    if (window.dwtGameHasOwn && window.dwtGameHasOwn() && !confirm(t("dsReplace"))) return;
    window.dwtTrack("play-from-listing");
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
    if (el.name === "dsRole") { draft.role = el.value; render(); }
  });
  box.addEventListener("change", async (e) => {
    const el = e.target;
    if (el.id === "dsC") { country = el.value; $("dsList").innerHTML = listHTML(); return; }
    if (el.id === "dsR") { role = el.value; $("dsList").innerHTML = listHTML(); return; }
    if (el.tagName === "SELECT" && el.dataset.f) { draft[el.dataset.f] = el.value; const pv = $("dsPrev"); if (pv) pv.innerHTML = previewText(); return; }
    if (el.id === "dsPhoto" && el.files[0]) {
      try { photo = await shrink(el.files[0]); } catch (_) { photo = ""; }
      const row = box.querySelector(".ds-preview-row");
      if (row) row.innerHTML = thumbHTML();
    }
  });
  box.addEventListener("submit", (e) => { e.preventDefault(); submit(); });
  box.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.play) { const x = listings.find((y) => y.id === b.dataset.play); if (x) playIt(x); return; }
    if (b.dataset.report) {
      const panel = box.querySelector(`[data-rbox="${CSS.escape(b.dataset.report)}"]`);
      if (panel) { panel.hidden = !panel.hidden; if (!panel.hidden) panel.innerHTML = reportBox(b.dataset.report); }
      return;
    }
    if (b.dataset.rsend) { sendReport(b.dataset.rsend, b); return; }
    if (b.dataset.edit) { const x = (mine || []).find((y) => y.id === b.dataset.edit); if (x) startEdit(x); return; }
    if (b.dataset.remove) { const x = (mine || []).find((y) => y.id === b.dataset.remove); if (x) removePost(x, b); return; }
    switch (b.dataset.act) {
      case "mine": view = "mine"; editing = null; if (signedUp()) loadMine(); else render(); box.closest("section").scrollIntoView({ block: "start" }); return;
      case "post": view = "form"; editing = null; draft = {}; photo = ""; render(); box.closest("section").scrollIntoView({ block: "start" }); return;
      case "list": view = "list"; editing = null; render(); return;
      case "retry": status = "loading"; render(); load(); return;
    }
  });

  document.addEventListener("dwt:lang", render);
  document.addEventListener("dwt:unlocked", () => { if (view === "form") render(); if (view === "mine") loadMine(); });
  render();
  showLinked();
  load();
})();
