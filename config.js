/* Site settings.
   surveyEndpoint: Google Apps Script "Web app" URL (see apps-script/README.md).
   videos: when a real recording is on YouTube, put its link here and it
   replaces the computer-voice draft for that module, e.g.
     videos: { 1: "https://youtu.be/XXXXXXXXXXX", 2: "..." },  */
window.DWT_CONFIG = {
  surveyEndpoint: "https://script.google.com/macros/s/AKfycbzei0wjwauo23eMK1F7hGFPEFa6Kefv_2hNOjCVbUpKvpPLJCZGrntrWalItTdrOivvNQ/exec",
  videos: {},
  // Quiz prize draw (monthly). Keep "winners" equal to WINNERS_PER_DRAW in apps-script/Code.gs.
  quizPrize: { amount: "₦5,000", winners: 5, kind_pcm: "airtime or data", kind_en: "airtime or data" },
};
