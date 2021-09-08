<template>
  <div class="col">
    <q-table title="User Panel" :data="users" :columns="columns" row-key="name">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-menu anchor="bottom left" self="top left" context-menu>
            <q-item v-close-popup clickable>
              <q-item-section @click="openDialog(props.row)"
                >Edit User</q-item-section
              >
            </q-item>
          </q-menu>
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit
              v-if="ability.can('manage', 'tests')"
              v-model="popupEditData.name"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.name" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
            <q-popup-edit
              v-if="ability.can('manage', 'tests')"
              v-model="popupEditData.email"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.email" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="role" :props="props">
            {{ props.row.role }}
            <q-popup-edit
              v-if="ability.can('manage', 'tests')"
              v-model="popupEditData.role"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.role" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="borrowedMedia" :props="props">
            {{ props.row.borrowedMedia.length }}
          </q-td>
          <q-td key="reservedMedia" :props="props">
            {{ props.row.reservedMedia.length }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <UserEditor
      v-if="showDialog"
      @closeDialog="showDialog = false"
      :editUser="popupEditData"
    />
  </div>
</template>

<script lang="ts">
import { emptyUser } from "src/assets/ts/initFunctions";
import { userControl, user } from "src/store";
import { Component, Vue } from "vue-property-decorator";
import { UserAccount } from "../models";
import UserEditor from "src/components/UserControl/UserEditor.vue";

@Component({ components: { UserEditor } })
export default class UserTable extends Vue {
  popupEditData: UserAccount = emptyUser();
  showDialog = false;
  columns = [
    {
      name: "name",
      required: true,
      label: "User name",
      align: "left",
      field: "name",
      sortable: true
    },
    {
      name: "email",
      align: "center",
      label: "E-Mail Address",
      field: "email",
      sortable: true
    },
    {
      name: "role",
      required: true,
      label: "User Role",
      field: "role",
      sortable: true
    },
    {
      name: "borrowedMedia",
      label: "Borrowed Media",
      field: "borrowedMedia",
      sortable: true
    },
    {
      name: "reservedMedia",
      label: "Reserved Media",
      field: "reservedMedia",
      sortable: true
    }
  ];
  get ability() {
    return user.ability;
  }
  get users() {
    return userControl.users;
  }
  saveChange() {
    userControl.updateUser(this.popupEditData);
  }
  setEditData(data: UserAccount) {
    this.popupEditData = { ...data };
  }
  openDialog(user: UserAccount) {
    this.setEditData(user);
    this.showDialog = true;
    console.log(this.showDialog);
  }
}
</script>

<style scoped lang="scss"></style>
