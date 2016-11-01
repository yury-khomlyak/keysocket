var playTarget = '.player-controls__play';
var nextTarget = '.slider__item_next';

function onKeyPress(key) {
    if (key === NEXT) {
        simulateClick(document.querySelector(nextTarget));
    } else if (key === PLAY) {
        simulateClick(document.querySelector(playTarget));
    }
}
