/* Monthly quiz + prize.
   - A bank of 30 questions; every 14 days a new set of 10 is drawn (answers shuffled too).
   - Each person (email/phone from the sign-up form) can take it ONCE per month; the Sheet checks this.
   - The FIRST person each month to score above 80% (9 or 10 of 10) wins.
   Results go to the same Apps Script as the survey (type: "quiz"). */

const PRIZE = Object.assign({ amount: "$5" },
  (window.DWT_CONFIG || {}).quizPrize || {});
const PASS = 0.8; // must score ABOVE this

Object.assign(I18N.pcm, {
  navQuiz: "Quiz & Prize",
  qzPrizeKind: "voucher / gift card",
  qzOnceNote: "You fit take am ONCE every month — so prepare well before you start.",
  qzNextSet: "New questions every 14 days. Next change: {date}.",
  qzAs: "You dey take am as {name} ({email}).",
  qzNeedForm: "Fill di short form for top first — di quiz go use your details.",
  qzTaken: "You don take di quiz for {month}. Your next chance na {date}.",
  qzFailOnce: "You need 9 or 10 to win. Go read di lessons well — your next chance na {date}.",
  qzAlreadyTried: "Our record show say you don already take di quiz dis month, so dis one no count for di prize. Come back {date}.",
  qzRuleOnce: "Each person fit take di quiz ONE time every month (same email or phone). Na only your first try count.",
  qzRuleRotate: "Di questions dey change every 14 days.",
  qzEyebrow: "Test yourself · Win prize",
  qzTitle: "Take di quiz, win {amount} {kind}!",
  qzLede: "10 questions from di lessons and curriculum. Every month, di FIRST person wey score pass 80% (9 or 10 correct) go win {amount} {kind}. Quick-quick!",
  qzStart: "Start di quiz",
  qzOf: "Question {n} of {total}",
  qzCheck: "Check answer",
  qzNext: "Next question",
  qzFinish: "See my score",
  qzRight: "✅ Correct!",
  qzWrong: "❌ No be am. Di correct answer na: {ans}",
  qzPick: "Abeg choose one answer.",
  qzScore: "You score {score} out of {total} ({pct}%)",
  qzPass: "🎉 Well done! You pass 80%. Claim am now — if you be di first person for {month}, di {amount} {kind} na your own!",
  qzFail: "You almost reach! You need 9 or 10 to enter di draw. Go read di lessons again, then try again.",
  qzRetry: "Try again",
  qzEnterTitle: "Claim di {month} prize",
  qzConsent: "I agree to di rules below, and make Scitylana contact me about di prize.",
  qzSubmit: "Claim di prize",
  qzSending: "We dey send am…",
  qzEntered: "✅ We don receive your entry. If you be di first person for {month}, we go contact you by email or phone.",
  qzWon: "🏆 Congratulations! You be di FIRST person for {month} — you don win {amount} {kind}! Scitylana go contact you by email or phone.",
  qzLate: "Somebody don already win di {month} prize. You do well sha! Come back early next month and try again.",
  qzClaimed: "🏆 Di {month} prize don get winner. You fit still take di quiz to practise — next prize go start for di 1st of next month.",
  qzAlready: "✅ You don already claim for {month}. Come back next month!",
  qzErr: "Abeg fill your email and phone well, and tick di box.",
  qzRulesTitle: "Rules for di prize",
  qzRules: [
    "E free. You no need to pay or buy anything.",
    "One winner every month: di FIRST person wey score pass 80% (9 or 10 out of 10) and claim am.",
    "We dey use di time wey our system receive di claim (Nigeria time). Month start 1st, 12 midnight.",
    "Di winner go get {amount} {kind}, we go send am by email or WhatsApp.",
    "One prize per person every month. We fit check say na real person before we send di prize.",
    "We go contact di winner by email or phone. If dem no answer within 7 days, di prize go to di next person wey qualify dat month.",
    "Scitylana staff and their family no fit enter.",
    "Scitylana fit change or stop dis promo; we go announce am for dis page.",
  ],
});

