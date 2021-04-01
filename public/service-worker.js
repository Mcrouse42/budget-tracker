const APP_PREFIX = "BudgetTracker-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

const DATA_CACHE_NAME = "data-cache-version_01";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/js/idb.js",
  "/js/index.js",
  "/css/styles.css",
];

//installs service worker 
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// try to figure out ? 
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(DATA_CACHE_NAME).then((response) => {
      return response || fetch(event.request);
    })
  );
});


// is this working?
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheKeeplist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});




