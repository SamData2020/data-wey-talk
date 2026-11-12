/* Sign-up survey shown before people use the analysis tool.
   Answers are POSTed to the Google Apps Script endpoint in config.js. */

Object.assign(I18N.pcm, {
  svTitle: "Before you start, tell us small about yourself",
  svLede: "E go take 1 minute. E go help Scitylana know how to support you better.",
  svGoals: "Wetin bring you here? (choose all wey concern you)",
  svGoalBusiness: "I get business — I wan understand my numbers",
  svGoalAnalyst: "I wan become remote business analyst",
  svGoalLearn: "I just wan learn data",
  svGoalHelp: "I dey help other people business (NGO, teacher, consultant)",
  svBizType: "Which kind business you get?",
  svBizSize: "How many people dey work for di business?",
  svLevel: "How far you don go with data?",
  svName: "Your name",
  svEmail: "Email",
  svPhone: "Phone / WhatsApp number",
  svCountry: "Country",
  svCity: "City or town",
  svConsent: "I agree make Scitylana contact me (email, phone or WhatsApp) about lessons and opportunities. Scitylana no go sell or share my details.",
  svSubmit: "Submit & start",
  svSending: "We dey send am…",
  svPick: "— Choose one —",
  svErrGoal: "Abeg choose at least one reason wey bring you here.",
  svErrEmail: "Dis email no correct. Check am again.",
  svErrPhone: "Dis phone number no correct. Put am with country code, like +234 803 123 4567.",
  svErrRequired: "Abeg fill di box wey get *.",
  svErrConsent: "Abeg tick di box to agree before you continue.",
  svThanks: "Thank you, {name}! Now put your file or try di sample.",
  svThanksNoName: "Thank you! Now put your file or try di sample.",
  svPrivacy: "🔒 Na only Scitylana go see your details. Your data file (CSV) no dey comot from your device at all.",
  svDelete: "You wan make we delete your details? Send email to",
  // option labels
  bt_food: "Food & drinks (buka, akara, snacks)", bt_retail: "Provisions / shop / supermarket", bt_fashion: "Fashion & tailoring",
  bt_beauty: "Hair & beauty", bt_agro: "Farming & agro", bt_transport: "Transport & logistics",
  bt_pos: "POS / mobile money agent", bt_electronics: "Phone & electronics", bt_services: "Services (repair, cleaning, etc.)", bt_other: "Other",
  bs_1: "Na only me", bs_2: "2 – 5 people", bs_6: "6 – 20 people", bs_20: "More than 20",
  lv_new: "I never use Excel before", lv_some: "I sabi small Excel", lv_work: "I don dey use data for work",
});

Object.assign(I18N.en, {
  svTitle: "Before you start, tell us a little about yourself",
  svLede: "It takes 1 minute and helps Scitylana support you better.",
  svGoals: "What brings you here? (choose all that apply)",
  svGoalBusiness: "I have a business — I want to understand my numbers",
  svGoalAnalyst: "I want to become a remote business analyst",
  svGoalLearn: "I just want to learn data skills",
  svGoalHelp: "I support other people's businesses (NGO, teacher, consultant)",
  svBizType: "What kind of business do you have?",
  svBizSize: "How many people work in the business?",
  svLevel: "How much data experience do you have?",
  svName: "Your name",
  svEmail: "Email",
  svPhone: "Phone / WhatsApp number",
  svCountry: "Country",
  svCity: "City or town",
  svConsent: "I agree that Scitylana may contact me (email, phone or WhatsApp) about lessons and opportunities. Scitylana will not sell or share my details.",
  svSubmit: "Submit and start",
  svSending: "Sending…",
  svPick: "— Choose one —",
  svErrGoal: "Please choose at least one reason.",
  svErrEmail: "That email doesn't look right.",
  svErrPhone: "That phone number doesn't look right. Include the country code, e.g. +234 803 123 4567.",
  svErrRequired: "Please fill in the fields marked *.",
  svErrConsent: "Please tick the box to agree before continuing.",
  svThanks: "Thank you, {name}! Now upload your file or try the sample.",
  svThanksNoName: "Thank you! Now upload your file or try the sample.",
  svPrivacy: "🔒 Only Scitylana sees your details. Your data file (CSV) never leaves your device.",
  svDelete: "Want your details deleted? Email",
  bt_food: "Food & drinks (buka, akara, snacks)", bt_retail: "Provisions / shop / supermarket", bt_fashion: "Fashion & tailoring",
  bt_beauty: "Hair & beauty", bt_agro: "Farming & agro", bt_transport: "Transport & logistics",
  bt_pos: "POS / mobile money agent", bt_electronics: "Phone & electronics", bt_services: "Services (repair, cleaning, etc.)", bt_other: "Other",
  bs_1: "Just me", bs_2: "2 – 5 people", bs_6: "6 – 20 people", bs_20: "More than 20",
  lv_new: "I've never used Excel", lv_some: "I know some Excel", lv_work: "I already use data at work",
});