Object.assign(I18N.en, {
  navQuiz: "Quiz & Prize",
  qzPrizeKind: "voucher / gift card",
  qzOnceNote: "You can take it ONCE a month — so prepare before you start.",
  qzNextSet: "New questions every 14 days. Next change: {date}.",
  qzAs: "Taking the quiz as {name} ({email}).",
  qzNeedForm: "Fill in the short form at the top first — the quiz uses your details.",
  qzTaken: "You've taken the {month} quiz. Your next chance is {date}.",
  qzFailOnce: "You need 9 or 10 to win. Study the lessons — your next chance is {date}.",
  qzAlreadyTried: "Our records show you already took the quiz this month, so this attempt doesn't count for the prize. Come back on {date}.",
  qzRuleOnce: "Each person can take the quiz ONCE a month (same email or phone). Only your first attempt counts.",
  qzRuleRotate: "The questions change every 14 days.",
  qzEyebrow: "Test yourself · Win a prize",
  qzTitle: "Take the quiz, win a {amount} {kind}!",
  qzLede: "10 questions from the lessons and curriculum. Each month, the FIRST person to score above 80% (9 or 10 correct) wins a {amount} {kind}. Be quick!",
  qzStart: "Start the quiz",
  qzOf: "Question {n} of {total}",
  qzCheck: "Check answer",
  qzNext: "Next question",
  qzFinish: "See my score",
  qzRight: "✅ Correct!",
  qzWrong: "❌ Not quite. The correct answer is: {ans}",
  qzPick: "Please choose an answer.",
  qzScore: "You scored {score} out of {total} ({pct}%)",
  qzPass: "🎉 Well done! You scored above 80%. Claim now — if you're the first in {month}, the {amount} {kind} is yours!",
  qzFail: "So close! You need 9 or 10 to enter the draw. Review the lessons and try again.",
  qzRetry: "Try again",
  qzEnterTitle: "Claim the {month} prize",
  qzConsent: "I agree to the rules below, and to Scitylana contacting me about the prize.",
  qzSubmit: "Claim the prize",
  qzSending: "Sending…",
  qzEntered: "✅ We've received your entry. If you're the first in {month}, we'll contact you by email or phone.",
  qzWon: "🏆 Congratulations! You're the FIRST in {month} — you've won a {amount} {kind}! Scitylana will contact you by email or phone.",
  qzLate: "Someone has already won the {month} prize. Great score though! Come back early next month and try again.",
  qzClaimed: "🏆 The {month} prize has been won. You can still take the quiz to practise — the next prize opens on the 1st of next month.",
  qzAlready: "✅ You've already claimed for {month}. Come back next month!",
  qzErr: "Please enter a valid email and phone number, and tick the box.",
  qzRulesTitle: "Prize rules",
  qzRules: [
    "Free to enter. No payment or purchase needed.",
    "One winner each month: the FIRST person to score above 80% (9 or 10 out of 10) and claim.",
    "We go by the time our system receives the claim (Nigeria time). Each month starts on the 1st at midnight.",
    "The winner receives a {amount} {kind}, sent by email or WhatsApp.",
    "One prize per person per month. We may check that the winner is a real person before sending the prize.",
    "We contact the winner by email or phone. If they don't reply within 7 days, the prize goes to the next qualifying person that month.",
    "Scitylana staff and their families can't enter.",
    "Scitylana may change or end this promotion; any change will be announced on this page.",
  ],
});

