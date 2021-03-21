import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";
import { userRoles, AppAbility } from "components/models";

const ability = Ability as AbilityClass<AppAbility>;
const builder = new AbilityBuilder(ability);

export class PermissionManager {
  static initPermissions(role: userRoles) {
    switch (role) {
      case "admin":
        builder.can("manage", "activeUser");
        builder.can("read", "activeUser");
        builder.can("manage", "allUsers");
        builder.can("read", "allUsers");
        builder.can("manage", "tests");
        builder.can("read", "tests");

        break;
      case "mod":
        builder.can("manage", "allUsers");
        builder.can("read", "allUsers");
        builder.can("manage", "tests");
        builder.can("read", "tests");
        break;
      case "user":
        builder.can("read", "activeUser");
        builder.can("manage", "activeUser");
        builder.can("read", "tests");
        break;
      case "guest":
        builder.can("read", "tests");
        break;

      default:
        break;
    }
    return builder.rules;
  }
}