// African countries + dialing codes. "Other" lets anyone outside Africa sign up.
const COUNTRIES = [
  ["Nigeria", "+234"], ["Ghana", "+233"], ["Kenya", "+254"], ["South Africa", "+27"], ["Cameroon", "+237"],
  ["Algeria", "+213"], ["Angola", "+244"], ["Benin", "+229"], ["Botswana", "+267"], ["Burkina Faso", "+226"],
  ["Burundi", "+257"], ["Cabo Verde", "+238"], ["Central African Republic", "+236"], ["Chad", "+235"],
  ["Comoros", "+269"], ["Congo (Brazzaville)", "+242"], ["Congo (DRC)", "+243"], ["Côte d'Ivoire", "+225"],
  ["Djibouti", "+253"], ["Egypt", "+20"], ["Equatorial Guinea", "+240"], ["Eritrea", "+291"], ["Eswatini", "+268"],
  ["Ethiopia", "+251"], ["Gabon", "+241"], ["Gambia", "+220"], ["Guinea", "+224"], ["Guinea-Bissau", "+245"],
  ["Lesotho", "+266"], ["Liberia", "+231"], ["Libya", "+218"], ["Madagascar", "+261"], ["Malawi", "+265"],
  ["Mali", "+223"], ["Mauritania", "+222"], ["Mauritius", "+230"], ["Morocco", "+212"], ["Mozambique", "+258"],
  ["Namibia", "+264"], ["Niger", "+227"], ["Rwanda", "+250"], ["São Tomé and Príncipe", "+239"], ["Senegal", "+221"],
  ["Seychelles", "+248"], ["Sierra Leone", "+232"], ["Somalia", "+252"], ["South Sudan", "+211"], ["Sudan", "+249"],
  ["Tanzania", "+255"], ["Togo", "+228"], ["Tunisia", "+216"], ["Uganda", "+256"], ["Zambia", "+260"], ["Zimbabwe", "+263"],
];

