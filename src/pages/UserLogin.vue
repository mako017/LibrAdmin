<template>
  <q-page class="column items-center justify-evenly">
    <q-banner
      v-if="showBanner && bannerText !== ''"
      class="bg-primary text-white absolute-bottom overlay q-ma-lg"
    >
      {{ bannerText }}
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss" @click="showBanner = false" />
      </template>
    </q-banner>
    <q-card bordered class="loginCard">
      <q-card-section>
        <div class="text-h6">{{ formType }}</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-toggle v-model="formToggle"></q-toggle>
        <LoginForm v-if="formToggle" @submitted="updateBanner" />
        <RegisterForm v-if="!formToggle" @submitted="updateBanner" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "components/LoginForm.vue";
import RegisterForm from "components/RegisterForm.vue";
import { AxiosResponse } from "app/node_modules/axios";
import { serverResponse } from "src/components/models";

@Component({
  components: { LoginForm, RegisterForm }
})
export default class PageUserLogin extends Vue {
  formToggle = true;
  showBanner = false;
  bannerText = "";
  get formType() {
    return this.formToggle == true ? "Login" : "Register";
  }
  updateBanner(response: Promise<AxiosResponse<serverResponse>>) {
    response
      .then(res => {
        const data = res.data;
        switch (data.call) {
          case "noCredentials":
            this.showBanner = true;
            this.bannerText =
              "It appears you have not entered all credentials.";
            break;
          case "nameTaken":
            this.showBanner = true;
            this.bannerText = "Please choose another username.";
            break;
          case "registered":
            this.showBanner = true;
            this.bannerText = "You've registered successfully.";
            break;
          case "registrationFailed":
            this.showBanner = true;
            this.bannerText =
              "There was some problem with your registration. Please check that you have entered all data and contact a staff member if this error isn't solved.";
            break;
          case "passwordMismatch":
            this.showBanner = true;
            this.bannerText =
              "There was some problem with your login. Please confirm that you have entered your credentials correctly.";
            break;
          case "login":
            this.showBanner = true;
            this.bannerText = "You've successfully logged into your account.";
            break;
          default:
            break;
        }
      })
      .catch(err => console.error(err));
  }
}
</script>

<style scoped lang="scss">
.loginCard {
  width: 100%;
  max-width: 300px;
}
.overlay {
  z-index: 1000;
  max-width: 500px;
  margin: 0 auto 1rem auto;
}
</style>
