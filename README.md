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
## Popis fungování aplikace



---

# Dokumentace API

Toto API slouží ke správě místností a dlaždic pro plánování pokládky obkladů.

**Základní URL:** `https://cach.czcht.cz/api`
**Formát dat:** JSON
**Autentizace:** Klíč v hlavičce `x-api-key` (vyžadováno pro zápis)

---

## Autentizace

Všechny endpointy, které mění data (POST, PUT, DELETE), vyžadují API klíč v hlavičce požadavku:

```
x-api-key: <api-klíč>
```

GET požadavky autentizaci nevyžadují.

**Chyba při neplatném nebo chybějícím klíči** (HTTP 401):

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing API key."
}
```

---


## Endpointy

### Dlaždice (Tiles)

Dlaždice reprezentují typy obkladů, které lze přiřadit k místnostem.

---

#### `GET /tiles`

Vrátí seznam všech dlaždic.

**Příklad odpovědi** (HTTP 200):

```json
[
  {
    "id": 1,
    "name": "Bílá keramika",
    "manufacturer": "Rako",
    "material": "keramika",
    "width": 30,
    "height": 30,
    "thickness": 8,
    "color": "bílá",
    "description": "Klasická bílá keramická dlaždice vhodná do koupelny.",
    "image": "https://cach.czchts.cz/images/bila-keramika.jpg",
    "package_size": 1.44,
    "price": 250.50
  },
  {
    "id": 2,
    "name": "Černý mramor",
    "manufacturer": "Italstone",
    "material": "mramor",
    "width": 50,
    "height": 50,
    "thickness": 10,
    "color": "černá",
    "description": null,
    "image": "https://cach.czchts.cz/images/cerny-mramor.jpg",
    "package_size": 2.00,
    "price": 450.00
  }
]
```

| Pole | Typ | Popis |
|------|-----|-------|
| `id` | integer | Unikátní identifikátor |
| `name` | string | Název dlaždice |
| `manufacturer` | string | Výrobce |
| `material` | string | Materiál (např. keramika, mramor) |
| `width` | integer | Šířka v mm |
| `height` | integer | Výška (délka) v mm |
| `thickness` | integer | Tloušťka v mm |
| `color` | string | Barva |
| `description` | string \| null | Popis dlaždice |
| `image` | string | Plná URL adresa obrázku |
| `package_size` | float | Velikost balení v m² |
| `price` | float | Cena za m² |

---

#### `GET /tiles/{id}`

Vrátí detail jedné dlaždice podle ID.

**URL parametry:**

| Parametr | Typ | Popis |
|----------|-----|-------|
| `id` | integer | ID dlaždice |

**Příklad odpovědi** (HTTP 200):

```json
{
  "id": 1,
  "name": "Bílá keramika",
  "manufacturer": "Rako",
  "material": "keramika",
  "width": 30,
  "height": 30,
  "thickness": 8,
  "color": "bílá",
  "description": "Klasická bílá keramická dlaždice vhodná do koupelny.",
  "image": "https://cach.czchts.cz/images/bila-keramika.jpg",
  "package_size": 1.44,
  "price": 250.50
}
```

**Chyba — dlaždice neexistuje** (HTTP 404):

```json
{
  "error": "Not Found",
  "message": "Tile with id 999 does not exist."
}
```

---

### Místnosti (Rooms)

Místnosti reprezentují prostory, ke kterým lze přiřadit dlaždice na podlahu a/nebo na zeď.

---

#### `GET /rooms`

Vrátí seznam všech místností včetně přiřazených dlaždic.

**Příklad odpovědi** (HTTP 200):

```json
[
  {
    "id": 1,
    "name": "Koupelna",
    "width": 200,
    "length": 150,
    "height": 250,
    "joint_width": 3,
    "floor_tile": {
      "id": 1,
      "name": "Bílá keramika",
      "manufacturer": "Rako",
      "material": "keramika",
      "width": 30,
      "height": 30,
      "thickness": 8,
      "color": "bílá",
      "description": "Klasická bílá keramická dlaždice vhodná do koupelny.",
      "image": "https://cach.czchts.cz/images/bila-keramika.jpg",
      "package_size": 1.44,
      "price": 250.50
    },
    "wall_tile": {
      "id": 2,
      "name": "Černý mramor",
      "manufacturer": "Italstone",
      "material": "mramor",
      "width": 50,
      "height": 50,
      "thickness": 10,
      "color": "černá",
      "description": null,
      "image": "https://cach.czchts.cz/images/cerny-mramor.jpg",
      "package_size": 2.00,
      "price": 450.00
    }
  },
  {
    "id": 2,
    "name": "Kuchyně",
    "width": 300,
    "length": 250,
    "height": 280,
    "joint_width": 2,
    "floor_tile": {
      "id": 1,
      "name": "Bílá keramika",
      "manufacturer": "Rako",
      "material": "keramika",
      "width": 30,
      "height": 30,
      "thickness": 8,
      "color": "bílá",
      "description": "Klasická bílá keramická dlaždice vhodná do koupelny.",
      "image": "https://cach.czchts.cz/images/bila-keramika.jpg",
      "package_size": 1.44,
      "price": 250.50
    },
    "wall_tile": null
  }
]
```

| Pole | Typ | Popis |
|------|-----|-------|
| `id` | integer | Unikátní identifikátor |
| `name` | string | Název místnosti |
| `width` | integer | Šířka místnosti v cm |
| `length` | integer | Délka místnosti v cm |
| `height` | integer | Výška místnosti v cm |
| `joint_width` | integer \| null | Šířka spár mezi dlaždicemi v mm |
| `floor_tile` | object \| null | Dlaždice na podlaze (null, pokud není přiřazena) |
| `wall_tile` | object \| null | Dlaždice na zdi (null, pokud není přiřazena) |

---

#### `GET /rooms/{id}`

Vrátí detail jedné místnosti podle ID.

**URL parametry:**

| Parametr | Typ | Popis |
|----------|-----|-------|
| `id` | integer | ID místnosti |

**Příklad odpovědi** (HTTP 200):

Stejná struktura jako jeden prvek v seznamu z `GET /rooms`.

**Chyba — místnost neexistuje** (HTTP 404):

```json
{
  "error": "Not Found",
  "message": "Room with id 999 does not exist."
}
```

---

#### `POST /rooms`

Vytvoří novou místnost. Vyžaduje autentizaci.

**Tělo požadavku:**

```json
{
  "name": "Obývací pokoj",
  "width": 400,
  "length": 500,
  "height": 300,
  "joint_width": 2,
  "floor_tile_id": 1,
  "wall_tile_id": null
}
```

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | ano | Název místnosti |
| `width` | integer | ano | Šířka místnosti v cm |
| `length` | integer | ano | Délka místnosti v cm |
| `height` | integer | ano | Výška místnosti v cm |
| `joint_width` | integer \| null | ano | Šířka spár v mm |
| `floor_tile_id` | integer \| null | podmíněně | ID dlaždice na podlahu |
| `wall_tile_id` | integer \| null | podmíněně | ID dlaždice na zeď |

> Alespoň jedno z polí `floor_tile_id` nebo `wall_tile_id` musí být vyplněno.

**Příklad odpovědi** (HTTP 201):

Stejná struktura jako při `GET /rooms/{id}`.

**Chyba — chybná nebo chybějící data** (HTTP 422):

```json
{
  "error": "Unprocessable Entity",
  "fields": {
    "name": "Field \"name\" is required.",
    "floor_tile_id": "At least one of \"floor_tile_id\" or \"wall_tile_id\" must be provided."
  }
}
```

Pole `fields` obsahuje seznam validačních chyb — klíč je název pole, hodnota je popis chyby.

---

#### `PUT /rooms/{id}`

Aktualizuje existující místnost. Vyžaduje autentizaci.

**URL parametry:**

| Parametr | Typ | Popis |
|----------|-----|-------|
| `id` | integer | ID místnosti |

**Tělo požadavku:**

Stejná struktura jako u `POST /rooms`.

**Příklad odpovědi** (HTTP 200):

Stejná struktura jako při `GET /rooms/{id}`.

**Chyba — místnost neexistuje** (HTTP 404):

```json
{
  "error": "Not Found",
  "message": "Room with id 999 does not exist."
}
```

**Chyba — chybná nebo chybějící data** (HTTP 422):

Stejná struktura jako u `POST /rooms`.

---

#### `DELETE /rooms/{id}`

Smaže místnost. Vyžaduje autentizaci.

**URL parametry:**

| Parametr | Typ | Popis |
|----------|-----|-------|
| `id` | integer | ID místnosti |

**Odpověď** (HTTP 204):

Prázdné tělo odpovědi.

**Chyba — místnost neexistuje** (HTTP 404):

```json
{
  "error": "Not Found",
  "message": "Room with id 999 does not exist."
}
```

---

## Přehled HTTP stavových kódů

| Kód | Popis |
|-----|-------|
| 200 | Úspěch — GET nebo PUT |
| 201 | Zdroj byl vytvořen — POST |
| 204 | Úspěch bez obsahu — DELETE |
| 401 | Chybějící nebo neplatný API klíč |
| 404 | Zdroj nebyl nalezen |
| 422 | Validační chyba — chybná nebo chybějící pole v požadavku |
