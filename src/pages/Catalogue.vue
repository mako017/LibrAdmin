<template>
  <q-page class="column items-center justify-between q-pa-md">
    <ItemTable class="catalogue-table q-mt-sm" />
    <ItemCreator v-if="createPrompt" @closePrompt="createPrompt = false" />
    <q-btn
      class="self-end"
      round
      color="primary"
      label="+"
      @click="createPrompt = true"
    />
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItemTable from "components/Catalogue/ItemTable.vue";
import ItemCreator from "components/Catalogue/ItemCreator.vue";
import { catalogue } from "src/store";

@Component({
  components: { ItemTable, ItemCreator }
})
export default class Catalogue extends Vue {
  createPrompt = false;

  created() {
    catalogue.queryCatalogue();
  }
}
</script>

<style scoped>
.catalogue-table {
  width: 100%;
  max-width: 1400px;
  max-height: 80vh;
}
</style>
