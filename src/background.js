import { AI21 } from "@langchain/community/llms/ai21";

const commands = {
    format: "format",
    rewrite: "rewrite",
    beautify: "beautify"
},
mods = {
    rewrite: "Rewrite the given text for a social social post to reach larger audience and make it sound very professional. Don't change facts but add supporting information if necessary.",
    format: "Format the given text to look better on social social post. Make sure to add emojis and line breaks wherever necessary.",
    beautify: "Rewrite and format the given text for a social social post. Keep the tone profesional, use line breaks to make content readable, format text to bold italics or underlined based on context, it should reach large audience, don't change facts, add supporting facts if necessary and add emojis and genZ lingo sparingly. Keep it concise and make it easy to read. Always generate relevant hashtags based on the content. Don't use the word hashtag anywhere. Always make list items bold and add numbers before them."
}, ai = {
    model: "",
}, identifier = "AI21APIKey";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.intent == "inform") {
            //
        }   else if (request.intent == "copy")    {
            _fetch(request);
        }
    }
);

chrome.commands.onCommand.addListener((command) => {
    switch(command) {
        case commands.format:
        case commands.rewrite:
        case commands.beautify:
            getSelectedText(command)
            .then(res => {
                _fetch(res)
            })
        break;
    }
});

async function getSelectedText(type) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return await chrome.tabs.sendMessage(tab.id, {type: type, intent: "copy"});
}

async function _fetch({type, data}) {
    if (data) {
        if (!ai.model) {
            const res = await chrome.storage.local.get(identifier)
            ai.model = new AI21({
                ai21ApiKey: res[identifier],
            });
        }
        const chatCompletion = await ai.model.invoke(`${mods[type]} given text: ${data}`);
        writeToDOM(chatCompletion);
    }
}

function writeToDOM(data) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {data: data, intent: "paste"}, function() {
            // console.log("text replaced!");
        });
    })
}