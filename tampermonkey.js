// ==UserScript==
// @name         ARIA.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Aria interface
// @author       wxn0brP
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==

(function() {
    var src = document.createElement("script");
    src.src = "http://localhost:14459/";
    document.body.appendChild(src);
})();