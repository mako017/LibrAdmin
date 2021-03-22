import { Ability } from "@casl/ability";

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Catalogue {
  items: Array<CatalogueItem>;
  hash: string;
}

export interface CatalogueItem {
  catalogueCounter?: number;
  itemID: string;
  abbreviation: string;
  title: string;
  authors: Array<string>;
  status: 0 | 1 | 2;
  //0 = avail.; 1 = out of stock; 2 = due
  currentlyWith?: string;
  due?: string;
  abstract?: string;
  category1?: Array<string>;
  category2?: Array<string>;
  category3?: Array<string>;
  category4?: Array<string>;
  image?: string;
  publisher?: string;
  language?: string;
}

export interface CategoryItem {
  title: string;
  level: number;
  children?: Array<CategoryItem>;
  parents?: Array<CategoryItem>;
}

export interface UserAccount {
  name: string;
  accessGroup: userRoles;
  token: string;
  reservedMedia?: Array<string>;
  borrowedMedia?: Array<string>;
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
}

export type AppAbility = Ability<AbilityType>;
export type Actions = "read" | "manage";
export type Subjects = "activeUser" | "allUsers" | "article" | "tests";
export type AbilityType = [Actions, Subjects];
