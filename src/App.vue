<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { PermissionManager } from "assets/ts/permissionManager";

@Component
export default class App extends Vue {
  created() {
    const rules = PermissionManager.initPermissions("guest");
    this.$ability.update(rules);
  }
}
</script>
