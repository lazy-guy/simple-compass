var cacheurl = [
  '/simple-compass/',
  '/simple-compass/index.html',
  '/simple-compass/index.js',
  '/simple-compass/index.css',
  '/simple-compass/Compass.png',
  '/simple-compass/icon-192.png',
  '/simple-compass/icon-512.png',
  '/simple-compass/needle.png',
  '/simple-compass/dark.webmanifest',
  '/simple-compass/favicon.ico'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('simple-compass')
    .then(cache => {cache.addAll(cacheurl);})
    .then(self.skipWaiting())
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(async function() {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;
    return fetch(event.request);
  }());
});
self.addEventListener("onupdatefound", function () {
  registration.update();
})