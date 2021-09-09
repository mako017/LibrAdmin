import axios, { AxiosError } from "axios";
import { serverResponse, UserAccount, userRoles } from "src/components/models";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "..";

interface updateCommit {
  updatedUser: UserAccount;
  pos: number;
}

interface dbUserAccount {
  name: string;
  email: string;
  role: userRoles;
  reservedMedia: string;
  borrowedMedia: string;
}

function dbToUser(dbUser: dbUserAccount): UserAccount {
  const reservedMedia =
    dbUser.reservedMedia === "" ? [] : dbUser.reservedMedia.split(";");
  const borrowedMedia =
    dbUser.borrowedMedia === "" ? [] : dbUser.borrowedMedia.split(";");
  return {
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
    reservedMedia: reservedMedia,
    borrowedMedia: borrowedMedia
  };
}

function userToDb(user: UserAccount): dbUserAccount {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    reservedMedia: user.reservedMedia.join(";"),
    borrowedMedia: user.borrowedMedia.join(";")
  };
}
@Module({ name: "userControl", namespaced: true, store })
export default class UserControl extends VuexModule {
  private readonly API_PATH = process.env.API_BASE_URL as string;
  private readonly API = "user.php";
  private _users: UserAccount[] = [
    // {
    //   name: "Marco Koch",
    //   email: "marco.koch@uni-saarland.de",
    //   role: "admin",
    //   borrowedMedia: [],
    //   reservedMedia: []
    // }
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
          const users = (<Array<dbUserAccount>>data.payload).map(
            (user): UserAccount => {
              return dbToUser(user);
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
  updateUser(updatedUser: UserAccount) {
    const pos = this._users.findIndex(user => user.name === updatedUser.name);
    if (pos > -1) {
      this.setSingleUser({ updatedUser, pos });
      axios
        .put(
          this.API_PATH + this.API,
          encodeURIComponent(
            JSON.stringify({ call: "", payload: userToDb(updatedUser) })
          ),
          { method: "PUT" }
        )
        .catch((err: AxiosError) => {
          if (err.response?.status === 403) {
            alert(
              "It seems you don't have the required permission to do this."
            );
          }
        });
    }
  }

  @Mutation
  setUsers(users: UserAccount[]) {
    this._users = users;
  }
  @Mutation
  setSingleUser({ updatedUser, pos }: updateCommit) {
    this._users.splice(pos, 1, updatedUser);
  }
}
