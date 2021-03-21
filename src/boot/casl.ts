import { boot } from "quasar/wrappers";
import { abilitiesPlugin } from "@casl/vue";
import { Ability } from "@casl/ability";
import { AbilityType } from "src/components/models";

export const ability = new Ability<AbilityType>();

export default boot(({ Vue }) => {
  Vue.use(abilitiesPlugin, ability);
});
