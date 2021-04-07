<template>
  <div class="col">
    <q-table
      title="User Panel"
      :data="mockdata"
      :columns="columns"
      row-key="name"
    ></q-table>
  </div>
</template>

<script lang="ts">
import { userControl } from "src/store";
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
    }
  ];
  mockdata = userControl.users;
}
</script>

<style scoped lang="scss"></style>
