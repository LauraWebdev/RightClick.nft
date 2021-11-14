let _nftInfo = null;

let nftInfoMarketplaceContainer = document.querySelector(".nftInfoMarketplace");
let nftInfoTitleContainer = document.querySelector(".nftInfoTitle");
let nftInfoCollectionContainer = document.querySelector(".nftInfoCollection");
let nftInfoPreviewImageContainer = document.querySelector(".nftInfoPreviewImage");
let nftInfoPreviewVideoContainer = document.querySelector(".nftInfoPreviewVideo");

window.onload = function() {
    console.log("Onload Called");
    
    setLoading(true);
    updateUI(_nftInfo);

    chrome.storage.sync.get("nftInfo", ({ isDone, nftInfo }) => {
        updateUI(nftInfo);
    });
}

function updateUI(nftInfo) {
    console.log("Update UI");
    _nftInfo = nftInfo;
    setLoading(false);

    if(_nftInfo !== null && nftInfo !== undefined) {
        nftInfoMarketplaceContainer.innerText = nftInfo.marketplace;
        nftInfoTitleContainer.innerText = nftInfo.title;
        nftInfoCollectionContainer.innerText = nftInfo.collection;
        switch(nftInfo.type) {
            case "image":
                nftInfoPreviewImageContainer.classList.add("active");
                nftInfoPreviewVideoContainer.classList.remove("active");

                nftInfoPreviewImageContainer.src = nftInfo.preview_image_url;
                break;
            case "video":
                nftInfoPreviewImageContainer.classList.remove("active");
                nftInfoPreviewVideoContainer.classList.add("active");

                nftInfoPreviewVideoContainer.src = nftInfo.full_url;
                nftInfoPreviewVideoContainer.play();
                break;
        }
    }
}

function setLoading(shouldLoad) {
    if(shouldLoad) {
        // Set Loading
        document.body.classList.add("loading");
    } else {
        // Set Not Loading
        document.body.classList.remove("loading");
    }
}

let saveAsButton = document.querySelector(".saveAs");
saveAsButton.addEventListener("click", () => {
    saveNFT();
});

function saveNFT() {
    console.log("Save NFT");
    chrome.downloads.download({
        url: _nftInfo.full_url,
        filename: _nftInfo.title,
        saveAs: true,
    });
}