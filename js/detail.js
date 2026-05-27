const API = "https://cach.czchts.cz/api";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const detailImg = document.querySelector('.detail-img');
const detailName = document.querySelector('.detail-name');
const detailMaker = document.querySelector('.detail-maker');
const detailPrice = document.querySelector('.detail-price span');
const detailPackage = document.querySelector('.detail-package span');
const detailDescription = document.querySelector('.detail-description');


let currentTile = {};

async function getTile(id) {
    const response = await fetch(API + `/tiles/${id}`);
    console.log(response);
    const json = await response.json();
    console.log(json);
    currentTile = json;
    showTile(currentTile)
}

function showTile(tile) {

    detailImg.src = tile.image;
    detailImg.alt = tile.name;
    detailName.textContent = tile.name;
    detailMaker.textContent = tile.manufacturer;
    detailPrice.textContent = tile.price;
    detailPackage.textContent = tile.package_size;
    detailDescription.textContent = tile.description;

}

getTile(id)

/* <div class="detail">
            <img src="images/dlaszbitch.webp" alt="obrázek" class="detail-img">
            <div class="detail-content">
                <h1 class="detail-name">Dlaždička</h1>
                <p class= "detail-maker">Dalžba s.r.o.</p>
                <p class = "detail-price">9 999 Kč za m<sup>2</sup></p>
                <p class="detail-package">Balení obsahuje 5 m<sup>2</sup></p>
                <p class="detail-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore pariatur ex, quidem asperiores ipsa commodi libero incidunt. Deserunt tenetur dolore quia esse totam exercitationem delectus? Nisi ratione blanditiis incidunt quam.</p>
            </div>
        </div>
         */