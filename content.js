function onMessage(message, sender, sendResponse) {
    document.execCommand("inserttext", false, `Please see ${message}`);
    sendResponse();
    return true;
}
chrome.runtime.onMessage.addListener(onMessage);
