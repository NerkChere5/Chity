function _on_controllerChange() {
  location.reload();
}




function main() {
  navigator.serviceWorker.register('./ServiceWorker.js', {updateViaCache: 'none'});
}




main();
