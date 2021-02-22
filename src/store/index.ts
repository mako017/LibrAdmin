// import { store } from "quasar/wrappers";
// import Vuex from "vuex";

// // import example from './module-example';
// // import { ExampleStateInterface } from './module-example/state';
// import user from "./user";
// import { UserStateInterface } from "./user/state";

// /*
//  * If not building with SSR mode, you can
//  * directly export the Store instantiation
//  */

// export interface StateInterface {
//   // Define your own store structure, using submodules if needed
//   // example: ExampleStateInterface;
//   // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
//   user: UserStateInterface;
// }

// export default store(function({ Vue }) {
//   Vue.use(Vuex);

//   const Store = new Vuex.Store<StateInterface>({
//     modules: {
//       user
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: !!process.env.DEBUGGING
//   });

//   return Store;
// });
import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import Paths from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // settings,
    paths: Paths
  }
});
export default store;
export const paths = getModule(Paths, store);
