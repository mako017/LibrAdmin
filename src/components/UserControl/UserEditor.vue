<template>
  <q-card class="override q-pa-md">
    <q-form>
      <q-card-section>
        <q-input class="q-mb-xs" filled label="User Name" type="text"></q-input>
        <q-input class="q-mb-xs" filled label="E-Mail" type="email"></q-input>
        <q-option-group :options="statusOptions"></q-option-group>
      </q-card-section>
      <q-card-section class="flex column">
        <span class="text-h6">Borrowed Media</span>
        <div class="flex wrap">
          Nothing here
        </div>
        <q-chip
          class="q-ml-auto"
          color="primary"
          text-color="white"
          icon="add_circle_outline"
          label="Add entry"
        />
      </q-card-section>
      <q-card-section class="flex column">
        <span class="text-h6">Reserved Media</span>
        <div class="flex wrap">
          Nothing here
        </div>
        <q-chip
          class="q-ml-auto"
          color="primary"
          text-color="white"
          icon="add_circle_outline"
          label="Add entry"
        />
      </q-card-section>
      <div class="flex justify-between">
        <q-btn color="red" text-color="white" label="Cancel" />
        <q-btn color="primary" text-color="white" label="Update" />
      </div>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { userRoles } from "../models";

@Component
export default class UserEditor extends Vue {
  statusOptions: { value: userRoles; label: string }[] = [
    {
      value: "admin",
      label: "Admin"
    },
    {
      value: "mod",
      label: "Moderator"
    },
    {
      value: "user",
      label: "User"
    },
    {
      value: "guest",
      label: "Guest"
    }
  ];
}
</script>

<style lang="scss" scoped>
.override {
  position: absolute;
  z-index: 10000;
  top: 0;
  min-width: 300px;
  max-width: 400px;
}
</style>
