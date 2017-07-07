/*
 * Copyright 2015 Boris Smus. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PREV = 'prev';
var PLAY = 'play-pause';
var NEXT = 'next';
var STOP = 'stop';

var onNotificationButtonClicked = onNotificationButtonClicked || function() {};

function simulateClick(element) {
    if (!element) {
        console.log('keysocket: Cannot simulate click, element undefined');
        return false;
    }

    var click = new MouseEvent('click', {
        bubbles: true,
        cancelable: false,
        view: window,
    });
    return element.dispatchEvent(click);
}

function sendNotification(options) {
    if (options.buttons) {
        options.buttons = options.buttons.map(function (val) {
            return {title: val.title, iconUrl: getStyleImage(document.querySelector(val.icon))};
        });
    }

    chrome.runtime.sendMessage({command: 'sendNotification', options});
}

function getStyleImage(el) {
    var imageUrl = getComputedStyle(el).backgroundImage;

    imageUrl = imageUrl.slice(3).replace(/['"()]/g, '');

    return imageUrl;
}

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.command === 'clickNotificationButton') {
            onNotificationButtonClicked(request.index);
        } else {
            console.log('Received keypress: ', request);
            onKeyPress(request.command);
        }
    }
);

chrome.runtime.sendMessage({command: 'registerTab'});

window.onunload = function() {
    chrome.runtime.sendMessage({command: "unregisterTab"});
}