<template>
  <q-form @submit="login" class="col items-center justify-evenly">
    <q-input v-model="credentials.username" label="Username" />
    <q-input v-model="credentials.password" type="password" label="Password" />
    <q-btn label="Submit" type="submit" color="primary" class="q-mt-sm" />
  </q-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginForm extends Vue {
  credentials = {
    username: "",
    password: ""
  };
  login() {
    return 1;
  }
}
</script>

<style scoped></style>
