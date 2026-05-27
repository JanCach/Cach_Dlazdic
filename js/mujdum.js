const API = "https://cach.czchts.cz/api";
const API_KEY = "8vXE7RJTKmGmhWgPHrBZ"
const roomsTable = document.querySelector('.table') 

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

    rooms.forEach(room => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${room.name}</td>
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