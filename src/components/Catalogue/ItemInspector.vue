<template>
  <q-card class="qcard override">
    <q-card-section>
      <div class="text-h6">DESIGMA</div>
    </q-card-section>
    <q-card-section class="q-pt-none column">
      <span class="text-subtitle2">Test</span>
      <q-input
        readonly
        class="q-mb-xs"
        filled
        :value="item.title"
        label="Test Title"
        type="text"
      >
      </q-input>
      <q-input
        readonly
        class=""
        filled
        :value="item.authors"
        label="Authors (seperated by semi-colons)"
        type="text"
      >
      </q-input>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <span class="text-subtitle2 col-11">Categorization</span>
      <q-input
        readonly
        class="q-mb-xs"
        filled
        :value="item.category1"
        label="Category 1"
        type="text"
      >
      </q-input>
      <q-input
        readonly
        class="q-mb-xs"
        filled
        :value="item.category2"
        label="Category 2"
        type="text"
      >
      </q-input>
      <q-input
        readonly
        class="q-mb-xs"
        filled
        :value="item.category3"
        label="Category 3"
        type="text"
      >
      </q-input>
      <q-input
        readonly
        class="q-mb-xs"
        filled
        :value="item.category4"
        label="Category 4"
        type="text"
      >
      </q-input>
      <q-input
        readonly
        filled
        class="q-mb-xs"
        :value="item.publisher"
        label="Publisher"
        type="text"
      >
      </q-input>
      <q-input
        readonly
        filled
        class=""
        :value="item.language"
        label="Language"
        type="text"
      >
      </q-input>
    </q-card-section>
    <q-card-section>
      <span class="text-subtitle2 col-11">Abstract</span>
      <q-input readonly type="textarea"></q-input>
    </q-card-section>
    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" />
      <q-btn flat label="Reserve" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { emptyCatalogueItem } from "src/assets/ts/initFunctions";
import { catalogue } from "src/store";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ItemInspector extends Vue {
  @Prop() itemID!: string;
  item = emptyCatalogueItem();
  // get items() {
  //   return catalogue.allItems;
  // }
  // get item() {
  //   const index = this.items.findIndex(el => el.itemID === this.itemID);
  //   return this.items[index] ? this.items[index] : emptyCatalogueItem();
  // }

  mounted() {
    catalogue
      .hasItem(this.itemID)
      .then(res => {
        if (res !== undefined) {
          this.item = res;
        }
      })
      .catch(err => console.error(err));
  }
}
</script>

<style scoped lang="scss">
.override {
  position: absolute;
  z-index: 10000;
  top: 0;
  min-width: 300px;
}
</style>
