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
  ID: string;
  title: string;
  authors: Array<string>;
  status: 0|1|2;
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

export interface CategoryItem {
  title: string;
  level: number;
  children?: Array<CategoryItem>;
  parents?: Array<CategoryItem>;
}

export interface UserAccount {
  name: string;
  accessGroup: 0 | 1 | 2 | 3;
  token: string;
  //0 = guest; 1 = registered user; 2 = staff; 3 = admin
  reservedMedia?: Array<string>;
  borrowedMedia?: Array<string>;
}