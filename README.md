# LibrAdmin

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General info

This project is intended to provide a simple, free administration software for smaller libraries. To this extent, it is possible to catalogize different media, make user and admin accounts, and track which media are currently borrowed by an user.

## Technologies

This project is created with:

- Vue.js
- Quasar
- Axios
- PHP
- MySQL

## Features

### Implemented

### Planned

#### Minimal requirements

- Catalogue (fields: title, author, year, categories, )
  - Frontend
  - Backend
  - UI to manage media
  - Sorting
  - Hierarchical categories (e.g. ability test > intelligence test > figural matrices test)
- User Administration
- Export media state (what is due / overdue / accessible)
- Reminders (mailto:)
- Backups (SQL & XLSX)
- History (per medium)

#### Nice to have

- User Interface for users (what is lent, when are deadlines)
- Barcodes / QR
- Cronjobs for auto reminders
- Reservation
- Installer
- Fulltext search (titel & abstract)
- Search Engine (synonyms etc.)

### Structures

#### Catalogue

`Catalogue` represents the whole catalogue with a list of [CatalogueItems](#catalogueitem) and a hash code used to compare local and online versions for updates of the `Catalogue`.

```typescript
export interface Catalogue {
  items: Array<CatalogueItem>;
  hash: string;
}
```

#### CatalogueItem

`CatalogueItem` represents the type for media of the catalogue. Currently it mandatorily consists of an ID, a title, a list of authors, and a status. However, it is also possible to enter a due date, the abstract of a medium, up to four levels of categories (with any number of categories per level), an image, a publisher and the language of the medium.

```typescript
export interface CatalogueItem {
  ID: string;
  title: string;
  authors: Array<string>;
  status: 0 | 1 | 2;
  //0 = avail.; 1 = out of stock; 2 = due
  due?: Date;
  abstract?: string;
  category1?: Array<number>;
  category2?: Array<number>;
  category3?: Array<number>;
  category4?: Array<number>;
  image?: string;
  publisher?: string;
  language?: string;
}
```

#### CategoryItem

`CategoryItem` represents the type of a single category. It is mandatory to enter a title to be displayed and the hierarchy level the category is supposed to be part of. Additionally children and parents of the category can be entered.

```typescript
export interface CategoryItem {
  title: string;
  level: number;
  children?: Array<CategoryItem>;
  parents?: Array<CategoryItem>;
}
```

#### UserAccount

`UserAccount` represents the type of local user information. It must have a name and an access group. It can further have a list of reserved and borrowed media (referenced by their IDs)

```typescript
export interface UserAccount {
  name: string;
  accessGroup: 0 | 1 | 2 | 3;
  //0 = guest; 1 = registered user; 2 = staff; 3 = admin
  reservedMedia?: Array<string>;
  borrowedMedia?: Array<string>;
}
```

## Status

The project is still under development and no release is available, yet.

## Inspiration

This project was developed in order to facilitate the process of catalogizing and to automate the administration of the Testothek at Saarland University, a small library that makes psychological tests available to local students.

## Contact

Created by [Marco Koch](mailto:marco.koch@uni-saarland.de?subject=[GitHub]%20LibrAdmin)
