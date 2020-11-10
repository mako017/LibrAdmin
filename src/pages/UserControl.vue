<template>
  <div>
    <UserTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserTable from "components/UserControl/UserTable.vue";

@Component({
  components: { UserTable }
})
export default class UserControl extends Vue {}
</script>

<style scoped></style>
