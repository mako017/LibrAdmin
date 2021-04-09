<template>
  <q-page class="column items-center justify-between q-pa-md">
    <ItemTable class="catalogue-table q-mt-sm" />
    <ItemCreator v-if="createPrompt" @closePrompt="createPrompt = false" />
    <ItemInspector
      v-if="qrcodeContent && qrcodeContent !== ''"
      :itemID="qrcodeContent"
    />
    <q-btn
      class="fixed-bottom-right q-ma-md"
      round
      color="primary"
      label="+"
      @click="createPrompt = true"
    />
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ItemTable from "components/Catalogue/ItemTable.vue";
import ItemCreator from "components/Catalogue/ItemCreator.vue";
import ItemInspector from "components/Catalogue/ItemInspector.vue";

@Component({
  components: { ItemTable, ItemCreator, ItemInspector }
})
export default class Catalogue extends Vue {
  createPrompt = false;
  @Prop() qrcodeContent!: string | undefined;
}
</script>

<style scoped>
.catalogue-table {
  width: 100%;
  max-width: 1400px;
  max-height: 80vh;
}
</style>
