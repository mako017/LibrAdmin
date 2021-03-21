import { boot } from "quasar/wrappers";
import { abilitiesPlugin } from "@casl/vue";
import { Ability } from "@casl/ability";

type Actions = "create" | "read" | "update" | "delete";
type Subjects = "activeUser" | "allUsers" | "article" | "tests";
export type AbilityType = [Actions, Subjects];

export const ability = new Ability<AbilityType>();

export default boot(({ Vue }) => {
  Vue.use(abilitiesPlugin, ability);
});
