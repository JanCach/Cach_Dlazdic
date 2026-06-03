const API = "https://cach.czchts.cz/api";
const API_KEY = "8vXE7RJTKmGmhWgPHrBZ"
const roomsTable = document.querySelector('.table tbody')
const totalPrice = document.querySelector('#totalPrice')

let currentRooms = [];

async function getRooms() {
    const response = await fetch(API + "/rooms");
    console.log(response);
    const json = await response.json();
    console.log(json);
    currentRooms = json;
    showRooms(currentRooms)
}

function showRooms(rooms) {
    roomsTable.innerHTML = "";
    let sumPrice = 0;
    rooms.forEach(room => {
        let floorArea = (room.width/100) * (room.length/100)
        let wallArea = (room.width/100) * (room.height/100) * 2 + (room.length/100) * (room.height/100) * 2

        let floorPrice = room.floor_tile == null ? null : floorArea * room.floor_tile.price
        let wallPrice = room.wall_tile == null ? null : wallArea * room.wall_tile.price

        sumPrice += floorPrice + wallPrice


        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${room.name}</td>
        <td>
            ${floorArea} m<sup>2</sup> <br>
            ${floorPrice==null?"nevybráno":`${floorPrice.toFixed(2)} Kč`}
        </td>
        <td>
            ${wallArea} m<sup>2</sup> <br>
            ${wallPrice==null?"nevybráno":`${wallPrice.toFixed(2)} Kč`}
        </td>
        <td> 
            <button class="button edit"><i class="fa-solid fa-pen-to-square"></i> Upravit</button>
            <button class="button delete"><i class="fa-solid fa-trash"></i> Smazat</button> 
        </td>
        `
        tr.querySelector('.edit')
        .addEventListener('click', () => {editRoom(room.id)})

        tr.querySelector('.delete')
        .addEventListener('click', () => {deleteRoom(room.id)})
        roomsTable.appendChild(tr)
    });
    if(sumPrice != 0) {
        totalPrice.textContent = "celková cena zakázky: " + sumPrice.toFixed(2) + " Kč"
    }
}

function editRoom(id) {
    window.location.href = `mistnost.html?id=${id}`
}

async function deleteRoom(id) {
    if(!confirm("Opravdu chcete tutomístnost smazat?")) {
        return;
    }

    console.log("mazani", id)

    const response = await fetch(API + '/rooms/' + id, {
    method: "delete",
    headers: {"x-api-key": API_KEY}
    });
    console.log(response)
    getRooms();
}

getRooms();