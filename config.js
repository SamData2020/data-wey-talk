/* Site settings.
   surveyEndpoint: Google Apps Script "Web app" URL (see apps-script/README.md).
   videos: when a real recording is on YouTube, put its link here and it
   replaces the computer-voice draft for that module, e.g.
     videos: { 1: "https://youtu.be/XXXXXXXXXXX", 2: "..." },  */
window.DWT_CONFIG = {
  surveyEndpoint: "https://script.google.com/macros/s/AKfycbzXjsKPNB_VPlRCHolmi4gmCvi47HiqluR3Sr0eTAAOsbM8jCPKL1DMifkkSFerdzwl_Q/exec",
  videos: {},
  // Quiz prize: one winner a month — the first person to score above 80%. Change the amount here.
  quizPrize: { amount: "$5" },
};
