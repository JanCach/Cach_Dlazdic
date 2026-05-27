/*
    DOGS API - podklady ke cvičení

    Dokumentace API:
    https://dogsapi.rolecek.cz/

    Základní adresa API:
    https://dogsapi.rolecek.cz/api

    Dostupné endpointy:
    GET    /dogs
        Vrátí seznam všech psů.

    GET    /dogs/{id}
        Vrátí detail jednoho psa podle ID.

    POST   /dogs
        Vytvoří nového psa.
        Vyžaduje hlavičku x-api-key.

    PUT    /dogs/{id}
        Přepíše celý existující záznam psa.
        Vyžaduje hlavičku x-api-key.

    PATCH  /dogs/{id}
        Upraví jen vybraná pole existujícího záznamu.
        Vyžaduje hlavičku x-api-key.

    DELETE /dogs/{id}
        Smaže záznam psa.
        Vyžaduje hlavičku x-api-key.

    Struktura dat:
    - id
    - name
    - age
    - gender (M nebo F)

    Chybová odpověď:
    API při chybě vrací JSON objekt ve tvaru:
    { "error": "..." }

    Obsah cvičení:
    Cílem je procvičit práci s fetch a REST API v čistém JavaScriptu.
    Student má postupně doplnit:
    - načtení všech psů do tabulky po otevření stránky,
    - uložení nového psa do API při vyplnění a odeslání formuláře,
    - načtení záznamu do formuláře po kliknutí na "Upravit",
    - smazání záznamu po kliknutí na "Smazat",
    - vyhledávání podle jména,
    - filtrování podle pohlaví,
    - zobrazení všech záznamů po kliknutí na "Zobrazit vše".
*/

const API_URL = "https://dogsapi.rolecek.cz/api";
const API_KEY = "muj-super-tajny-klic-12345";

const searchNameInput = document.querySelector("#search-name");
const searchNameButton = document.querySelector("#search-name-button");

const searchGenderSelect = document.querySelector("#search-gender");
const searchGenderButton = document.querySelector("#search-gender-button");

const showAllButton = document.querySelector("#show-all-button");

const dogForm = document.querySelector("#dog-form");
const dogIdInput = document.querySelector("#dog-id");
const dogNameInput = document.querySelector("#dog-name");
const dogAgeInput = document.querySelector("#dog-age");
const dogGenderSelect = document.querySelector("#dog-gender");
const dogFormSubmitButton = document.querySelector("#dog-form-submit-button");

const dogsTableBody = document.querySelector("#dogs-table-body");

let allDogs = [];


searchNameButton.addEventListener("click", filterDogsByName);
searchGenderButton.addEventListener("click", filterDogsByGender);
showAllButton.addEventListener("click", loadDogs);
dogForm.addEventListener("submit", saveDog);

function showDogs(dogs) {
    dogsTableBody.innerHTML = "";

    dogs.forEach(dog => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${dog.id}</td>
        <td>${dog.name}</td>
        <td>${dog.age}</td>
        <td>${dog.gender=='M'?'Pes':'Fena'}</td>
        <td class="actions-cell">
            <button id="upravit" type="button" class="table-action-button">Upravit</button>
            <button id="smazat" type="button" class="table-action-button table-action-button-danger">Smazat</button>
        </td>
        `
        tr.querySelector('#upravit')
        .addEventListener('click', () => {editDog(dog)})

        tr.querySelector('#smazat')
        .addEventListener('click', () => {deleteDog(dog.id)})
        dogsTableBody.appendChild(tr)
    });
}

async function loadDogs() {
    const response = await fetch(API_URL + '/dogs');
    const data = await response.json();

    allDogs = data;

    showDogs(allDogs);

    console.log(data);
}

async function saveDog(event) {
    // Student zde naprogramuje odeslání formuláře.
    // Podle toho, jestli je vyplněné ID, vytvoří nového psa
    // nebo upraví existujícího psa pomocí správného HTTP požadavku.

    event.preventDefault()

    const id = dogIdInput.value ? Number( dogIdInput.value ) : null;
    const jmeno = dogNameInput.value
    const vek = Number(dogAgeInput.value)
    const pohlavi = dogGenderSelect.value

    const newDog = {
        name: jmeno,
        age: vek,
        gender: pohlavi
    }

    let fetchURL = API_URL + '/dogs';
    let fetchMethod = 'POST';

    if (id !== null) {
        fetchURL = API_URL + '/dogs/' + id;
        fetchMethod = 'PUT';
    }

    const response = await fetch(fetchURL, {
        method: fetchMethod,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify(newDog),
    })

    const data = await response.json()
    console.log(data)

    dogIdInput.value = "";
    dogNameInput.value= "";
    dogAgeInput.value= "";
    dogGenderSelect.value= "";

    loadDogs()
}

async function deleteDog(dogId) {
    // Student zde naprogramuje smazání psa podle ID
    // pomocí DELETE požadavku na API
    // a po úspěchu znovu načte nebo překreslí tabulku.

    if (!confirm("Chceš opravdu smazat psa?"))
    {
        return
    }
    
    console.log("mazani", dogId)

    const response = await fetch(API_URL + '/dogs/' + dogId, {
    method: "delete",
    headers: {"x-api-key": API_KEY}
    });
    console.log(response)
    loadDogs()
}

function filterDogsByName() {
    // Student zde naprogramuje filtrování psů podle jména.
    // Může použít data uložená v currentDogs
    // nebo zavolat API podle zadání cvičení.

    const jmeno = searchNameInput.value
    if (!jmeno)
    {
        showDogs(allDogs)
        return;
    }

    const selection = allDogs.filter(dog => dog.name.toLowerCase().includes(jmeno.toLowerCase()))
    showDogs(selection)
}

function filterDogsByGender() {
    // Student zde naprogramuje filtrování psů podle pohlaví.
    // Může použít data uložená v currentDogs
    // nebo zavolat API podle zadání cvičení.

    const pohlavi = searchGenderSelect.value
    if (!pohlavi)
    {
        showDogs(allDogs)
        return;
    }
    /*
    let selection = []

    allDogs.forEach((dog) => {
        if (dog.gender === pohlavi)
        {
            selection.push(dog)
        }
    })*/

    const selection = allDogs.filter(dog => dog.gender === pohlavi)
    
    showDogs(selection)
}

function editDog(dog) {
    dogIdInput.value = dog.id;
    dogNameInput.value = dog.name;
    dogAgeInput.value = dog.age;
    dogGenderSelect.value = dog.gender;
}

document.addEventListener("DOMContentLoaded", function () {
    // Student zde může spustit inicializační kód po načtení HTML.
    // Typicky například první načtení psů do tabulky.

    loadDogs();
});
