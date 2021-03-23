<template>
  <q-form @submit="login" class="col items-center justify-evenly">
    <q-input v-model="credentials.username" label="Username" />
    <q-input v-model="credentials.password" type="password" label="Password" />
    <q-checkbox
      v-model="credentials.rememberMe"
      label="Stay Logged in (uses cookies)"
      true-value="true"
      false-value="false"
    />
    <q-btn label="Submit" type="submit" color="primary" class="q-mt-sm" />
  </q-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { user } from "src/store";
import { serverResponse, ServerResponseUser, UserCredentials } from "./models";
import { AxiosResponse } from "app/node_modules/axios";
import { PermissionManager } from "src/assets/ts/permissionManager";

@Component
export default class LoginForm extends Vue {
  credentials: UserCredentials = {
    username: "",
    password: "",
    rememberMe: "false"
  };
  login() {
    const response = user.loginUser(this.credentials) as Promise<
      AxiosResponse<serverResponse>
    >;
    this.$emit("submitted", response);
    response
      .then(response => {
        console.log(response);

        const data = response.data;
        if (data.call === "login") {
          const userdata = data.payload as ServerResponseUser;
          // console.log(userdata);

          user.setName(userdata.name);
          user.setRole(userdata.role);
          user.setLogin(true);
          // console.log(user.role);

          const rules = PermissionManager.initPermissions(user.role);
          this.$ability.update(rules);
          console.log(rules);
        }
      })
      .catch(err => console.error(err));
  }
}
</script>

<style scoped></style>
