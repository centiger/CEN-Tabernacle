const CACHE_NAME = 'cen-tabernacle-v0.2.4';
const ASSETS = [
  './','./index.html','./style.css','./app.js','./manifest.json','./db/data.js',
  './assets/icons/icon-192.png','./assets/icons/icon-512.png',
  './assets/images/hero-tabernacle.jpg','./assets/images/card-tabernacle.jpg','./assets/images/card-solomon.jpg','./assets/images/card-zerubbabel.jpg','./assets/images/card-herod.jpg','./assets/images/flow-bg.jpg','./assets/images/stage-tabernacle.jpg','./assets/images/stage-temple.jpg'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request;
  e.respondWith(fetch(req).then(res => {
    const copy = res.clone();
    caches.open(CACHE_NAME).then(c => c.put(req, copy)).catch(()=>{});
    return res;
  }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
});
