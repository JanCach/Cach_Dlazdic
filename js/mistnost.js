const API = "https://cach.czchts.cz/api";
const API_KEY = "8vXE7RJTKmGmhWgPHrBZ"

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
//console.log(id)
const form = document.querySelector('#form')
const formName = document.querySelector('#form-name')
const roomName = document.querySelector('#name')
const width = document.querySelector('#width')
const length = document.querySelector('#length')
const heigth = document.querySelector('#height')
const joint = document.querySelector('#joint')
const floorTileBtn = document.querySelector('#floor-tile-btn')
const floorTile = document.querySelector('#floor-tile')
const floorTileImg = document.querySelector('#floor-tile-img')
const floorTileName = document.querySelector('#floor-tile-name')
const floorTileSize = document.querySelector('#floor-tile-size')
const floorTilePrice = document.querySelector('#floor-tile-price')
const floorTileId = document.querySelector('#floor-tile-id')

const wallTileBtn = document.querySelector('#wall-tile-btn')
const wallTile = document.querySelector('#wall-tile')
const wallTileImg = document.querySelector('#wall-tile-img')
const wallTileName = document.querySelector('#wall-tile-name')
const wallTileSize = document.querySelector('#wall-tile-size')
const wallTilePrice = document.querySelector('#wall-tile-price')
const wallTileId = document.querySelector('#wall-tile-id')

const errorList = document.querySelector("#error-list")
const dialog = document.querySelector('.dialog')
const dialogCloseBtn = document.querySelector('.dialog-close')
const divTiles = document.querySelector('.tiles')

let selectedType;

getTiles();

// const form = document.querySelector('#form')


if (id) {
    // editace existující misnosti
    formName.textContent = "Úprava existující místnosti"
    getRoom(id);
}
else {
    // přidání nové misnosti
    formName.textContent = "Vytvoření nové místnosti"
}

form.addEventListener('submit', saveRoom)

async function saveRoom(event) {
    event.preventDefault()
    const nameVal = roomName.value
    const widthVal = Number(width.value)
    const lengthVal = Number(length.value)
    const heightVal = Number(height.value)
    const jointVal = Number(joint.value)
    const floorId = Number(floorTileId.value)
    const wallId = Number(wallTileId.value)

    let errors = "" 

    if (nameVal == "") {
        errors += "<li>jméno místnost nesmí být prázdné</li>"
    }

    if (!(widthVal>0)) {
        errors += "<li>šířka místnosti musí být větší než nula</li>"
    }

    if (!(lengthVal>0)) {
        errors += "<li>délka místnosti musí být větší než nula</li>"
    }

    if (!(heightVal>0)) {
        errors += "<li>výška obkladu stěn musí být větší než nula</li>"
    }

    if (!(jointVal>0)) {
        errors += "<li>šířka spáry musí být větší než nula</li>"
    }

    if (floorId == 0 && wallId == 0) {
        errors += "<li>musíte vybrat dlažbu nebo obklad</li>"
    }

    errorList.innerHTML = errors

    if (errors) {
        return;
    }

    /* tady uložíme místnost do DB */

    const room = {
        name: nameVal,
        width: widthVal,
        length: lengthVal,
        height: heightVal,
        joint_width: jointVal,
        floor_tile_id: floorId,
        wall_tile_id: wallId,
    }

    if (id) {
        //úprava exitující místnosti
        const response = await fetch(API + "/rooms/" + id, {
            method: "put",
            headers: {
                "Content-Type" : "application/json",
                "x-api-key" : API_KEY
            },
            body: JSON.stringify(room)
        });
        console.log(response)
    }

    else {
        //vytvoření nové místnosti
        const response = await fetch(API + "/rooms", {
            method: "post",
            headers: {
                "Content-Type" : "application/json",
                "x-api-key" : API_KEY
            },
            body: JSON.stringify(room)
        });
        console.log(response)
    }
    //při úspěšném uložením přesměrujeme na stránku můj dům
    window.location.href = `mujdum.html`
}

floorTileBtn.addEventListener('click', ()=>{
    selectedType = "floor"
    openDialog();
})
dialogCloseBtn.addEventListener('click', closeDialog)

wallTileBtn.addEventListener('click', ()=>{
    selectedType = "wall"
    openDialog();
})

function openDialog() {
    dialog.style.display = "block"
}
function closeDialog() {
    dialog.style.display = "none"
}


async function getTiles() {
    const response = await fetch(API + "/tiles");
    const json = await response.json();
    showTiles(json)
}

function showTiles(tiles) {
    divTiles.innerHTML = "";

    tiles.forEach(tile => {
        const div = document.createElement('div')
        div.classList.add("tile")
        div.innerHTML = `
        <img src="${tile.image}" alt="" class="tile-img">
        <div class="tile-content">
            <h3 class="tile-name">${tile.name}</h3>
            <p class="tile-maker">${tile.manufacturer}</p>
            <p class = "tile-price">${tile.price} Kč za m<sup>2</sup></p>
        </div>
        <button class="button">Vybrat</button>
        `
        const btn = div.querySelector('.button')
        btn.addEventListener('click', ()=>{selectTile(tile)})
        divTiles.appendChild(div);
    });
}

function selectTile(tile) {
    if (selectedType == "floor") {
        floorTileImg.src = tile.image;
        floorTileName.textContent = tile.name;
        floorTileSize.textContent = `${tile.width} x ${tile.height} cm` ;
        floorTilePrice.innerHTML = `${tile.price} Kč/m<sup>2</sup>`;
        floorTileId.value = tile.id;
    }
    else {
        wallTileImg.src = tile.image;
        wallTileName.textContent = tile.name;
        wallTileSize.textContent = `${tile.width} x ${tile.height} cm` ;
        wallTilePrice.innerHTML = `${tile.price} Kč/m<sup>2</sup>`;
        wallTileId.value = tile.id;
    }
    closeDialog();
}

async function getRoom(id) {
    const response = await fetch(API + "/rooms/" + id);
    const json = await response.json();

    roomName.value = json.name
    width.value = json.width
    length.value = json.length
    height.value = json.height
    joint.value = json.joint_width

    floorTileId.value = json.floor_tile.id
    floorTileImg.src = json.floor_tile.image
    floorTileName.textContent = json.floor_tile.name
    floorTileSize.textContent = `${json.floor_tile.width} x ${json.floor_tile.height} cm`
    floorTilePrice.innerHTML = `${json.floor_tile.price} Kč/m<sup>2</sup>`;

    wallTileId.value = json.wall_tile.id
    wallTileImg.src = json.wall_tile.image
    wallTileName.textContent = json.wall_tile.name
    wallTileSize.textContent = `${json.wall_tile.width} x ${json.wall_tile.height} cm`
    wallTilePrice.innerHTML = `${json.wall_tile.price} Kč/m<sup>2</sup>`;
}