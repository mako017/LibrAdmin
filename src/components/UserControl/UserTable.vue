<template>
  <q-page class="col items-center root">
    <q-table
      title="User Panel"
      :data="mockdata"
      :columns="columns"
      row-key="name"
      class="usertable"
    ></q-table>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class UserTable extends Vue {
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
      name: "group",
      align: "center",
      label: "Access Group",
      field: "accessGroup",
      sortable: true
    },
    {
      name: "reservedMedia",
      label: "Reserved Media",
      field: "reservedMedia",
      sortable: true
    },
    {
      name: "borrowedMedia",
      label: "Borrowed Media",
      field: "borrowedMedia",
      sortable: true
    }
  ];
  mockdata = [
    {
      name: "user1",
      accessGroup: 1,
      token: "string",
      //0 = guest; 1 = registered user; 2 = staff; 3 = admin
      reservedMedia: 1,
      borrowedMedia: 0
    },
    {
      name: "user2",
      accessGroup: 2,
      token: "string",
      //0 = guest; 1 = registered user; 2 = staff; 3 = admin
      reservedMedia: 0,
      borrowedMedia: 2
    },
    {
      name: "user3",
      accessGroup: 3,
      token: "string",
      //0 = guest; 1 = registered user; 2 = staff; 3 = admin
      reservedMedia: 0,
      borrowedMedia: 0
    }
  ];
}
</script>

<style scoped lang="scss">
.root {
  width: 100%;
}
.usertable {
  width: 100%;
  max-width: 1000px;
}
</style>
