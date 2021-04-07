import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import User from "./modules/user";
import Catalogue from "./modules/catalogue";
import UserControl from "./modules/userControl";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // settings,
    user: User,
    userControl: UserControl,
    catalogue: Catalogue
  }
});
export default store;
export const user = getModule(User, store);
export const catalogue = getModule(Catalogue, store);
export const userControl = getModule(UserControl, store);
