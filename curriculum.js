/* Data analytics curriculum + "how data help your kind business" sector cards. */

Object.assign(I18N.pcm, {
  curEyebrow: "Scitylana Academy curriculum",
  curTitle: "Learn data analytics, step by step",
  curLede: "Eight modules from zero. Whether you get business or you wan work as remote business analyst, start from Module 1 and waka reach di end.",
  curLearn: "Wetin you go learn",
  curHelps: "How e go help you",
  curFor: "Best for",
  forAll: "Everybody", forBiz: "Business owners", forAnalyst: "Future analysts",
  secTitle: "How data fit help your kind business",
  secLede: "Small business all over Africa dey use data take answer dis kind question:",
  curCta: "Start Module 1 with di free tool",
  navTool: "Use di tool", navLessons: "Lessons", navCurriculum: "Curriculum", navAbout: "About",
});

Object.assign(I18N.en, {
  curEyebrow: "Scitylana Academy curriculum",
  curTitle: "Learn data analytics, step by step",
  curLede: "Eight modules from zero. Whether you run a business or want to work as a remote business analyst, start at Module 1 and work your way through.",
  curLearn: "What you'll learn",
  curHelps: "How it helps you",
  curFor: "Best for",
  forAll: "Everyone", forBiz: "Business owners", forAnalyst: "Future analysts",
  secTitle: "How data can help your kind of business",
  secLede: "Small businesses across Africa use data to answer questions like these:",
  curCta: "Start Module 1 with the free tool",
  navTool: "Use the tool", navLessons: "Lessons", navCurriculum: "Curriculum", navAbout: "About",
});

const CURRICULUM = {
  pcm: [
    { t: "Data na wetin? Start to dey write your records", for: "forAll",
      learn: ["Every sale, expense and customer na data", "Notebook, phone or Excel — which one fit you", "Simple daily sales and expenses record", "How to record am every day without stress"],
      helps: "Akara seller wey dey write daily sales go know which day e suppose fry more, and which day e suppose rest." },
    { t: "Excel and Google Sheets from zero", for: "forAll",
      learn: ["Rows, columns and cells", "Type, arrange and format your data", "SUM, AVERAGE, MIN and MAX formulas", "Save as CSV and share am for WhatsApp"],
      helps: "You go stop to dey calculate with hand — di sheet go do am for you, no mistake." },
    { t: "Clean your data", for: "forAll",
      learn: ["Remove the ones wey repeat (duplicates)", "Arrange dates and ₦ amounts make dem correct", "Make names dey the same (\"Agege bread\" no be \"agege brd\")", "Wetin to do with empty boxes"],
      helps: "Dirty data dey give wrong answer. Clean data mean say di decision wey you take go correct." },
    { t: "Di numbers wey matter", for: "forBiz",
      learn: ["Sales (revenue) vs profit — dem no be the same", "Profit margin: how much you dey keep from every ₦100", "Average sale and percentage share", "Growth: compare dis month with last month"],
      helps: "You go know if di price wey you increase dey help you or e dey drive customers go." },
    { t: "Charts and simple dashboard", for: "forAll",
      learn: ["Bar chart, line chart — when to use which one", "Why pie chart dey confuse people", "Build one-page dashboard for Google Sheets", "How to read chart quick-quick"],
      helps: "One look for your dashboard every morning and you go know how business dey." },
    { t: "Find di pattern", for: "forBiz",
      learn: ["Your best days and best time of day", "Di products wey dey sell pass, and di ones wey dey slow", "Seasons: festive period, school resumption, rainy season", "Compare different shops or locations"],
      helps: "You go buy more stock before di busy period come, instead of after e don pass." },
    { t: "Stock, customers and money wey dem owe you", for: "forBiz",
      learn: ["Track stock and know when to restock (reorder level)", "Customer list and who dey come back", "Track credit — customer wey dey owe", "Cash flow: money wey enter vs money wey comot"],
      helps: "Your money no go tie down for goods wey no dey move, and you go collect your debt on time." },
    { t: "Become remote business analyst", for: "forAnalyst",
      learn: ["Tools: Excel, Google Sheets, Power BI or Looker Studio, small SQL", "Build portfolio with real small-business data", "Find clients: local businesses, LinkedIn, Upwork and others", "How to price your work, get paid across borders, and explain your findings simple"],
      helps: "You fit work from anywhere for Africa and help businesses for Africa and abroad understand their numbers." },
  ],
  en: [
    { t: "What is data? Start keeping records", for: "forAll",
      learn: ["Every sale, expense and customer is data", "Notebook, phone or Excel — choosing what fits you", "A simple daily sales and expenses record", "Recording every day without stress"],
      helps: "An akara seller who records daily sales learns which days to fry more and which days to slow down." },
    { t: "Excel and Google Sheets from zero", for: "forAll",
      learn: ["Rows, columns and cells", "Typing, arranging and formatting data", "SUM, AVERAGE, MIN and MAX formulas", "Saving as CSV and sharing on WhatsApp"],
      helps: "No more calculating by hand — the sheet does it for you, without mistakes." },
    { t: "Clean your data", for: "forAll",
      learn: ["Removing duplicates", "Fixing dates and ₦ amounts", "Consistent names (\"Agege bread\" not \"agege brd\")", "Handling empty cells"],
      helps: "Messy data gives wrong answers. Clean data means your decisions are right." },
    { t: "The numbers that matter", for: "forBiz",
      learn: ["Sales (revenue) vs profit — they're not the same", "Profit margin: how much you keep from every ₦100", "Average sale and percentage share", "Growth: this month vs last month"],
      helps: "You'll know whether a price increase is helping you or driving customers away." },
    { t: "Charts and a simple dashboard", for: "forAll",
      learn: ["Bar vs line chart — when to use which", "Why pie charts confuse people", "Building a one-page dashboard in Google Sheets", "Reading a chart quickly"],
      helps: "One look at your dashboard each morning tells you how the business is doing." },
    { t: "Find the pattern", for: "forBiz",
      learn: ["Your best days and times of day", "Best sellers and slow movers", "Seasons: festive periods, school resumption, rainy season", "Comparing shops or locations"],
      helps: "You'll stock up before the busy period, not after it's gone." },
    { t: "Stock, customers and money owed to you", for: "forBiz",
      learn: ["Tracking stock and reorder levels", "Customer lists and repeat buyers", "Tracking credit — who owes you", "Cash flow: money in vs money out"],
      helps: "Your money won't be tied up in goods that don't move, and you'll collect debts on time." },
    { t: "Become a remote business analyst", for: "forAnalyst",
      learn: ["Tools: Excel, Google Sheets, Power BI or Looker Studio, basic SQL", "Building a portfolio with real small-business data", "Finding clients: local businesses, LinkedIn, Upwork and more", "Pricing your work, getting paid across borders, and explaining findings simply"],
      helps: "Work from anywhere in Africa, helping businesses at home and abroad understand their numbers." },
  ],
};

