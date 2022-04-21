const expand = Array.from(document.getElementsByClassName("expand"));

expand.forEach(card => {
    card.addEventListener("click", function handleClick(event) {
        let moreInfo = card.parentNode;
        moreInfo = moreInfo.nextElementSibling;
        if (moreInfo != null) {
            moreInfo.hidden = false;
            card.hidden = true;
        }
    });
});

const collapse = Array.from(document.getElementsByClassName("collapse"));

collapse.forEach(card => {
    card.addEventListener("click", function handleClick(event) {
        let moreInfo = card.parentNode;
        let expand = moreInfo.previousElementSibling.firstElementChild;
        moreInfo.hidden = true;
        expand.hidden = false;
    });
});
