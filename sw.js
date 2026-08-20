/* The Back Room — service worker
   The whole app is pre-cached. There are no external requests at all,
   so once installed it runs with the connection off. */

const SHELL = "backroom-shell-v2";

const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-180.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(SHELL)
      .then(c => c.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== SHELL).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Navigations: serve the shell so the app opens offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Everything else: cache-first with a network fallback.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req))
  );
});
