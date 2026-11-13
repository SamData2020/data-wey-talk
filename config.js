/* Site settings.
   surveyEndpoint: Google Apps Script "Web app" URL (see apps-script/README.md).
   videos: when a real recording is on YouTube, put its link here and it
   replaces the computer-voice draft for that module, e.g.
     videos: { 1: "https://youtu.be/XXXXXXXXXXX", 2: "..." },  */
window.DWT_CONFIG = {
  surveyEndpoint: "https://script.google.com/macros/s/AKfycbw4d1c00RbQ2TsL80uypr3xGqEPvzgDjqFNjg8IYsiYRwAbztdWw2IEJgybHuQ6HLigRA/exec",
  videos: {},
  // Quiz prize: one winner a month — the first person to score above 80%.
  quizPrize: { amount: "₦5,000", kind_pcm: "airtime or data", kind_en: "airtime or data", kind_sw: "muda wa maongezi au data" },
};
