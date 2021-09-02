import {
  AbilityBuilder,
  Ability,
  AbilityClass,
  SubjectRawRule,
  ExtractSubjectType,
  MongoQuery
} from "@casl/ability";
import { AnyObject } from "@casl/ability/dist/types/types";
import { userRoles, AppAbility, Actions, Subjects } from "components/models";

const ability = Ability as AbilityClass<AppAbility>;
const builder = new AbilityBuilder(ability);

export type Rules = SubjectRawRule<
  Actions,
  ExtractSubjectType<Subjects>,
  MongoQuery<AnyObject>
>[];

export class PermissionManager {
  static initPermissions(role: userRoles): Rules {
    switch (role) {
      case "admin":
        builder.can("manage", "activeUser");
        builder.can("read", "activeUser");
        builder.can("manage", "allUsers");
        builder.can("read", "allUsers");
        builder.can("manage", "roles");
        builder.can("delete", "tests");
        builder.can("manage", "tests");
        builder.can("read", "tests");
        builder.can("manage", "articles");
        builder.can("read", "articles");

        break;
      case "mod":
        builder.can("manage", "activeUser");
        builder.can("read", "activeUser");
        builder.can("manage", "allUsers");
        builder.can("read", "allUsers");
        builder.can("manage", "tests");
        builder.can("read", "tests");
        builder.can("manage", "articles");
        builder.can("read", "articles");
        break;
      case "user":
        builder.can("read", "activeUser");
        builder.can("manage", "activeUser");
        builder.can("read", "tests");
        builder.can("read", "articles");
        break;
      case "guest":
        builder.can("read", "tests");
        builder.can("read", "articles");
        break;

      default:
        break;
    }
    return builder.rules;
  }
}
