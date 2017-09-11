// support both old and new Yandex Music interfaces: '.old, .new'
var playTarget = '.b-jambox__play, .player-controls__btn_play';
var nextTarget = '.b-jambox__next, .player-controls__btn_next';
var prevTarget = '.b-jambox__prev, .player-controls__btn_prev';

var playingTarget = '.player-controls__track';
var observerTarget = '.bar';
var sliderTarget = '.player-controls__track-container';

var imageTarget = '.track-cover';
var titleTarget = '.track__title';
var artistTarget = '.track__artists .link';

var likeTarget = '.player-controls__btn.like';
var dislikeTarget = '.player-controls__btn.dislike';
var likeIconTarget = `${likeTarget} .icon`;
var likedIconTarget = `${likeTarget} .icon_like_on`;
var dislikeIconTarget = `${dislikeTarget} .icon`;

var notificationButtons = [
    {title: 'Like', button: likeTarget, icon: likeIconTarget},
    {title: 'Dislike', button: dislikeTarget, icon: dislikeIconTarget}
];

createObserver(observerTarget);

function onKeyPress(key) {
    if (key === PREV) {
        simulateClick(document.querySelector(prevTarget));
    } else if (key === NEXT) {
        simulateClick(document.querySelector(nextTarget));
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
    var title = el.querySelector(titleTarget);
    var artist = el.querySelector(artistTarget);
    var liked = el.querySelector(likedIconTarget);

    var buttons = [];

    if (liked) {
        buttons = [notificationButtons[1]];
    } else {
        buttons = notificationButtons.slice(0);
    }

    sendNotification({
        image: getStyleImage(el.querySelector(imageTarget)),
        title: title.getAttribute('title') || title.innerHTML,
        artist: artist.getAttribute('title') || artist.innerHTML,
        source: 'Yandex Music',
        buttons: buttons
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

                            onKeyPress(PLAY); // start playing
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