// [question, options, correct index, explanation] — Pidgin and English
const QUIZ = {
  pcm: [
    ["You sell akara ₦15,700 for morning and ₦9,000 for evening. Wetin be your total for di day?", ["₦6,700", "₦24,700", "₦15,700", "₦9,000"], 1, "Total na when you add everything join: ₦15,700 + ₦9,000 = ₦24,700."],
    ["You sell ₦30,000 for 3 days. Wetin be your average sale per day?", ["₦30,000", "₦3,000", "₦10,000", "₦90,000"], 2, "Average: share di total equal-equal. ₦30,000 ÷ 3 = ₦10,000."],
    ["Your sales na ₦100,000 and your cost na ₦70,000. How much be your profit?", ["₦30,000", "₦170,000", "₦100,000", "₦70,000"], 0, "Profit = sales − cost = ₦100,000 − ₦70,000 = ₦30,000."],
    ["For dat same business (₦30,000 profit from ₦100,000 sales), wetin be di profit margin?", ["70%", "3%", "100%", "30%"], 3, "₦30,000 ÷ ₦100,000 = 30%. From every ₦100, you keep ₦30."],
    ["You wan compare how Akara, Agege Bread and Sliced Bread sell. Which chart fit pass?", ["Line chart", "Bar chart", "No chart at all", "Pie chart with 20 slices"], 1, "Bar chart na for comparing things. Di longer di bar, di bigger di number."],
    ["Your line chart dey fall from left go right. Wetin e mean?", ["Things dey go up", "Your data don clean", "Things dey go down — check wetin happen", "E no mean anything"], 2, "Line wey dey fall mean say di number dey reduce. Find out why."],
    ["Your sheet get \"Agege bread\", \"agege brd\" and \"AGEGE\". Wetin you suppose do?", ["Leave am like dat", "Choose one name and use am every time", "Delete all of dem", "Add dem by hand every time"], 1, "Computer go think say na three different products. One name for one product."],
    ["Which formula go add all your sales from cell D2 reach D30?", ["=AVERAGE(D2:D30)", "=MAX(D2:D30)", "=MIN(D2:D30)", "=SUM(D2:D30)"], 3, "SUM dey add everything join."],
    ["Wetin \"reorder level\" mean?", ["Di price of di goods", "When stock reach dis number, buy more", "Di day wey you close shop", "How many customers you get"], 1, "Reorder level na di number wey tell you say time don reach to buy more, before e finish."],
    ["You just start as remote business analyst. Wetin be di best first step to get clients?", ["Wait for big company to call you", "Build portfolio by helping 2 or 3 small businesses", "Buy expensive laptop first", "Do nothing until you sabi everything"], 1, "Clients wan see your work. Help small businesses near you and show di before and after."],
  ],
  en: [
    ["You sell ₦15,700 of akara in the morning and ₦9,000 in the evening. What is your total for the day?", ["₦6,700", "₦24,700", "₦15,700", "₦9,000"], 1, "A total adds everything: ₦15,700 + ₦9,000 = ₦24,700."],
    ["You sell ₦30,000 over 3 days. What is your average sale per day?", ["₦30,000", "₦3,000", "₦10,000", "₦90,000"], 2, "Average: share the total equally. ₦30,000 ÷ 3 = ₦10,000."],
    ["Your sales are ₦100,000 and your costs are ₦70,000. What is your profit?", ["₦30,000", "₦170,000", "₦100,000", "₦70,000"], 0, "Profit = sales − costs = ₦100,000 − ₦70,000 = ₦30,000."],
    ["For that same business (₦30,000 profit on ₦100,000 sales), what is the profit margin?", ["70%", "3%", "100%", "30%"], 3, "₦30,000 ÷ ₦100,000 = 30%. You keep ₦30 of every ₦100."],
    ["You want to compare sales of Akara, Agege Bread and Sliced Bread. Which chart is best?", ["Line chart", "Bar chart", "No chart at all", "Pie chart with 20 slices"], 1, "Bar charts compare things. The longer the bar, the bigger the number."],
    ["Your line chart falls from left to right. What does it mean?", ["Things are going up", "Your data is clean", "Things are going down — check what happened", "It means nothing"], 2, "A falling line means the number is decreasing. Find out why."],
    ["Your sheet has \"Agege bread\", \"agege brd\" and \"AGEGE\". What should you do?", ["Leave it", "Choose one name and use it every time", "Delete them all", "Add them by hand each time"], 1, "The computer treats them as three products. Use one name per product."],
    ["Which formula adds all your sales from cell D2 to D30?", ["=AVERAGE(D2:D30)", "=MAX(D2:D30)", "=MIN(D2:D30)", "=SUM(D2:D30)"], 3, "SUM adds everything together."],
    ["What does \"reorder level\" mean?", ["The price of the goods", "When stock reaches this number, buy more", "The day you close the shop", "How many customers you have"], 1, "It's the stock level that tells you to restock before you run out."],
    ["You're starting out as a remote business analyst. What's the best first step to get clients?", ["Wait for a big company to call", "Build a portfolio by helping 2 or 3 small businesses", "Buy an expensive laptop first", "Do nothing until you know everything"], 1, "Clients want to see your work. Help local businesses and show the before and after."],
  ],
};

