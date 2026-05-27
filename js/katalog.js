const API = "https://cach.czchts.cz/api";

let currentRooms = [];

const divTiles = document.querySelector('.products')

async function getTiles() {
    const response = await fetch(API + "/tiles");
    console.log(response);
    const json = await response.json();
    console.log(json);
    currentRooms = json;
    showTiles(currentRooms)
}

function showTiles(tiles) {
    divTiles.innerHTML = "";

    tiles.forEach(tile => {
        const div = document.createElement('div')
        div.classList.add("product")
        div.innerHTML = `
        <img src="${tile.image}" alt="${tile.name}" class="product-img">
        <h3 class="product-name">${tile.name}</h3>
        <p class="product-maker">${tile.manufacturer}</p>
        <p class = "product-price">${tile.price} Kč za m<sup>2</sup></p>
        <a class="button" href = "detail.html?id=${tile.id}" >Detail</a>
        `
        divTiles.appendChild(div);
    });
}

getTiles();

/*
<div class="product">
    <img src="images/dlaszbitch.webp" alt="" class="product-img">
    <h3 class="product-name">Dlaždička</h3>
    <p class="product-maker">Dalžba s.r.o.</p>
    <p class = "product-price">9 999 Kč za m<sup>2</sup></p>
    <button class="button">Detail</button>
</div>
*/ 