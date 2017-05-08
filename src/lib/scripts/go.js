function done() {
  console.log(arguments);
}
function progress() { console.log(arguments); }
function onClick(ev) {
  getAllFriendScores2(done, progress);
}

window.addEventListener('load', (event) => {
  document.querySelector('button').addEventListener('click', onClick);
}, false);
