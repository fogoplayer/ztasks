import List from "./List.js";

const L = new List();
L.renderTasks();


M.Dropdown.init(document.querySelectorAll('.menu .dropdown-trigger'), {
    alignment:"right",
    constrainWidth:false,
    coverTrigger:false
});
M.Collapsible.init(document.querySelectorAll('.collapsible'), {
    accordion: false
});

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