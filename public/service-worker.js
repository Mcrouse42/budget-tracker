const APP_PREFIX = "Budget-Tracker-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

const DATA_CACHE_NAME = "data-cache-version_01";

const FILES_TO_CACHE = [
  "./index.html",
  "./css/style.css",
  "./js/index.js",
  "./js/idb.js",
  "./manifest.json",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});
