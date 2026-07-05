const CACHE='cen-tabernacle-v0.5.3';
const ASSETS=['./','./index.html','./manifest.json','./scene-overview.jpg','./scene-laver.jpg','./scene-altar.jpg','./scene-sanctuary.jpg','./scene-ark.jpg','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