// ---------- question rotation ----------
const QUIZ_LEN = 10, QUIZ_DAYS = 14, QUIZ_EPOCH = Date.UTC(2026, 0, 5);   // periods start on Mondays
function quizPeriod(d = new Date()) { return Math.floor((d - QUIZ_EPOCH) / (QUIZ_DAYS * 864e5)); }
function quizRng(seed) { let x = (seed >>> 0) || 1; return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; }
function quizShuffle(arr, rnd) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
// The same period gives everyone the same 10 questions and the same answer order, in every language.
// The bank is shuffled once per 3 periods and cut into 3 sets, so back-to-back fortnights never repeat a question.
// The right answer is spread evenly over positions A–D so guessing "always D" doesn't work.
// Order of the bank for one 3-period block. The first set of a block avoids the last set of the block before
// (blocks are built in order from the start date, so the "block before" is exactly what people saw).
function quizBlock(block, bankLen, perSets) {
  const raw = (b) => quizShuffle([...Array(bankLen).keys()], quizRng(b * 7919 + 104729));
  let prev = raw(0);
  for (let b = 1; b <= Math.max(0, block); b++) {
    const perm = raw(b);
    if (perSets < 2) { prev = perm; continue; }
    const before = prev.slice((perSets - 1) * QUIZ_LEN, perSets * QUIZ_LEN);
    const fresh = perm.filter((q) => !before.includes(q)), seen = perm.filter((q) => before.includes(q));
    prev = fresh.slice(0, QUIZ_LEN).concat(quizShuffle(fresh.slice(QUIZ_LEN).concat(seen), quizRng(b * 31 + 7)));
  }
  return prev;
}
function quizSet(period, bankLen, correctOf) {
  const perSets = Math.max(1, Math.floor(bankLen / QUIZ_LEN));
  const block = Math.floor(period / perSets), slot = ((period % perSets) + perSets) % perSets;
  const qs = quizBlock(block, bankLen, perSets).slice(slot * QUIZ_LEN, slot * QUIZ_LEN + QUIZ_LEN);
  const rnd = quizRng(period * 6151 + 2909);
  const targets = quizShuffle([...Array(QUIZ_LEN).keys()].map((i) => i % 4), rnd);
  return qs.map((q, i) => {
    const c = correctOf(q), others = quizShuffle([0, 1, 2, 3].filter((x) => x !== c), rnd);
    others.splice(targets[i], 0, c);
    return { q, order: others };
  });
}

