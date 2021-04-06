import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "..";
import axios, { AxiosError } from "axios";
import { CatalogueItem, serverResponse } from "src/components/models";

interface updateCommit {
  updatedItem: CatalogueItem;
  pos: number;
}

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

  @Action
  updateItem(updatedItem: CatalogueItem) {
    const pos = this._allItems.findIndex(
      item => item.catalogueCounter === updatedItem.catalogueCounter
    );
    if (pos !== -1) {
      this.setCatalogueItem({ updatedItem, pos });
      axios
        .put(
          this.API_PATH + this.API,
          encodeURIComponent(
            JSON.stringify({ call: "", payload: updatedItem })
          ),
          { method: "PUT" }
        )
        .catch((err: AxiosError) => {
          if (err.response?.status === 403) {
            this.queryCatalogue();
            alert(
              "It seems you don't have the required permission to do this."
            );
          }
        });
    }
  }

  @Mutation
  setCatalogue(newCatalogue: CatalogueItem[]) {
    this._allItems = newCatalogue;
  }
  @Mutation
  setCatalogueItem({ updatedItem, pos }: updateCommit) {
    this._allItems.splice(pos, 1, updatedItem);
  }
}
