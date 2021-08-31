import { CatalogueItem, UserAccount } from "src/components/models";

export function emptyCatalogueItem(): CatalogueItem {
  return {
    catalogueCounter: -1,
    itemID: "",
    abbreviation: "",
    title: "",
    authors: "",
    status: 0,
    currentlyWith: "",
    due: "",
    abstract: "",
    category1: "",
    category2: "",
    category3: "",
    category4: "",
    image: "",
    publisher: "",
    language: ""
  };
}

export function emptyUser(): UserAccount {
  return {
    email: "",
    name: "",
    role: "guest",
    borrowedMedia: [],
    reservedMedia: []
  };
}
