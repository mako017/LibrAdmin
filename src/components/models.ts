import { Ability } from "@casl/ability";

export type EssentialLinks = {
  title: string;
  caption: string;
  icon: string;
  link: string;
  ability?: {
    action: Actions;
    subject: Subjects;
  };
};

export interface Catalogue {
  items: Array<CatalogueItem>;
  hash: string;
}

export enum CatalogueStatus {
  inStock,
  withUser,
  reserved,
  withUserAndReserved,
  missing
}

export enum QrActions {
  return,
  reserve,
  borrow,
  inspect
}

export interface CatalogueItem {
  catalogueCounter: number;
  itemID: string;
  abbreviation: string;
  title: string;
  authors: string;
  status: CatalogueStatus;
  currentlyWith: string;
  due: string;
  abstract: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  image: string;
  publisher: string;
  language: string;
}

export interface CategoryItem {
  title: string;
  level: number;
  children?: Array<CategoryItem>;
  parents?: Array<CategoryItem>;
}

export interface UserAccount {
  name: string;
  email: string;
  role: userRoles;
  // token: string;
  reservedMedia: Array<string>;
  borrowedMedia: Array<string>;
}

export type userRoles = "admin" | "mod" | "user" | "guest";

export interface UserCredentials {
  username: string;
  password: string;
  rememberMe: "true" | "false";
}

export interface signupCredentials {
  username: string;
  password: string;
  email: string;
}

export interface serverResponse {
  call: string;
  payload: unknown;
}

export interface ServerResponseUser {
  name: string;
  role: userRoles;
  email: string;
}

export type AppAbility = Ability<AbilityType>;
export type Actions = "read" | "manage" | "delete";
export type Subjects =
  | "activeUser"
  | "allUsers"
  | "articles"
  | "tests"
  | "roles";
export type AbilityType = [Actions, Subjects];
export type TargetList = "borrow" | "reserve" | "remove";
export type ItemChange = [CatalogueItem, TargetList];
