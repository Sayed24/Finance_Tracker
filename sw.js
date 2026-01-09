/* =====================================================
   Service Worker – Finance Tracker
===================================================== */

const CACHE_NAME = "finance-tracker-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./transactions.html",
  "./reports.html",
  "./css/style.css",
  "./js/db.js",
  "./js/state.js",
  "./js/dashboard.js",
  "./js/transactions.js",
  "./js/reports.js",
  "./js/budget.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
