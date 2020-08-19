const CACHE_NAME = "inn-v1";
// important file location to save
const urlsToCache = [
    "./",
    "./manifest.json",
    "./index.html",
    "./navs.html",
    "./pages/home.html",
    "./pages/destination.html",
    "./pages/destination.yogyakarta.html",
    "./pages/gallery.html",
    "./pages/about.html",
    "./pages/404.html",
    "./css/materialize.min.css",
    "./js/materialize.min.js",
    "./css/style.css",
    "./js/init.js",
    "./images/ifan-bima-B04Xpnu5JQ4-unsplash.png",
    "./images/guilherme-stecanella-_dH-oQF9w-Y-unsplash.jpg",
    "./images/ruben-hutabarat-YMnwxa1bYS0-unsplash.png",
    "./images/jeremy-bishop-GntGR-SHkXE-unsplash.png",
    "./images/paolo-nicolello-zb3b08nJlww-unsplash.png",
    "./images/ern-gan-bUvmhwQ-gsw-unsplash.png",
    "./images/jason-cooper-XEhchWQuWyM-unsplash.png",
    "./images/dominic-krainer-iY2Pole688I-unsplash.png",
    "./images/aldri-suganda-Xf0yD5LFxas-unsplash.png",
    "./images/mathyas-kurmann-fb7yNPbT0l8-unsplash.jpg",
    "./images/nega-YdyhHbWZ1V0-unsplash.jpg",
    "./images/silas-baisch-PvBECXDZw84-unsplash.jpg",
    "./images/shashank-acharya-nis5gvoboyI-unsplash.jpg",
    "./images/killian-pham-Sq8rpq2KB7U-unsplash.jpg",
    "./images/eugenia-clara-_QTeGT478_8-unsplash.jpg",
    "./images/buddha-1210622_1280.png",
    "./images/frenky-harry-_9ExPfUFWHM-unsplash.jpg",
    "./images/mark-chaves-MNmYtfLvKsA-unsplash.jpg",
    "./images/carolus-abi-5OEAc-z1VkM-unsplash.jpg",
    "./images/capturing-the-human-heart-TrhLCn1abMU-unsplash.jpg",
    "./images/element5-digital-uE2T1tCFsn8-unsplash.jpg"
];

// init serviceWorker to save important file to cache
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});
//s elf.skipWaiting();
// serviceWorker listener to check cache first
self.addEventListener("fetch", event => {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(response => {
                // if response exist which mean there is a cache, then return
                if (response) return response;

                // if response not exist fetch from server
                return fetch(event.request);
            })
    );
});

// serviceWorker update listener to remove unused cache
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // if there is cache beside the current version, delete it.
                    if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
                })
            );
        })
    );
});