const data = null;
let posts = document.getElementById("posts");
const images = [];
let followers = 0;

if (images.length <= 0) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            //console.log(this.responseText)
           let media = JSON.parse(this.responseText);
           console.log(media);

            followers = media.edge_followed_by.count;
            document.getElementById("followers").innerText = "Followers: " + followers;

            media = media.edge_owner_to_timeline_media.edges;

            for (let i = 0; i < media.length; i++) {
                let display = media[i].node;
                images.push('<img src="/proxy?url=' + display.display_url + '" width="' + display.dimensions.width + '" height="' + display.dimensions.height + '">');
            }
            console.log(Math.random() * images.length);
            posts.innerHTML = images[Math.floor(Math.random() * images.length)];
        }
    });

    xhr.open("GET", "https://instagram130.p.rapidapi.com/account-info?username=dango.ploof");
    xhr.setRequestHeader("X-RapidAPI-Host", "instagram130.p.rapidapi.com");
    xhr.setRequestHeader("X-RapidAPI-Key", "a1025f1cc8msh398299ebbdaabf1p1201f0jsn1dfc8198cf36");

    xhr.send(data);
} else {
    posts.innerHTML = images[Math.random() * images.length];
}
