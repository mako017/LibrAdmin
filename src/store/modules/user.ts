import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../";
import axios from "axios";
import {
  serverResponse,
  ServerResponseUser,
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

  get name() {
    return this._name;
  }
  get role() {
    return this._role;
  }
  get isLoggedIn() {
    return this._loggedIn;
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
}
