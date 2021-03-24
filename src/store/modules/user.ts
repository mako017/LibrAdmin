import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../";
import axios from "axios";
import { Ability } from "@casl/ability";
import { AbilityType } from "src/components/models";
import { PermissionManager, Rules } from "src/assets/ts/permissionManager";
import {
  signupCredentials,
  UserCredentials,
  userRoles
} from "src/components/models";

@Module({ name: "user", namespaced: true, store })
export default class User extends VuexModule {
  private readonly USER_API = "user.php";
  private readonly AUTH_API = "authentication.php";
  private _name: string | undefined = undefined;
  private _role: userRoles = "guest";
  private _loggedIn = false;
  private _ability = new Ability<AbilityType>();

  get name() {
    return this._name;
  }
  get role() {
    return this._role;
  }
  get isLoggedIn() {
    return this._loggedIn;
  }
  get ability() {
    return this._ability;
  }

  @Action
  updateAbilities() {
    const rules = PermissionManager.initPermissions(this._role);
    // this._ability.update(rules);
    // this.setAbility(rules);
    this.context.commit("setAbility", rules);
  }

  @Action
  loginUser(credentials: UserCredentials) {
    return axios.post(
      "http://localhost/libradmin/php/api/" + this.AUTH_API,
      JSON.stringify({
        call: "login",
        payload: credentials
      })
    );
  }

  @Action
  signUp(signupCred: signupCredentials) {
    return axios.post(
      "http://localhost/libradmin/php/api/" + this.USER_API,
      JSON.stringify({ payload: signupCred })
    );
  }

  @Mutation
  setName(name: string) {
    this._name = name;
  }
  @Mutation
  setRole(role: userRoles) {
    this._role = role;
  }
  @Mutation
  setLogin(status: boolean) {
    this._loggedIn = status;
  }
  @Mutation
  setAbility(rules: Rules) {
    this._ability.update(rules);
  }
}
