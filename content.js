function onMessage(message, sender, sendResponse) {
    document.execCommand("inserttext", false, message);
    sendResponse();
    return true;
}
chrome.runtime.onMessage.addListener(onMessage);
