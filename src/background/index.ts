import { entries } from "../model/entries";

chrome.commands.onCommand.addListener((command) => {
    if (command === "default-copy") {
        handleDefaultCopy();
    }

});

function handleDefaultCopy() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;
        const filteredContextEntries = entries.filter((e) => url.match(e.urlRegex));
        if (filteredContextEntries.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id,
                {
                    message: "copyText",
                    textToCopy: filteredContextEntries[0].text
                }, function (response) { })
        }

    })
}
