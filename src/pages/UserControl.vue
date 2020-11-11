<template>
  <q-page class="row justify-evenly">
    <UserTable class="usertable q-mt-sm" />
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserTable from "components/UserControl/UserTable.vue";

@Component({
  components: { UserTable }
})
export default class UserControl extends Vue {}
</script>

<style scoped>
.usertable {
  width: 100%;
  max-width: 1400px;
  max-height: 80vh;
}
</style>
