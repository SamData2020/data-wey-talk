/* Offline support for Data Wey Talk.
   Network first (so updates show up straight away), saved copy when there's no internet.
   Videos and other websites (Google Sheet, fonts) are not cached. */
const CACHE = "dwt-v1";
const CORE = [
  "./", "index.html", "styles.css", "config.js", "app.js", "survey.js", "quiz.js", "correlate.js", "curriculum.js",
  "game.js", "book.js", "lang/sw.js", "lang/fr.js", "lang/ar.js", "lang/ha.js", "lang/yo.js", "lang/ig.js", "lang/zu.js",
  "lang/game-i18n.js", "lang/quiz-more.js", "lang/book-i18n.js",
  "assets/scitylana-mark.jpg", "assets/scitylana-logo.jpg", "assets/favicon.png", "assets/icon-192.png",
  "data/akara-and-bread-sales.csv", "manifest.webmanifest",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || /\.(mp4|vtt)$/i.test(url.pathname)) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((m) => m || caches.match("index.html")))
  );
});
