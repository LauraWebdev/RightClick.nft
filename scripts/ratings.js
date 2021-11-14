let ratingsBox = document.createElement("div");
ratingsBox.classList.add("betterratings-ratings-box");
ratingsBox.innerHTML = `
    <div class="title">BetterRatings for YouTube</div>
    <p>Ratings will go here</p>
`;

// TODO: Get current rating, get my own rating

// Inject once ready (YouTube lazy loads DOM)
let deferredInject = setInterval(() => {
    if(document.querySelector("#meta-contents > ytd-video-secondary-info-renderer") !== null) {
        // Add rating functionality to original buttons
        document.querySelector("#top-level-buttons-computed > ytd-toggle-button-renderer:nth-child(1)").addEventListener('click', () => {
            rateGood();
        })
        document.querySelector("#top-level-buttons-computed > ytd-toggle-button-renderer:nth-child(2)").addEventListener('click', () => {
            rateBad();
        })

        document.querySelector("#meta-contents > ytd-video-secondary-info-renderer").prepend(ratingsBox);
        clearInterval(deferredInject);
    }
}, 1000);

function rateGood() {
    console.log("Rating good");
}

function rateBad() {
    console.log("Rating bad");
}