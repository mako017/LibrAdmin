import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import User from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // settings,
    user: User
  }
});
export default store;
export const user = getModule(User, store);
