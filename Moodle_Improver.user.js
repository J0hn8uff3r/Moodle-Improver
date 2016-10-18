// ==UserScript==
// @name        Moodle Improver
// @namespace   https://github.com/J0hn8uff3r
// @description Allows you to paste images showing them and URLS from clipboard on private messages using Ctrl+V making them clickable
// @include     */aulavirtual/message/index.php*
// @version     1.0
// @grant       none
// ==/UserScript==
// TODO
// Get images from clipboard and paste them directly on message
function handlePaste(e) {
    var clipboardData, pastedText;

    e.stopPropagation();
    e.preventDefault();

    message_content = document.getElementById("id_message").value;

    clipboardData = e.clipboardData || window.clipboardData;
    pastedText = clipboardData.getData('Text');

    // Check for URL on pasted text and make it clickable
    if (/\bhttps?:\/\/[\d.a-z-]+\.[a-z]{2,6}(?::\d{1,5})?(?:\/[\d!$'()*+,._a-z-]+){0,9}(?:\/[\d!$'()*+,._a-z-]*)?(?:\?[\d!$&'()*+,.=_a-z-]*)?/i.test(pastedText)) {
        if (/^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/.test(pastedText)) { //Check if it's an image URL
            pastedText = '<a href="' + pastedText + '" target="_blank"><img src="' + pastedText + '" /></a>';
            document.getElementById("id_message").value = message_content + pastedText;
        } else { //Not an image
            pastedText = '<a href="' + pastedText + '">' + pastedText + '</a>';
            document.getElementById("id_message").value = message_content + pastedText;
        }
    } else {
        document.getElementById("id_message").value = message_content + pastedText;
    }

}

document.getElementById('id_message').addEventListener('paste', handlePaste);
