

const CACHE_NAME = 'smart-cache-v1';

const INITIAL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './novel1.html',
  './novel2.html',
  './novel3.html',
  './novel4.html',
  './novel5.html',
  './novel6.html',
  './novel7.html',
  './novel8.html',
  './novel9.html',
  './novel10.html',
  './icon-192.png',
  './icon-512.png'
];




// التثبيت المبدئي
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(INITIAL_ASSETS);
    })
  );
});

// جلب الملفات وتشغيل الأوفلاين توماتيك
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; 
      }

      return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
