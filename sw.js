const CACHE='cen-tabernacle-v1-0-0';
const ASSETS=['./','./index.html','./style.css','./manifest.json','./data/scenes.js','./js/explorer.js','./assets/images/scene-overview.jpg','./assets/images/scene-altar.jpg','./assets/images/scene-laver.jpg','./assets/images/scene-sanctuary.jpg','./assets/images/scene-ark.jpg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match('./index.html'))))});
