// const CACHE_NAME = "mobin-portfolio-v1";
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/assets/PWA/logo512.webp",
//   "/assets/PWA/logo192.webp",
//   "/styles/style.css",
//   "/js/app.js",
//   // Add more files as needed
// ];

// // Install event: caching static assets
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
//   self.skipWaiting();
// });

// // Activate event: clean up old caches
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((name) => name !== CACHE_NAME)
//           .map((name) => caches.delete(name))
//       );
//     })
//   );
//   self.clients.claim();
// });

// // Fetch event: serve cached assets when offline
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         // Return cache hit or do a network fetch
//         return response || fetch(event.request);
//       })
//       .catch(() => {
//         // Optionally serve fallback (e.g., offline page) here
//       })
//   );
// });
