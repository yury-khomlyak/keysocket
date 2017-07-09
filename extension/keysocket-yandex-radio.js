var playTarget = '.player-controls__play';
var nextTarget = '.slider__item_next';
var controlsTarget = '.player-controls';

var imageTarget = '.track__cover';
var titleTarget = '.track__title';
var artistTarget = '.track__artists';

var likeTarget = '.like_action_like';
var dislikeTarget = '.like_action_dislike';
var likeIconTarget = '.icon_like';
var dislikeIconTarget = '.icon_dislike';

var notificationButtons = [
    {title: 'Like', button: likeTarget, icon: likeIconTarget},
    {title: 'Dislike', button: dislikeTarget, icon: dislikeIconTarget}
];

function onKeyPress(key) {
    var next = document.querySelector(nextTarget);

    if (key === NEXT) {
        simulateClick(next);

        createNotification(next);
    } else if (key === PLAY) {
        simulateClick(document.querySelector(playTarget));
    }
}

function onNotificationButtonClicked(index) {
    var controls = document.querySelector(controlsTarget),
        button = controls.querySelector(notificationButtons[index].button);

    simulateClick(button);
}

function createNotification(el) {
    sendNotification({
        image: getStyleImage(el.querySelector(imageTarget)),
        title: el.querySelector(titleTarget).getAttribute('title'),
        artist: el.querySelector(artistTarget).getAttribute('title'),
        source: 'Yandex Radio',
        buttons: notificationButtons
    });
}
