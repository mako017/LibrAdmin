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
import { UserCredentials } from "./models";

@Component
export default class LoginForm extends Vue {
  credentials: UserCredentials = {
    username: "",
    password: "",
    rememberMe: "false"
  };
  login() {
    user.loginUser(this.credentials);
  }
}
</script>

<style scoped></style>
