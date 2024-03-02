chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "get-links") {
        fetch(chrome.runtime.getURL("links.txt")).then((response) =>
            response.text().then((text) => {
                const links = text.split(/\s+/g);
                sendResponse(links);
            })
        );
        return true;
    }
});
