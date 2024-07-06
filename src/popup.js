const identifier = "AI21APIKey";

document.addEventListener('DOMContentLoaded', function () {
    const [ Format, Rewrite, Beautify, SaveAPI ] = [
        document.getElementById('format'),
        document.getElementById('rewrite'),
        document.getElementById('beautify'),
        document.getElementById('saveAPI')
    ]
    Format.disabled = true;
    Rewrite.disabled = true;
    Beautify.disabled = true;
    checkKey();
    
    Format.addEventListener('click', () => {
        _select('format');
    });
    
    Rewrite.addEventListener('click', () => {
        _select('rewrite');
    });

    Beautify.addEventListener('click', () => {
        _select('beautify');
    });

    SaveAPI.addEventListener('click', () => {
        const apikey = document.getElementById("APIkey").value;
        const obfuscatedKey = storeAPIKey(apikey);
        showObfuscatedKey(obfuscatedKey)
    });

    async function _select(type) {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, {type: type, intent: "copy"});
        chrome.runtime.sendMessage(response);
    }

    function storeAPIKey(APIKey) {
        chrome.storage.local.set({AI21APIKey: APIKey});
        return APIKey;
    }

    function showObfuscatedKey(key) {
        key = `${key.slice(0,4)}***************`;
        document.getElementById("APIkey").value = key;
        Format.disabled = false;
        Rewrite.disabled = false;
        Beautify.disabled = false;
    }

    function checkKey() {
        chrome.storage.local.get(identifier, function(res) {
            if (res) {
                const key = res[identifier];
                showObfuscatedKey(key);
            }
        });
    }
});