/* Quiz + monthly prize draw entry.
   Score above 80% (9 or 10 out of 10) → enter the monthly draw.
   Entries go to the same Apps Script as the survey (type: "quiz"). */

const PRIZE = Object.assign({ amount: "₦5,000", kind_pcm: "airtime or data", kind_en: "airtime or data", kind_sw: "muda wa maongezi au data" },
  (window.DWT_CONFIG || {}).quizPrize || {});
const PASS = 0.8; // must score ABOVE this

Object.assign(I18N.pcm, {
  navQuiz: "Quiz & Prize",
  qzPrizeKind: "airtime or data",
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
    "Di winner go get {amount} {kind}, sent to di phone number wey dem use claim.",
    "One prize per person every month. We fit check say na real person before we send di prize.",
    "We go contact di winner by email or phone. If dem no answer within 7 days, di prize go to di next person wey qualify dat month.",
    "Scitylana staff and their family no fit enter.",
    "Scitylana fit change or stop dis promo; we go announce am for dis page.",
  ],
});

Object.assign(I18N.en, {
  navQuiz: "Quiz & Prize",
  qzPrizeKind: "airtime or data",
  qzEyebrow: "Test yourself · Win a prize",
  qzTitle: "Take the quiz, win {amount} {kind}!",
  qzLede: "10 questions from the lessons and curriculum. Each month, the FIRST person to score above 80% (9 or 10 correct) wins {amount} {kind}. Be quick!",
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
  qzWon: "🏆 Congratulations! You're the FIRST in {month} — you've won {amount} {kind}! Scitylana will contact you by email or phone.",
  qzLate: "Someone has already won the {month} prize. Great score though! Come back early next month and try again.",
  qzClaimed: "🏆 The {month} prize has been won. You can still take the quiz to practise — the next prize opens on the 1st of next month.",
  qzAlready: "✅ You've already claimed for {month}. Come back next month!",
  qzErr: "Please enter a valid email and phone number, and tick the box.",
  qzRulesTitle: "Prize rules",
  qzRules: [
    "Free to enter. No payment or purchase needed.",
    "One winner each month: the FIRST person to score above 80% (9 or 10 out of 10) and claim.",
    "We go by the time our system receives the claim (Nigeria time). Each month starts on the 1st at midnight.",
    "The winner receives {amount} {kind}, sent to the phone number they claimed with.",
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

(function quiz() {
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} },
  };
  const endpoint = (window.DWT_CONFIG && window.DWT_CONFIG.surveyEndpoint) || "";
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthName = () => now.toLocaleString({ pcm: "en-NG", ar: "ar-u-nu-latn" }[lang] || lang, { month: "long", year: "numeric" });
  const P = () => ({ amount: PRIZE.amount, kind: PRIZE["kind_" + lang] || t("qzPrizeKind"), month: monthName() });
  const box = $("quizBox");
  let qs = { i: 0, score: 0, answered: false, stage: "intro" };
  let claimed = false;   // has someone already won this month? (asked from the Sheet)
  let won = null;        // result of our own claim: true / false / null (unknown)

  function enteredThisMonth() { return store.get("dwt-quiz-entry") === monthKey; }

  function renderStatic() {
    $("qzTitle").textContent = t("qzTitle", P());
    $("qzLede").textContent = t("qzLede", P());
    $("qzRulesTitle").textContent = t("qzRulesTitle");
    const rules = (I18N[lang] || I18N.en).qzRules;
    $("qzRules").innerHTML = rules.map((r) => `<li>${esc(r.replace(/\{(\w+)\}/g, (_, k) => P()[k] ?? ""))}</li>`).join("");
  }

  function render() {
    renderStatic();
    const Q = QUIZ[lang] || QUIZ.en;
    const banner = claimed && !won ? `<p class="qz-banner">${esc(t("qzClaimed", P()))}</p>` : "";
    if (qs.stage === "intro") {
      box.innerHTML = `${banner}<button type="button" class="btn" data-act="start">${esc(t("qzStart"))}</button>`;
      return;
    }
    if (qs.stage === "q") {
      const [q, opts] = Q[qs.i];
      box.innerHTML = `
        <div class="qz-progress" aria-hidden="true"><span style="width:${(qs.i / Q.length) * 100}%"></span></div>
        <p class="qz-count">${esc(t("qzOf", { n: qs.i + 1, total: Q.length }))}</p>
        <fieldset class="qz-q"><legend>${esc(q)}</legend>
          ${opts.map((o, j) => `<label class="check qz-opt"><input type="radio" name="qz" value="${j}"><span>${esc(o)}</span></label>`).join("")}
        </fieldset>
        <p class="qz-feedback" id="qzFeedback" role="status"></p>
        <button type="button" class="btn" data-act="check">${esc(t("qzCheck"))}</button>`;
      return;
    }
    if (qs.stage === "result") {
      const total = Q.length, pct = Math.round((qs.score / total) * 100);
      const passed = qs.score / total > PASS;
      let html = `<p class="qz-score">${esc(t("qzScore", { score: qs.score, total, pct }))}</p>`;
      if (!passed) {
        html += `<p>${esc(t("qzFail"))}</p><button type="button" class="btn" data-act="retry">${esc(t("qzRetry"))}</button>`;
      } else if (enteredThisMonth()) {
        html += `<p class="qz-ok">${esc(t("qzAlready", P()))}</p>`;
      } else if (claimed) {
        html += `<p class="qz-ok">${esc(t("qzLate", P()))}</p>`;
      } else {
        let prof = {};
        try { prof = JSON.parse(store.get("dwt-profile") || "{}"); } catch (_) {}
        html += `<p class="qz-ok">${esc(t("qzPass", P()))}</p>
          <form class="qz-entry" id="qzEntry" novalidate>
            <h3>${esc(t("qzEnterTitle", P()))}</h3>
            <div class="grid2">
              <label class="field"><span>${esc(t("svName"))}</span><input name="name" maxlength="100" autocomplete="name" value="${esc(prof.name || "")}"></label>
              <label class="field"><span>${esc(t("svEmail"))} *</span><input name="email" type="email" maxlength="120" autocomplete="email" value="${esc(prof.email || "")}"></label>
              <label class="field wide"><span>${esc(t("svPhone"))} *</span><input name="phone" type="tel" maxlength="24" autocomplete="tel" placeholder="+234 803 123 4567" value="${esc(prof.phone || "")}"></label>
            </div>
            <label class="hp" aria-hidden="true">Website <input name="website" tabindex="-1" autocomplete="off"></label>
            <label class="check consent"><input type="checkbox" name="consent"><span>${esc(t("qzConsent"))}</span></label>
            <p class="error" id="qzErr" role="alert" hidden></p>
            <button type="submit" class="btn">${esc(t("qzSubmit"))}</button>
          </form>`;
      }
      box.innerHTML = html;
      return;
    }
    if (qs.stage === "entered") {
      box.innerHTML = `<p class="qz-score">${esc(t("qzScore", { score: qs.score, total: Q.length, pct: Math.round((qs.score / Q.length) * 100) }))}</p>
        <p class="qz-ok${won ? " qz-won" : ""}">${esc(t(won === true ? "qzWon" : won === false ? "qzLate" : "qzEntered", P()))}</p>`;
    }
  }

  box.addEventListener("click", (e) => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (!act) return;
    const Q = QUIZ[lang] || QUIZ.en;
    if (act === "start" || act === "retry") { qs = { i: 0, score: 0, answered: false, stage: "q" }; render(); box.scrollIntoView({ block: "nearest" }); return; }
    if (act === "check") {
      const picked = box.querySelector('input[name="qz"]:checked');
      const fb = $("qzFeedback");
      if (!picked) { fb.textContent = t("qzPick"); fb.className = "qz-feedback bad"; return; }
      const [, opts, correct, why] = Q[qs.i];
      const ok = +picked.value === correct;
      if (ok) qs.score++;
      box.querySelectorAll('input[name="qz"]').forEach((r) => {
        r.disabled = true;
        const lab = r.closest(".qz-opt");
        if (+r.value === correct) lab.classList.add("right");
        else if (r.checked) lab.classList.add("wrong");
      });
      fb.innerHTML = `<b>${esc(ok ? t("qzRight") : t("qzWrong", { ans: opts[correct] }))}</b><br><span class="why">${esc(why)}</span>`;
      fb.className = "qz-feedback " + (ok ? "good" : "bad");
      const last = qs.i === Q.length - 1;
      e.target.outerHTML = `<button type="button" class="btn" data-act="next">${esc(last ? t("qzFinish") : t("qzNext"))}</button>`;
      return;
    }
    if (act === "next") {
      qs.i++;
      qs.stage = qs.i >= Q.length ? "result" : "q";
      render();
      box.scrollIntoView({ block: "nearest" });
    }
  });

  box.addEventListener("submit", async (e) => {
    if (e.target.id !== "qzEntry") return;
    e.preventDefault();
    const f = e.target, err = $("qzErr");
    const email = f.email.value.trim(), phone = f.phone.value.trim();
    const digits = phone.replace(/[^\d]/g, "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || digits.length < 7 || digits.length > 15 || !f.consent.checked) {
      err.textContent = t("qzErr"); err.hidden = false; return;
    }
    const Q = QUIZ[lang] || QUIZ.en;
    const payload = {
      type: "quiz", month: monthKey, name: f.name.value.trim(), email, phone,
      score: qs.score, total: Q.length, language: lang, consent: true,
      website: f.website.value, submitted_at: new Date().toISOString(),
    };
    const btn = f.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = t("qzSending");
    try {
      if (!endpoint) throw new Error("no endpoint");
      const opts = { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) };
      try {
        const res = await fetch(endpoint, opts);              // readable reply: { ok, winner }
        const data = await res.json();
        if (data && data.ok) { won = !!data.winner; if (!won) claimed = true; }
      } catch (_) {
        await fetch(endpoint, { ...opts, mode: "no-cors" });   // fallback: sent, but reply unreadable
      }
    } catch (_) {
      // Keep it for the survey queue to retry next visit.
      try {
        const q = JSON.parse(store.get("dwt-survey-queue") || "[]"); q.push(payload);
        store.set("dwt-survey-queue", JSON.stringify(q.slice(-5)));
      } catch (_) {}
    }
    store.set("dwt-quiz-entry", monthKey);
    qs.stage = "entered";
    render();
  });

  async function checkStatus() {
    if (!endpoint) return;
    try {
      const res = await fetch(endpoint + (endpoint.includes("?") ? "&" : "?") + "status=1");
      const data = await res.json();
      if (data && data.ok) { claimed = !!data.claimed; render(); }
    } catch (_) { /* offline: assume still open; the Sheet decides anyway */ }
  }

  document.addEventListener("dwt:lang", render);
  render();
  checkStatus();
})();
