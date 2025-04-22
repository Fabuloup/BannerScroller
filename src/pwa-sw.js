// This is the "Offline page" service worker

const CACHE = "bannerscroller-cache";

var assetsToCache = [
  './index.html',
  './main.js',
  './style.css',
  './manifest.webmanifest'
];

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(assetsToCache);
    }).then(function() {
      // `skipWaiting()` forces the waiting ServiceWorker to become the
      // active ServiceWorker, triggering the `onactivate` event.
      // Together with `Clients.claim()` this allows a worker to take effect
      // immediately in the client(s).
      return self.skipWaiting();
    })
  );
});

// Activate event
// Be sure to call self.clients.claim()
self.addEventListener('activate', function(event) {
  // `claim()` sets this worker as the active worker for all clients that
  // match the workers scope and triggers an `oncontrollerchange` event for
  // the clients.
  return self.clients.claim();
});

// If any fetch fails, it will show the offline page.
self.addEventListener("fetch", function (event) {
  // Get current path
  var requestUrl = new URL(event.request.url);

  // Save all resources on origin path only
    if (requestUrl.pathname.substring(0,18) === 'localhost:8080/') {
      event.respondWith(
        caches.open(CACHE).then(function(cache) {
        // Go to the network to ask for that resource
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          // Respond with it
          return networkResponse;
        }).catch(function() {
          // If no internet connection, try to match request
          // to some of our cached resources
          return cache.match(event.request);
        })
        })
      );
    } 
});

// This is an event that can be fired from your page to tell the SW to update the offline page
self.addEventListener("refreshOffline", function () {
  const offlinePageRequest = new Request(offlineFallbackPage);

  return fetch(offlineFallbackPage).then(function (response) {
    return caches.open(CACHE).then(function (cache) {
      console.log("[PWA] Offline page updated from refreshOffline event: " + response.url);
      return cache.put(offlinePageRequest, response);
    });
  });
});