chrome.runtime.onInstalled.addListener((reason) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: 'onboarding.html'
        });
    }
});

chrome.tabs.onActivated.addListener(async function(activeInfo) {
    checkIfSupported(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo) {
    if(changeInfo.status === 'complete') {
        console.log("Tab Update");
        checkIfSupported(tabId);
    }
});

function checkIfSupported(tabId) {
    chrome.tabs.get(tabId, async (tab) => {
        chrome.action.setIcon({
            path: 'images/inactive32.png'
        });

        // TODO: Check if a supported website
        if(!tab.url.includes("opensea")) return false;

        callGetNFT(tabId);
    });
}

function callGetNFT(tabId) {
    console.log("Calling getNFT in tab");
    chrome.tabs.sendMessage(tabId, { type: "GET_NFT_INFO" });
    chrome.action.setIcon({
        path: 'images/active32.png'
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.type === "NFT_INFO_LOADING") {
        chrome.storage.sync.set({
            isDone: false,
            nftInfo: null
        });
        chrome.action.setIcon({
            path: 'images/active32.png'
        });
    }

    if(request.type === "NFT_INFO") {
        console.log(request.data);

        chrome.storage.sync.set({
            isDone: true,
            nftInfo: request.data
        });

        chrome.action.setIcon({
            path: 'images/ready32.png'
        });
    }
});