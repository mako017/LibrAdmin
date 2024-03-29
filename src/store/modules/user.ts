import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../";
import axios from "axios";
import { Ability } from "@casl/ability";
import { AbilityType, ServerResponseUser } from "src/components/models";
import { PermissionManager, Rules } from "src/assets/ts/permissionManager";
import {
  signupCredentials,
  serverResponse,
  UserCredentials,
  userRoles
} from "src/components/models";

@Module({ name: "user", namespaced: true, store })
export default class User extends VuexModule {
  private readonly API_PATH = process.env.API_BASE_URL as string;
  private readonly USER_API = "user.php";
  private readonly AUTH_API = "authentication.php";
  private _name: string | undefined = undefined;
  private _email: string | undefined = undefined;
  private _role: userRoles = "guest";
  private _loggedIn = false;
  private _ability = new Ability<AbilityType>();

  get name() {
    return this._name;
  }
  get email() {
    return this._email;
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
  attemptRemember() {
    axios
      .post(
        this.API_PATH + this.AUTH_API,
        encodeURIComponent(
          JSON.stringify({
            call: "rememberMe"
          })
        )
      )
      .then(response => {
        const data = response.data as serverResponse;
        if (data.call === "login") {
          const payload = data.payload as ServerResponseUser;
          this.setLogin(true);
          this.setName(payload.name);
          this.setRole(payload.role);
          this.setEmail(payload.email);
          this.updateAbilities();
        }
      })
      .catch(err => console.error(err));
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
      this.API_PATH + this.AUTH_API,
      encodeURIComponent(
        JSON.stringify({
          call: "login",
          payload: credentials
        })
      )
    );
  }

  @Action
  signUp(signupCred: signupCredentials) {
    return axios.post(
      this.API_PATH + this.USER_API,
      encodeURIComponent(JSON.stringify({ payload: signupCred }))
    );
  }

  @Mutation
  setName(name: string) {
    this._name = name;
  }
  @Mutation
  setEmail(email: string) {
    this._email = email;
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
