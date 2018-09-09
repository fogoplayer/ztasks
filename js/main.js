import List from "./List.js";

const L = new List();

//Register Service Worker (PWABuilder)
if (navigator.serviceWorker.controller) {
    console.log('[PWA Builder] active service worker found, no need to register');
}
else {
    navigator.serviceWorker.register('service-worker.js', {
        scope: './'
    }).then(function(reg) {
        console.log('Service worker has been registered for scope:' + reg.scope);
    });
}