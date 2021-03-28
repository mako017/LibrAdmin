<template>
  <div class="root">
    <q-card bordered class="col items-center justify-evenly q-pa-md">
      <div class="q-mb-md">
        <span class="text-subtitle1"
          >User Data
          <span class="text-weight-thin">(Cannot be edited)</span></span
        >
        <q-input
          readonly
          disable
          filled
          v-model="userInfo.name"
          label="Username"
          type="text"
        >
          <template v-slot:before>
            <q-icon name="account_box" />
          </template>
        </q-input>
        <q-input
          readonly
          disable
          filled
          v-model="userInfo.role"
          label="User Role"
          type="text"
        >
          <template v-slot:before>
            <q-icon name="done" />
          </template>
        </q-input>
      </div>
      <div class="q-mb-md">
        <span class="text-subtitle1">Personal Information</span>
        <q-input
          filled
          v-model="userInfo.email"
          label="E-Mail Address"
          type="email"
        >
          <template v-slot:before>
            <q-icon name="mail" />
          </template>
        </q-input>
      </div>
      <div class="row justify-between">
        <q-btn color="red">Delete my account</q-btn>
        <q-btn color="primary">Save Changes</q-btn>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { user } from "src/store";

@Component
export default class AccountSettings extends Vue {
  userInfo = {
    name: user.name,
    email: user.email,
    role: user.role
  };
}
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
</style>
