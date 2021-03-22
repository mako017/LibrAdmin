<template>
  <q-form
    @submit.prevent.once="register"
    class="col items-center justify-evenly"
  >
    <q-input v-model="credentials.username" label="Select username" />
    <q-input v-model="credentials.email" type="email" label="E-Mail" />
    <q-input v-model="credentials.password" type="password" label="Password" />
    <q-btn label="Submit" type="submit" color="primary" class="q-mt-sm" />
  </q-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { user } from "src/store";
import { signupCredentials } from "./models";

@Component
export default class RegisterForm extends Vue {
  credentials: signupCredentials = {
    username: "",
    email: "",
    password: ""
  };
  register() {
    user.signUp(this.credentials);
  }
}
</script>

<style scoped></style>
