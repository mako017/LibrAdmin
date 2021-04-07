import axios from "axios";
import { serverResponse, UserAccount } from "src/components/models";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "..";

@Module({ name: "userControl", namespaced: true, store })
export default class UserControl extends VuexModule {
  private readonly API_PATH = process.env.API_BASE_URL as string;
  private readonly API = "user.php";
  private _users: UserAccount[] = [];

  get users() {
    return this._users;
  }

  @Action
  queryUsers() {
    axios
      .get(this.API_PATH + this.API)
      .then(response => {
        const data = response.data as serverResponse;
        if (data.call === "success") {
          const users = (<Array<UserAccount>>data.payload).map(user => {
            return {
              name: user.name,
              email: user.email,
              role: user.role
            };
          });
          this.setUsers(users);
        }
      })
      .catch(err => console.error(err));
  }

  @Mutation
  setUsers(users: UserAccount[]) {
    this._users = users;
  }
}
