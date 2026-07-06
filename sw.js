const CACHE='cen-temple-explorer-v1.0.0';
const ASSETS=[
  './','./index.html','./manifest.webmanifest','./manifest.json','./icon-192.png','./icon-512.png',
  './scene/overview.jpg','./scene/entry.jpg','./scene/altar.jpg','./scene/laver.jpg','./scene/sanctuary.jpg','./scene/ark.jpg',
  './assets/icons/images/flow-bg.jpg','./assets/icons/images/card-tabernacle.jpg','./assets/icons/images/card-solomon.jpg','./assets/icons/images/card-zerubbabel.jpg','./assets/icons/images/card-herod.jpg','./assets/icons/images/stage-temple.jpg'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