(function survey() {
  const DONE_KEY = "dwt-survey-done", QUEUE_KEY = "dwt-survey-queue";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} },
  };
  const endpoint = (window.DWT_CONFIG && window.DWT_CONFIG.surveyEndpoint) || "";
  const form = $("survey"), tool = $("tool");

  // Country dropdown: first 5 = most common, then the rest, then Other.
  const sel = $("svCountry");
  const opt = (v, label) => `<option value="${esc(v)}">${esc(label)}</option>`;
  function fillCountries() {
    const keep = sel.value;
    sel.innerHTML = `<option value="">${esc(t("svPick"))}</option>` +
      COUNTRIES.slice(0, 5).map(([c]) => opt(c, c)).join("") +
      `<option disabled>──────────</option>` +
      COUNTRIES.slice(5).map(([c]) => opt(c, c)).join("") +
      opt("Other", "Other country");
    sel.value = keep;
  }
  fillCountries();
  document.addEventListener("dwt:lang", fillCountries);

  // Prefill dialing code when a country is chosen and the phone box is empty or only holds a code.
  sel.addEventListener("change", () => {
    const code = (COUNTRIES.find(([c]) => c === sel.value) || [])[1];
    const ph = $("svPhone");
    if (code && (!ph.value.trim() || /^\+\d{1,4}\s?$/.test(ph.value.trim()))) ph.value = code + " ";
  });

  // Show follow-up questions only when relevant.
  function syncFollowUps() {
    $("svBizBlock").hidden = !form.goal_business.checked;
    $("svLevelBlock").hidden = !form.goal_analyst.checked;
  }
  form.addEventListener("change", syncFollowUps);
  syncFollowUps();

  function setUnlocked(name) {
    form.hidden = true;
    tool.hidden = false;
    const thanks = $("svThanks");
    thanks.textContent = name ? t("svThanks", { name }) : t("svThanksNoName");
    thanks.hidden = false;
  }

  async function send(payload) {
    if (!endpoint) throw new Error("no endpoint");
    // text/plain avoids a CORS preflight, which Apps Script cannot answer.
    await fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
  }
  function queue(payload) {
    let q = [];
    try { q = JSON.parse(store.get(QUEUE_KEY) || "[]"); } catch (_) {}
    q.push(payload);
    store.set(QUEUE_KEY, JSON.stringify(q.slice(-5)));
  }
  async function flushQueue() {
    if (!endpoint) return;
    let q = [];
    try { q = JSON.parse(store.get(QUEUE_KEY) || "[]"); } catch (_) {}
    if (!q.length) return;
    const left = [];
    for (const p of q) { try { await send(p); } catch (_) { left.push(p); } }
    store.set(QUEUE_KEY, JSON.stringify(left));
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const err = $("svError");
    const fail = (msg, field) => { err.textContent = msg; err.hidden = false; if (field) field.focus(); };
    err.hidden = true;

    const goals = ["goal_business", "goal_analyst", "goal_learn", "goal_help"].filter((g) => form[g].checked).map((g) => g.slice(5));
    const v = (id) => $(id).value.trim();
    if (!goals.length) return fail(t("svErrGoal"), form.goal_business);
    if (!v("svEmail") || !v("svPhone") || !v("svCountry") || !v("svCity")) {
      const first = ["svEmail", "svPhone", "svCountry", "svCity"].find((id) => !v(id));
      return fail(t("svErrRequired"), $(first));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("svEmail"))) return fail(t("svErrEmail"), $("svEmail"));
    const digits = v("svPhone").replace(/[^\d]/g, "");
    if (digits.length < 7 || digits.length > 15 || /[^\d+\s()\-]/.test(v("svPhone"))) return fail(t("svErrPhone"), $("svPhone"));
    if (!form.consent.checked) return fail(t("svErrConsent"), form.consent);

    const payload = {
      name: v("svName"),
      email: v("svEmail"),
      phone: v("svPhone"),
      country: v("svCountry"),
      city: v("svCity"),
      goals: goals.join(", "),
      business_type: form.goal_business.checked ? v("svBizType") : "",
      business_size: form.goal_business.checked ? v("svBizSize") : "",
      analyst_level: form.goal_analyst.checked ? v("svLevel") : "",
      language: lang,
      consent: true,
      website: form.website.value, // honeypot: real people leave this empty
      submitted_at: new Date().toISOString(),
    };

    const btn = $("svSubmit");
    btn.disabled = true;
    btn.textContent = t("svSending");
    try { await send(payload); } catch (_) { queue(payload); } // offline or not set up yet: keep and retry later
    btn.disabled = false;
    btn.textContent = t("svSubmit");
    store.set(DONE_KEY, JSON.stringify({ at: payload.submitted_at, name: payload.name }));
    // Remember contact details on this device only, to prefill the quiz prize-draw entry.
    store.set("dwt-profile", JSON.stringify({ name: payload.name, email: payload.email, phone: payload.phone }));
    setUnlocked(payload.name);
    if (/[?&]sample\b/.test(location.search)) $("sample").click();
  });

  // Returning visitor who already filled the survey on this device.
  let done = null;
  try { done = JSON.parse(store.get(DONE_KEY) || "null"); } catch (_) {}
  window.dwtSurveyDone = () => !!store.get(DONE_KEY);
  if (done) {
    form.hidden = true;
    tool.hidden = false;
    if (/[?&]sample\b/.test(location.search)) $("sample").click();
  }
  flushQueue();
})();
