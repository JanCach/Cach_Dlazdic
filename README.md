# Cach_Dlazdic, E-shop s dlažbou do vašeho domu

Webová aplikace poskytující široký výběr dlažby pro vnitřní prostory všech typů nových i již postavených rodinných domů.

## Architektura a struktura projektu

### Struktura složek

```
/
├── images/
│   ├── default-tile.jpg
│   ├── logo.png
│   └── menu-background.jpg
│
├── scripts/
│   ├── detail.js
│   ├── katalog.js
│   ├── mistnost.js
│   ├── mujdum.js
│   └── script.js
│
├── .gitattributes <-- mam to sem psat?
├── detail.html
├── index.html
├── katalog.html
├── mistnost.html
├── mujdum.html
├── style.css
└── README.md
```

### Popis složek

#### `images`

Obsahuje všechny obrázky používané v aplikaci:

* Výchozí obrázek dlažby
* Logo aplikace
* Pozadí hlavního menu

#### `scripts`

Obsahuje JavaScriptové soubory jednotlivých stránek aplikace:

* `detail.js` – detail produktu
* `katalog.js` – katalog dlažeb
* `mistnost.js` – správa místností
* `mujdum.js` – konfigurace domu
* `script.js` – společné funkce aplikace

---

## API a datový model

Aplikace využívá REST API dostupné na adrese:

```
https://cach.czchts.cz/api
```

Každý JavaScriptový soubor si potřebná data načítá samostatně pomocí API.

### Dostupné endpointy

* `/rooms`
* `/products`

### Formát komunikace

API používá formát **JSON**.

---

# Rooms

Správa místností v domě.

## GET /rooms

Vrátí seznam všech místností.

### Odpověď

```json
[
  {
    "id": 1,
    "name": "Obývací pokoj" <-- vypadá takto?
  }
]
```

---

## GET /rooms/{id}

Vrátí detail jedné místnosti.

### Příklad

```
GET /rooms/1
```

### Odpověď

```json
{
  "id": 1,
  "name": "Obývací pokoj",
  "width": 5,
  "length": 6,
  "selectedTile": 3
}
```

---

## POST /rooms

Vytvoří novou místnost.

### Požadavek

```json
{
  "name": "Koupelna"
}
```

---

## PATCH /rooms/{id}

Upraví existující místnost.

### Možné využití

* přejmenování místnosti
* uložení rozměrů místnosti
* změna vybrané dlažby
* aktualizace dalších parametrů

### Požadavek

```json
{
  "name": "Nová koupelna",
  "width": 4,
  "length": 3,
  "selectedTile": 5
}
```

---

## DELETE /rooms/{id}

Smaže místnost.

### Příklad

```
DELETE /rooms/1
```

---

# Products

Správa produktů (dlažby, obklady, listely).

## GET /products

Vrátí seznam všech produktů.

### Podporované filtry

| Parametr | Popis          |
| -------- | -------------- |
| type     | Typ produktu   |
| color    | Barva produktu |

### Příklad

```
GET /products?type=dlazba&color=cervena
```

### Odpověď

```json
[
  {
    "id": 1,
    "name": "Červená dlažba",
    "type": "dlazba",
    "color": "cervena",
    "price": 599
  }
]
```

---

## GET /products/{id}

Vrátí detail jednoho produktu.

### Příklad

```
GET /products/1
```

### Odpověď

```json
{
  "id": 1,
  "name": "Červená dlažba",
  "type": "dlazba",
  "color": "cervena",
  "price": 599,
  "description": "Moderní keramická dlažba vhodná do interiéru."
}
```

---

# Použité technologie

* HTML5 <-- jsou verze potřeba? mám je správně?
* CSS3
* JavaScript (ES6)
* REST API
* JSON

# Autor

Ročníkový projekt – E-shop s dlažbou do vašeho domu.
