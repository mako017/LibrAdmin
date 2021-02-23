<template>
  <q-card bordered class="root row q-pa-md justify-evenly">
    <div class="column">
      <h2 class="q-mb-xs">Ansprechpartner</h2>
      <span>Anna Klittich</span>
      <span>Dominik Weber</span>
    </div>
    <div class="column">
      <h2 class="q-mb-xs">Kontakt & Lage</h2>
      <span>Gebäude A1.3, Raum 3.15</span>
      <span>0681 302-6507</span>
      <span>testothek(at)outlook.de</span>
    </div>
    <div class="column">
      <h2 class="q-mb-xs">Öffnungszeiten</h2>
      <span>Di 10:15 - 15:15 Uhr</span>
      <span>Mi 10:15 - 13:15 Uhr</span>
      <span>Do 10:00 - 14:00 Uhr</span>
    </div>
    <div class="column">
      <h2 class="q-mb-xs">Links</h2>
      <span>OPAC der SULB</span>
      <h2 class="q-mb-xs">Downloads</h2>
      <span>Inventarliste Testothek</span>
      <span>Handapparat der AE</span>
      <span>Ausleihschein</span>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class WideBlog extends Vue {}
</script>

<style scoped>
h2 {
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.3rem;
}
.root {
  width: 100%;
  max-width: 1000px;
  align-self: center;
}
</style>
