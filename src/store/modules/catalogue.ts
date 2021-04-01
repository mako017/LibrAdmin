import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "..";
import axios from "axios";
import { CatalogueItem, serverResponse } from "src/components/models";

@Module({ name: "catalogue", namespaced: true, store })
export default class Catalogue extends VuexModule {
  private readonly API_PATH = process.env.API_BASE_URL as string;
  private readonly API = "catalogue.php";
  private _allItems: CatalogueItem[] = [];

  get allItems() {
    return this._allItems;
  }

  @Action
  queryCatalogue() {
    axios
      .get(this.API_PATH + this.API)
      .then(response => {
        const data = response.data as serverResponse;
        if (data.call === "catalogueLoaded") {
          this.setCatalogue(data.payload as CatalogueItem[]);
        }
      })
      .catch(err => console.error(err));
  }

  @Mutation
  setCatalogue(newCatalogue: CatalogueItem[]) {
    this._allItems = newCatalogue;
  }
}
