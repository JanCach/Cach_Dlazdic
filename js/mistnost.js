const API = "https://cach.czchts.cz/api";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const form = document.querySelector('#form')
const formName = document.querySelector('#form-name')
const roomName = document.querySelector('#name')
const width = document.querySelector('#width')
const lenght = document.querySelector('#lenght')
const height = document.querySelector('#height')
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

// const form = document.querySelector('#form')


if (id) {
    // editace existující misnosti
    formName.textContent = "Úprava existující místnosti"
}
else {
    // přidání nové misnosti
    formName.textContent = "Vytvoření nové místnosti"
}

form.addEventListener('submit', saveRoom)

function saveRoom(event) {
    event.preventDefault()
    const nameVal = roomName.value
    const widthVal = Number(width.value)
    const lenghtVal = Number(lenght.value)
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

    if (!(lenghtVal>0)) {
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
}

