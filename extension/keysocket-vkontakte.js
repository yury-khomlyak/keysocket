var playTarget = {
        audio_page: '.audio_page_player_play'
    },
    nextTarget = {
        audio_page: '.audio_page_player_next'
    },
    prevTarget = {
        audio_page: '.audio_page_player_prev'
    };

function clickMany(targets) {
    for (var elementId in targets) {
        if (targets.hasOwnProperty(elementId))
            simulateClick(document.querySelector(targets[elementId]));
    }
}

function onKeyPress(key) {
    if (key == PREV) {
        clickMany(prevTarget);
    } else if (key == NEXT) {
        clickMany(nextTarget);
    } else if (key == PLAY) {
        clickMany(playTarget);
    }
}
