<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card class="override">
      <q-form>
        <q-card-section>
          <q-input
            class="q-mb-xs"
            filled
            label="User Name"
            type="text"
            v-model="editUser.name"
          ></q-input>
          <q-input
            class="q-mb-xs"
            filled
            label="E-Mail"
            type="email"
            v-model="editUser.email"
          ></q-input>
          <q-option-group
            :options="statusOptions"
            v-model="editUser.role"
          ></q-option-group>
        </q-card-section>
        <q-card-section class="flex column">
          <span class="text-h6">Borrowed Media</span>
          <div class="flex wrap">
            <span v-if="editUser.borrowedMedia.length === 0">Nothing here</span>
          </div>
          <q-chip
            class="q-ml-auto"
            color="primary"
            text-color="white"
            icon="add_circle_outline"
            label="Add entry"
            clickable
            @click="showSelector = true"
          />
        </q-card-section>
        <q-card-section class="flex column">
          <span class="text-h6">Reserved Media</span>
          <div class="flex wrap">
            <span v-if="editUser.reservedMedia.length === 0">Nothing here</span>
          </div>
          <q-chip
            class="q-ml-auto"
            color="primary"
            text-color="white"
            icon="add_circle_outline"
            label="Add entry"
            clickable
            @click="showSelector = true"
          />
        </q-card-section>
        <q-separator class="q-mb-sm" />
        <q-card-section class="flex justify-between q-pa-sm">
          <q-btn
            color="red"
            text-color="white"
            label="Cancel"
            @click="closeDialog()"
          />
          <q-btn
            color="primary"
            text-color="white"
            label="Update"
            @click="updateUser()"
          />
        </q-card-section>
      </q-form>
    </q-card>
    <MediaSelector
      v-if="showSelector"
      @closeDialog="showSelector = false"
      :user="editUser"
    />
  </q-dialog>
</template>

<script lang="ts">
import { user, userControl } from "src/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import { UserAccount, userRoles } from "../models";
import MediaSelector from "src/components/UserControl/MediaSelector.vue";

@Component({ components: { MediaSelector } })
export default class UserEditor extends Vue {
  showDialog = true;
  showSelector = false;
  @Prop({ required: true }) editUser!: UserAccount;
  statusOptions: { value: userRoles; label: string; disable?: boolean }[] = [
    {
      value: "admin",
      label: "Admin",
      disable: user.ability.cannot("manage", "roles")
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
  closeDialog() {
    this.$emit("closeDialog");
    this.showDialog = false;
  }
  updateUser() {
    userControl.updateUser(this.editUser);
    this.closeDialog();
  }
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
