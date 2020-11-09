<template>
  <q-page class="row items-center justify-evenly">
    <q-card bordered class="loginCard">
      <q-card-section>
        <div class="text-h6">{{ formType }}</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-toggle v-model="formToggle"></q-toggle>
        <LoginForm v-if="formToggle" />
        <RegisterForm v-if="!formToggle" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "components/LoginForm.vue";
import RegisterForm from "components/RegisterForm.vue";

@Component({
  components: { LoginForm, RegisterForm }
})
export default class PageUserLogin extends Vue {
  formToggle = true;
  get formType() {
    return this.formToggle == true ? "Login" : "Register";
  }
}
</script>

<style scoped lang="scss">
.loginCard {
  width: 100%;
  max-width: 300px;
}
</style>
