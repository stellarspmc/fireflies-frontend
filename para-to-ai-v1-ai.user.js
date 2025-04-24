// ==UserScript==
// @name         para-to-ai
// @namespace    https://mc.spmc.fun/
// @version      v1-ai
// @description  pin pin lau ying
// @author       tcfplayz
// @match        https://fireflies.chiculture.org.hk/app/assignments/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';
    const url = "please input yourself hahaha"

    function toClipboard() {
        var finalText = "請把問題1至5的答案只需要英文字母直線排列，例如如果答案是A,B,C,D,A，就打出ABCDA\n";
        const noteContents = document.getElementsByClassName('note-content');
        if (noteContents[0]) {
            finalText += noteContents[0].innerText;
            finalText += "\n\n";
        }

        const cardContents = document.getElementsByClassName('card-body');
        if (cardContents) {
            for (let i = 0; i < cardContents.length; i++) {
                finalText += cardContents[i].innerText;
                finalText += "\n";
            }
        }

        if (finalText) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: finalText,
            };

            fetch(url, requestOptions)
                .then(response => response.text())
                .then(a => {
                    const reqArray = a.split('');
                    console.log(a);
                    for (let i = 0; i < reqArray.length; i++) {
                        switch (reqArray[i]) {
                            case "A":
                                document.getElementById("rb_" + i + "_0").click();
                                break;
                            case "B":
                                document.getElementById("rb_" + i + "_1").click();
                                break;
                            case "C":
                                document.getElementById("rb_" + i + "_2").click();
                                break;
                            case "D":
                                document.getElementById("rb_" + i + "_3").click();
                                break;
                            default:
                                console.error("unexpected value:", reqArray);
                                break;
                        }
                    }
                    document.getElementsByClassName('btn btn-tertiary px-3 rounded-pill')[0].click()
                    window.setTimeout(() => {document.getElementsByClassName('m-2 btn btn-outline-tertiary')[0].click()}, 100)
                    //document.getElementsByClassName('btn btn-secondary')[0].click()
                })
                .catch(error => {
                    console.error('Error:', error);
            });
        }
    }

    const observer = new MutationObserver(() => {
        const noteContents = document.getElementsByClassName('note-content');
        const cardContents = document.getElementsByClassName('card-body');

        // Check if the elements are now present
        if (noteContents.length > 0 || cardContents.length > 0) {
            toClipboard();
            observer.disconnect(); // Stop observing once we have what we need
        }
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    const observer2 = new MutationObserver(() => {
        const bgPaper = document.getElementsByClassName('btn btn-light px-4 py-3');

        // Check if the elements are now present
        if (bgPaper.length > 0) {
            bgPaper[0].click();
            observer2.disconnect(); // Stop observing once we have what we need
        }
    });

    // Start observing the document body for changes
    observer2.observe(document.body, { childList: true, subtree: true });
})();