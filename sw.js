const CACHE='cen-tabernacle-v1-0-4';
const ASSETS=['./','./index.html','./style.css','./manifest.json','./data/scenes.js','./js/explorer.js','./scene/scene-overview.jpg','./scene/scene-entrance.jpg','./scene/scene-altar.jpg','./scene/scene-laver.jpg','./scene/scene-sanctuary.jpg','./scene/scene-ark.jpg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
