import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";
import { AbilityType } from "boot/casl";

type AppAbility = Ability<AbilityType>;
type userRoles = "admin" | "mod" | "user" | "guest";

const ability = Ability as AbilityClass<AppAbility>;
const builder = new AbilityBuilder(ability);

export class PermissionManager {
  static initPermissions(role: userRoles) {
    switch (role) {
      case "admin":
        builder.can("read", "activeUser");
        builder.can("update", "activeUser");
        builder.can("delete", "activeUser");
        builder.can("create", "allUsers");
        builder.can("read", "allUsers");
        builder.can("update", "allUsers");
        builder.can("delete", "allUsers");
        builder.can("create", "tests");
        builder.can("read", "tests");
        builder.can("update", "tests");
        builder.can("delete", "tests");
        break;
      case "mod":
        builder.can("create", "allUsers");
        builder.can("read", "allUsers");
        builder.can("update", "allUsers");
        builder.can("delete", "allUsers");
        builder.can("create", "tests");
        builder.can("read", "tests");
        builder.can("update", "tests");
        builder.can("delete", "tests");
        break;
      case "user":
        builder.can("read", "activeUser");
        builder.can("update", "activeUser");
        builder.can("delete", "activeUser");
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