const SECTORS = {
  pcm: [
    ["🍲", "Food vendor / buka", "Which food dey finish first, which one dey waste?", "Compare wetin you cook with wetin remain every day. Cook di correct quantity, reduce waste."],
    ["🛒", "Provisions & supermarket", "Wetin I suppose restock now?", "Restock before e finish, and see di slow goods wey dey hold your money."],
    ["✂️", "Fashion & tailoring", "Which style dey bring money pass?", "Track orders, deposit and balance, and how many days delivery dey take."],
    ["💇", "Hair & beauty salon", "Which service and which day dey busy pass?", "Plan your staff for busy days and know your customers wey dey come back."],
    ["🌾", "Farming & agro", "When I go sell to get better price?", "Record harvest, cost of seed and fertilizer, and price for each month."],
    ["💳", "POS / mobile money agent", "How much cash I need hold every day?", "See your peak hours, plan your float, and know how much charges you dey make."],
    ["🛵", "Transport & logistics", "Which route dey pay pass after fuel?", "Remove fuel and maintenance from each route money to see di real profit."],
    ["📱", "Phone & electronics", "Which brand dey move fast and which one dey give profit?", "Track margin for each product and how many dem dey return."],
  ],
  en: [
    ["🍲", "Food vendor / buka", "Which dishes sell out first, and which go to waste?", "Compare what you cook with what's left each day. Cook the right amount and cut waste."],
    ["🛒", "Provisions & supermarket", "What should I restock now?", "Restock before you run out, and spot slow goods tying up your cash."],
    ["✂️", "Fashion & tailoring", "Which styles bring in the most money?", "Track orders, deposits and balances, and how long deliveries take."],
    ["💇", "Hair & beauty salon", "Which services and days are busiest?", "Plan staff for busy days and know your repeat customers."],
    ["🌾", "Farming & agro", "When should I sell for a better price?", "Record harvests, seed and fertilizer costs, and prices month by month."],
    ["💳", "POS / mobile money agent", "How much cash do I need each day?", "See your peak hours, plan your float, and know what you earn in charges."],
    ["🛵", "Transport & logistics", "Which route pays best after fuel?", "Subtract fuel and maintenance from each route's income to see real profit."],
    ["📱", "Phone & electronics", "Which brands move fast and which make profit?", "Track margin per product and how many get returned."],
  ],
};

(function curriculum() {
  function renderCurriculum() {
    const mods = CURRICULUM[lang] || CURRICULUM.en;
    $("modules").innerHTML = mods.map((m, i) => `
      <details class="module"${i === 0 ? " open" : ""}>
        <summary>
          <span class="mod-num">${i + 1}</span>
          <span class="mod-title">${esc(m.t)}</span>
          <span class="mod-tag ${m.for}">${esc(t(m.for))}</span>
        </summary>
        <div class="mod-body">
          <h4>${esc(t("curLearn"))}</h4>
          <ul>${m.learn.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
          <p class="mod-helps"><b>${esc(t("curHelps"))}:</b> ${esc(m.helps)}</p>
        </div>
      </details>`).join("");
    const secs = SECTORS[lang] || SECTORS.en;
    $("sectors").innerHTML = secs.map(([icon, name, q, a]) => `
      <article class="sector">
        <span class="sector-icon" aria-hidden="true">${icon}</span>
        <h4>${esc(name)}</h4>
        <p class="sector-q">“${esc(q)}”</p>
        <p class="muted">${esc(a)}</p>
      </article>`).join("");
  }
  document.addEventListener("dwt:lang", renderCurriculum);
  applyLang(); // apply the newly added words (also renders the curriculum)
})();