(function quiz() {
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} },
    del(k) { try { localStorage.removeItem(k); } catch (_) {} },
  };
  const endpoint = (window.DWT_CONFIG && window.DWT_CONFIG.surveyEndpoint) || "";
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const locale = () => ({ pcm: "en-NG", ar: "ar-u-nu-latn" }[lang] || lang);
  const fmtDate = (d) => { try { return d.toLocaleDateString(locale(), { day: "numeric", month: "long", year: "numeric" }); } catch (_) { return d.toDateString(); } };
  const monthName = () => { try { return now.toLocaleString(locale(), { month: "long", year: "numeric" }); } catch (_) { return monthKey; } };
  const P = () => ({ amount: PRIZE.amount, kind: PRIZE["kind_" + lang] || t("qzPrizeKind"), month: monthName(), date: fmtDate(nextMonth) });
  const box = $("quizBox");
  const PROG = "dwt-quiz-progress", TAKEN = "dwt-quiz-taken";
  let claimed = false;                 // has someone already won this month? (asked from the Sheet)
  let qs = { stage: "intro" };
  // Resume an unfinished quiz (so a refresh can't be used to start over).
  try {
    const saved = JSON.parse(store.get(PROG) || "null");
    if (saved && saved.month === monthKey && saved.stage === "q") qs = saved;
  } catch (_) {}

  const bank = () => QUIZ[lang] || QUIZ.en;
  const profile = () => { try { return JSON.parse(store.get("dwt-profile") || "{}"); } catch (_) { return {}; } };
  const taken = () => { try { return JSON.parse(store.get(TAKEN) || "null"); } catch (_) { return null; } };
  const saveProg = () => store.set(PROG, JSON.stringify(qs));
  // Question n of the current attempt, in the current language, with shuffled options.
  function question(n) {
    const { q, order } = qs.set[n];
    const [text, opts, correct, why] = bank()[q];
    return { text, opts: order.map((i) => opts[i]), correct: order.indexOf(correct), why };
  }

  function renderStatic() {
    $("qzTitle").textContent = t("qzTitle", P());
    $("qzLede").textContent = `${t("qzLede", P())} ${t("qzOnceNote")}`;
    $("qzRulesTitle").textContent = t("qzRulesTitle");
    const rules = ((I18N[lang] || I18N.en).qzRules || I18N.en.qzRules).slice();
    rules.splice(2, 0, t("qzRuleOnce"), t("qzRuleRotate"));
    $("qzRules").innerHTML = rules.map((r) => `<li>${esc(r.replace(/\{(\w+)\}/g, (_, k) => P()[k] ?? ""))}</li>`).join("");
  }

  function render() {
    renderStatic();
    const banner = claimed && qs.stage !== "done" ? `<p class="qz-banner">${esc(t("qzClaimed", P()))}</p>` : "";
    const nextSet = new Date(QUIZ_EPOCH + (quizPeriod() + 1) * QUIZ_DAYS * 864e5);
    if (qs.stage === "intro") {
      const tk = taken();
      if (tk && tk.month === monthKey) {
        box.innerHTML = `${banner}<p class="qz-score">${esc(t("qzScore", { score: tk.score, total: tk.total, pct: Math.round((tk.score / tk.total) * 100) }))}</p>
          <p class="qz-ok">${esc(t("qzTaken", P()))}</p>`;
        return;
      }
      const locked = window.dwtSurveyDone && !window.dwtSurveyDone();
      const prof = profile();
      if (locked || !prof.email) {
        box.innerHTML = `${banner}<p class="qz-banner">${esc(t("qzNeedForm"))} <a class="mail" href="#start">↑</a></p>`;
        return;
      }
      box.innerHTML = `${banner}
        <p class="muted small">${esc(t("qzNextSet", { date: fmtDate(nextSet) }))}</p>
        <p class="small">${esc(t("qzAs", { name: prof.name || "—", email: prof.email }))}</p>
        <label class="check consent qz-agree"><input type="checkbox" id="qzAgree"><span>${esc(t("qzConsent"))}</span></label>
        <p class="error" id="qzErr" role="alert" hidden></p>
        <button type="button" class="btn" data-act="start">${esc(t("qzStart"))}</button>`;
      return;
    }
    if (qs.stage === "q") {
      const total = qs.set.length, cur = question(qs.i);
      box.innerHTML = `
        <div class="qz-progress" aria-hidden="true"><span style="width:${(qs.i / total) * 100}%"></span></div>
        <p class="qz-count">${esc(t("qzOf", { n: qs.i + 1, total }))}</p>
        <fieldset class="qz-q"><legend>${esc(cur.text)}</legend>
          ${cur.opts.map((o, j) => `<label class="check qz-opt"><input type="radio" name="qz" value="${j}"><span>${esc(o)}</span></label>`).join("")}
        </fieldset>
        <p class="qz-feedback" id="qzFeedback" role="status"></p>
        <button type="button" class="btn" data-act="check">${esc(t("qzCheck"))}</button>`;
      return;
    }
    if (qs.stage === "sending") {
      box.innerHTML = `<p class="qz-score">${esc(t("qzScore", { score: qs.score, total: qs.set.length, pct: Math.round((qs.score / qs.set.length) * 100) }))}</p><p>${esc(t("qzSending"))}</p>`;
      return;
    }
    if (qs.stage === "done") {
      const total = qs.set.length, passed = qs.score / total > PASS;
      let msg;
      if (qs.result === "already") msg = t("qzAlreadyTried", P());
      else if (!passed) msg = t("qzFailOnce", P());
      else if (qs.result === "won") msg = t("qzWon", P());
      else if (qs.result === "late") msg = t("qzLate", P());
      else msg = t("qzEntered", P());
      box.innerHTML = `<p class="qz-score">${esc(t("qzScore", { score: qs.score, total, pct: Math.round((qs.score / total) * 100) }))}</p>
        <p class="qz-ok${qs.result === "won" ? " qz-won" : ""}">${esc(msg)}</p>`;
    }
  }

  async function finish() {
    qs.stage = "sending"; render();
    store.set(TAKEN, JSON.stringify({ month: monthKey, score: qs.score, total: qs.set.length }));
    store.del(PROG);
    const prof = profile();
    const payload = {
      type: "quiz", month: monthKey, name: prof.name || "", email: prof.email || "", phone: prof.phone || "",
      score: qs.score, total: qs.set.length, set: qs.period, language: lang, consent: true, submitted_at: new Date().toISOString(),
    };
    qs.result = "unknown";
    try {
      if (!endpoint) throw new Error("no endpoint");
      const opts = { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) };
      try {
        const res = await fetch(endpoint, opts);              // readable reply: { ok, winner, passed, already }
        const data = await res.json();
        if (data && data.ok) qs.result = data.already ? "already" : data.winner ? "won" : data.passed ? "late" : "sent";
        if (data && data.winner === false && data.passed) claimed = true;
      } catch (_) {
        await fetch(endpoint, { ...opts, mode: "no-cors" });   // sent, but the reply can't be read
      }
    } catch (_) {
      try {   // offline: keep it for the survey queue to send on the next visit
        const q = JSON.parse(store.get("dwt-survey-queue") || "[]"); q.push(payload);
        store.set("dwt-survey-queue", JSON.stringify(q.slice(-5)));
      } catch (_) {}
    }
    qs.stage = "done"; render();
  }

  box.addEventListener("click", (e) => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (!act) return;
    if (act === "start") {
      if (!$("qzAgree").checked) { const err = $("qzErr"); err.textContent = t("qzErr"); err.hidden = false; return; }
      const period = quizPeriod();
      qs = { stage: "q", month: monthKey, period, set: quizSet(period, bank().length, (q) => bank()[q][2]), i: 0, score: 0 };
      saveProg(); render(); box.scrollIntoView({ block: "nearest" });
      return;
    }
    if (act === "check") {
      const picked = box.querySelector('input[name="qz"]:checked');
      const fb = $("qzFeedback");
      if (!picked) { fb.textContent = t("qzPick"); fb.className = "qz-feedback bad"; return; }
      const cur = question(qs.i);
      const ok = +picked.value === cur.correct;
      if (ok) qs.score++;
      qs.i++;                       // move on now, so a refresh can't re-answer this question
      saveProg();
      box.querySelectorAll('input[name="qz"]').forEach((r) => {
        r.disabled = true;
        const lab = r.closest(".qz-opt");
        if (+r.value === cur.correct) lab.classList.add("right");
        else if (r.checked) lab.classList.add("wrong");
      });
      fb.innerHTML = `<b>${esc(ok ? t("qzRight") : t("qzWrong", { ans: cur.opts[cur.correct] }))}</b><br><span class="why">${esc(cur.why)}</span>`;
      fb.className = "qz-feedback " + (ok ? "good" : "bad");
      const last = qs.i >= qs.set.length;
      e.target.outerHTML = `<button type="button" class="btn" data-act="next">${esc(last ? t("qzFinish") : t("qzNext"))}</button>`;
      return;
    }
    if (act === "next") {
      if (qs.i >= qs.set.length) return finish();
      render(); box.scrollIntoView({ block: "nearest" });
    }
  });

  async function checkStatus() {
    if (!endpoint) return;
    try {
      const res = await fetch(endpoint + (endpoint.includes("?") ? "&" : "?") + "status=1");
      const data = await res.json();
      if (data && data.ok) { claimed = !!data.claimed; if (qs.stage !== "q") render(); }
    } catch (_) { /* offline: the Sheet decides anyway */ }
  }

  document.addEventListener("dwt:lang", () => { if (qs.stage !== "q" || !box.querySelector(".qz-feedback.good, .qz-feedback.bad")) render(); else renderStatic(); });
  render();
  checkStatus();
})();
