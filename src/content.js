chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.intent == 'copy') {
            sendResponse({intent: 'copy', type: request.type, data: window.getSelection().toString()});
            addLoader();
        }   else if (request.intent == 'paste')   {
            replaceSelectedText(request.data);
            removeLoader();
            sendResponse({intent: "inform", type: "", data: "text replaced!"});
        }
    }
);

// https://stackoverflow.com/questions/3997659/replace-selected-text-in-contenteditable-div
function replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}

function addLoader() {
    const container = document.getElementsByClassName("editor-container")[0];
    const div = document.createElement('div');
    const text = document.createTextNode('Please wait ...');
    div.id = "loader";
    div.appendChild(text);
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.display = 'flex';
    div.style.position = "absolute";
    div.style.top = 0;
    div.style.left = 0;
    div.style.width = `${container.clientWidth}px`;
    div.style.height = `${document.getElementsByClassName("share-creation-state__content-scrollable")[0].clientHeight}px`;
    div.style.background = "rgba(0,0,0, 0.6)";
    div.style.color = "rgba(255, 255, 255, 1)";
    div.style.marginLeft = "24px";
    container.appendChild(div)
}

function removeLoader() {
    document.getElementById("loader").remove();
}