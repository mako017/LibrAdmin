import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../";

@Module({ name: "files", namespaced: true, store })
export default class Files extends VuexModule {
  private _name = "";

  get name() {
    return this._name;
  }

  //   @Action
  //   readEvaplan(path: string) {
  //     const workbook = new exceljs.Workbook();
  //     fs.promises
  //       .readFile(path)
  //       .then(data => {
  //         workbook.xlsx
  //           .load(data.buffer)
  //           .then(() => {
  //             const ep = new EvaPlan(workbook.getWorksheet("Tabelle1"));
  //             this.setEvaplan(ep);
  //           })
  //           .catch(err => console.error(err));
  //       })
  //       .catch(err => console.error(err));
  //   }

  @Mutation
  setName(name: string) {
    this._name = name;
  }
}
