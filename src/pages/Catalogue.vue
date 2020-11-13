<template>
  <q-page class="row justify-evenly">
    <ItemTable class="catalogue-table q-mt-sm" />
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItemTable from "components/Catalogue/ItemTable.vue";

@Component({
  components: { ItemTable }
})
export default class Catalogue extends Vue {}
</script>

<style scoped>
.catalogue-table {
  width: 100%;
  max-width: 1400px;
  max-height: 80vh;
}
</style>
