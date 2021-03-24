<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { user } from "./store";

@Component
export default class App extends Vue {
  created() {
    user.updateAbilities();
    user.attemptRemember();
  }
}
</script>
