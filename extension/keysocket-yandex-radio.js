var playTarget = '.player-controls__play';
var nextTarget = '.slider__item_next';
var playingTarget = '.slider__item_playing';
var observerTarget = '.centerblock';
var controlsTarget = '.player-controls';
var sliderTarget = '.slider__items';

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

createObserver(observerTarget);

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

function createObserver(target) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        var playing = document.querySelector(playingTarget);

                        if (target !== sliderTarget && node.classList.contains(playingTarget.slice(1))) {
                            destroyObserver(observer);

                            createObserver(sliderTarget);

                            createNotification(playing);
                        }

                        if (target === sliderTarget) {
                            createNotification(playing);
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.querySelector(target), {
        subtree: true,
        childList: true,
        characterData: true
    });
}

function destroyObserver(observer) {
    observer.disconnect();
}