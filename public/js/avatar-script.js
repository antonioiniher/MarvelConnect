let timestamp = "1681802982683";
let apiKey = "365228bc85ed39b3f177f3c66a89e36a";
let hashValue = "d82d67528f926be55e17cc7bbaa06484";
let showContainer = document.getElementById("show-container");
let hiddenInput = document.getElementById("hidden-input");

document.querySelector('#imageUrl').onkeyup = evt => {
    const { value: characterName } = evt.target
    axios
        .get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${characterName}`)
        .then(response => printCharacterInfo(response.data.data.results))
        .catch(err => console.log(err))
}

function printCharacterInfo(info) {
    const { extension, path } = info[0].thumbnail
    const url = `${path}.${extension}`

    showContainer.innerHTML = `<div class="card" style="width: 6rem; border-radius: 50%;">
    <div class="container-character-image">
    <img src="${url}" style="width: 100%; border-radius: 50%;"/></div>
    </div>`;

    hiddenInput.value = `${url}`
}