import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../";
import axios from "axios";
import {
  serverResponse,
  ServerResponseUser,
  UserCredentials
} from "src/components/models";

@Module({ name: "user", namespaced: true, store })
export default class User extends VuexModule {
  private readonly USER_API = "user.php";
  private readonly AUTH_API = "authentication.php";
  private _name: string | undefined = undefined;
  private _role: string | undefined = undefined;
  private _loggedIn = false;

  get name() {
    return this._name;
  }

  @Action
  loginUser(credentials: UserCredentials) {
    axios
      .post(
        "http://localhost/libradmin/php/api/" + this.AUTH_API,
        JSON.stringify({
          call: "login",
          payload: credentials
        })
      )
      .then(response => {
        const data: serverResponse = response.data as serverResponse;
        if (data?.call === "login") {
          const user: ServerResponseUser = data.payload as ServerResponseUser;
          this.setName(user.name);
          this.setRole(user.role);
          this.setLogin(true);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  @Mutation
  setName(name: string) {
    this._name = name;
  }
  @Mutation
  setRole(role: string) {
    this._role = role;
  }
  @Mutation
  setLogin(status: boolean) {
    this._loggedIn = status;
  }
}
