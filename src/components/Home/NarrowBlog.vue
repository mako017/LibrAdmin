<template>
  <q-card class="root column q-pa-md q-ma-sm">
    <h2>Neu in der Testothek</h2>
    <ul>
      <li>Test 1</li>
      <li>Test 2</li>
    </ul>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NarrowBlog extends Vue {}
</script>

<style scoped>
h2 {
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.3rem;
}
.root {
  width: 100%;
  max-width: 480px;
  align-self: center;
}
</style>
