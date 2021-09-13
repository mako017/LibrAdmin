import {
  CatalogueItem,
  CatalogueStatus,
  UserAccount
} from "src/components/models";
import { catalogue, userControl } from "src/store";

export function getNamedUser(name: string): UserAccount | undefined {
  return userControl.users.find(user => user.name.trim() === name.trim());
}
export function getItemWithId(id: string): CatalogueItem | undefined {
  return catalogue.allItems.find(item => item.itemID.trim() === id.trim());
}

export function returnItem(item: CatalogueItem | string) {
  let updatedItem: CatalogueItem | undefined;
  if (typeof item === "string") {
    updatedItem = getItemWithId(item);
    console.log(updatedItem);
  } else updatedItem = item;

  if (updatedItem) {
    if (updatedItem.status === CatalogueStatus.withUserAndReserved) {
      updatedItem.status = CatalogueStatus.reserved;
    } else {
      updatedItem.status = CatalogueStatus.inStock;
    }
    updatedItem.currentlyWith = "";
    updatedItem.due = "";
    catalogue.updateItem(updatedItem);

    const user = getNamedUser(updatedItem.currentlyWith);
    if (user) {
      const borrowedIndex = user.borrowedMedia.findIndex(
        borrowedItem => borrowedItem === (updatedItem as CatalogueItem).itemID
      );
      if (borrowedIndex > -1) {
        user.borrowedMedia.splice(borrowedIndex, 1);
      }
      userControl.updateUser(user);
    }
  }
}
