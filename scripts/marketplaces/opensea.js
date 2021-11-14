chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);

    if(request.type === "GET_NFT_INFO") {
        getNFT();
    }
});

function getNFT() {
    console.log("== Getting NFT ==");
    chrome.runtime.sendMessage({ type: "NFT_INFO_LOADING" });

    let domTimer;
    domTimer = setInterval(() => {
        let titleContainer = document.querySelector("div.item--wrapper > div.item--main > section.item--header > h1");
        let collectionContainer = document.querySelector("div.item--wrapper > div.item--main > section.item--header > div > div.item--collection-detail > div > a");
    
        let previewImageContainer = document.querySelector("div.item--wrapper > div.item--summary > article > div > div > div > div > img");
        let previewVideoContainer = document.querySelector("div.item--wrapper > div.item--summary > article > div > div > div > div > div > video");

        console.log("Checking DOM for meta data");

        if(previewImageContainer) {
            // NFT is an Image
            previewImageContainer.click();

            let deferedTimer;
            deferedTimer = setInterval(() => {
                let fullImageContainer = document.querySelector(".item--lightbox-media > div > div > img");
            
                if(fullImageContainer.src !== null) {
                    chrome.runtime.sendMessage({ type: "NFT_INFO", data: {
                        marketplace: "OpenSea.io",
                        title: titleContainer.innerText,
                        collection: collectionContainer.innerText,
                        type: "image",
                        preview_image_url: previewImageContainer.src,
                        full_url: fullImageContainer.src
                    }});

                    document.querySelector("div[role='dialog']").parentElement.click();

                    clearInterval(deferedTimer);
                }
            }, 200);
        } else if(previewVideoContainer) {
            // NFT is a Video

            let deferedTimer;
            deferedTimer = setInterval(() => {
                if(previewVideoContainer.querySelector("source").src !== null) {
                    chrome.runtime.sendMessage({ type: "NFT_INFO", data: {
                        marketplace: "OpenSea.io",
                        title: titleContainer.innerText,
                        collection: collectionContainer.innerText,
                        type: "video",
                        full_url: previewVideoContainer.querySelector("source").src
                    }});
                    clearInterval(deferedTimer);
                }
            }, 200);
        }

        if(titleContainer && collectionContainer) {
            clearInterval(domTimer);
        }
    }, 300);
}