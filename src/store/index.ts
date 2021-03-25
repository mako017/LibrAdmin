import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import User from "./modules/user";
import Catalogue from "./modules/catalogue";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // settings,
    user: User,
    catalogue: Catalogue
  }
});
export default store;
export const user = getModule(User, store);
export const catalogue = getModule(Catalogue, store);
