import axios from "axios";
import { serverResponse, UserAccount } from "src/components/models";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "..";

@Module({ name: "userControl", namespaced: true, store })
export default class UserControl extends VuexModule {
  private readonly API_PATH = process.env.API_BASE_URL as string;
  private readonly API = "user.php";
  private _users: UserAccount[] = [
    {
      name: "Marco Koch",
      email: "marco.koch@uni-saarland.de",
      role: "admin",
      borrowedMedia: [],
      reservedMedia: []
    }
  ];

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
          const users = (<Array<UserAccount>>data.payload).map(
            (user): UserAccount => {
              return {
                name: user.name,
                email: user.email,
                role: user.role,
                reservedMedia: user.reservedMedia,
                borrowedMedia: user.borrowedMedia
              };
            }
          );
          this.setUsers(users);
        }
      })
      .catch(err => console.error(err));
  }

  @Action
  createUser() {
    return;
  }

  @Action
  updateUser(_updatedUser: UserAccount) {
    return;
  }

  @Mutation
  setUsers(users: UserAccount[]) {
    this._users = users;
  }
  @Mutation
  setSingleUser({
    updatedUser,
    pos
  }: {
    updatedUser: UserAccount;
    pos: number;
  }) {
    console.log({ updatedUser, pos });
  }
}
