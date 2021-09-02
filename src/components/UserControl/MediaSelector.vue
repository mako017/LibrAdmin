<template>
  <q-dialog persistent v-model="showDialog">
    <q-card>
      <q-card-section class="flex row">
        <q-list @dragover.prevent @dragenter.prevent @drop="drop($event)">
          <q-item-label header>Catalogue</q-item-label>
          <template v-for="item in allMedia">
            <q-item
              clickable
              draggable="true"
              v-ripple
              @dragstart="startDrag($event, item)"
              :key="item.catalogueCounter"
            >
              {{ item.abbreviation }}
            </q-item>
          </template>
        </q-list>
        <q-list @dragover.prevent @dragenter.prevent @drop="drop($event)">
          <q-item-label header>Borrowed Tests</q-item-label>
          <template v-for="item in userMedia">
            <q-item
              clickable
              draggable="true"
              v-ripple
              @dragstart="startDrag($event, item)"
              :key="item.catalogueCounter"
            >
              {{ item.abbreviation }}
            </q-item>
          </template>
        </q-list>
      </q-card-section>
      <q-card-section class="flex justify-between q-pa-sm">
        <q-btn
          color="red"
          text-color="white"
          label="Cancel"
          @click="closeDialog()"
        />
        <q-btn
          color="primary"
          text-color="white"
          label="Update"
          @click="saveSelection()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { emptyCatalogueItem } from "src/assets/ts/initFunctions";
import { catalogue } from "src/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import { CatalogueItem, UserAccount } from "../models";

@Component
export default class MediaSelector extends Vue {
  targetList: "borrowed" | "reserved" = "borrowed";
  @Prop() user!: UserAccount;
  mockitem = emptyCatalogueItem();
  showDialog = true;

  get allMedia() {
    return catalogue.allItems.filter(item => {
      return !this.user.borrowedMedia.some(uMedia => {
        return uMedia === item.itemID;
      });
    });
  }
  get userMedia() {
    return catalogue.allItems.filter(item => {
      return this.user.borrowedMedia.some(uMedia => {
        return uMedia === item.itemID;
      });
    });
  }

  startDrag(evt: DragEvent, item: CatalogueItem) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.itemID);
    }
  }

  drop(ev: DragEvent) {
    const itemID = ev.dataTransfer?.getData("itemID");
  }

  closeDialog() {
    this.$emit("closeDialog");
    this.showDialog = false;
  }
  saveSelection() {
    console.log("Saving...");
  }
}
</script>

<style scoped></style>
