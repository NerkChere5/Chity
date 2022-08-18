importScripts('./ServiceWorker/Options.js');




async function _caches_remove() {
  let caches_keys = (await caches.keys()).filter((key) => key != options.cache_name);
  let caches_delete_promises = caches_keys.map((key) => caches.delete(key));
  
  return Promise.all(caches_delete_promises);
}


function _on_activate(event) {
  event.waitUntil(_caches_remove());
}


function _on_fetch(event) {
  if (event.request.method != 'GET') return;
  
  event.respondWith(_response_define(event.request));
}


function _on_install() {
  skipWaiting();
}


async function _response_define(request) {
  let cache = await caches.open(options.cache_name);
  let response = await cache.match(request);
  
  if (response) return response;
  
  try {
    response = await fetch(request);
    cache.put(request, response.clone());
  }
  catch (error) {
    response = new Response(null);
  }
  
  return response;
}




function main() {
  addEventListener('activate', _on_activate);
  addEventListener('fetch', _on_fetch);
  addEventListener('install', _on_install);
}




main();
