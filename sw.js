const CACHE_NAME = 'attendance-v4';
const ASSETS = [
    './',
    './index.html',
    './worker.html',
    './style.css',
    './app.js',
    './manifest.json'
];

// 설치 시 리소스 저장 (이 로직이 있어야 설치 버튼이 뜹니다)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// 실행 시 네트워크 우선 전략
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
