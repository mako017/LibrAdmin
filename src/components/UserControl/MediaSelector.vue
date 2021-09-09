<template>
  <q-dialog persistent v-model="showDialog">
    <q-card class="mediaSelectorCard">
      <q-card-section class="flex row">
        <q-list
          class="q-list"
          @dragover.prevent
          @dragenter.prevent
          @drop="drop($event)"
        >
          <q-item-label header>Catalogue</q-item-label>
          <template v-for="item in allMedia">
            <q-item
              class="q-item"
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
        <q-list
          class="q-list"
          @dragover.prevent
          @dragenter.prevent
          @drop="drop($event)"
        >
          <q-item-label header>{{
            targetList === "borrow" ? "Borrowed Media" : "Reserved Media"
          }}</q-item-label>
          <template v-for="item in userMedia">
            <q-item
              class="q-item"
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
          @click="saveDialog()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { emptyUser } from "src/assets/ts/initFunctions";
import { catalogue } from "src/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  CatalogueItem,
  CatalogueStatus,
  ItemChange,
  TargetList,
  UserAccount
} from "../models";

@Component
export default class MediaSelector extends Vue {
  @Prop() targetList!: TargetList;
  @Prop() user!: UserAccount;
  userCopy = emptyUser();
  showDialog = true;
  changedItems: ItemChange[] = [];

  get allMedia() {
    return catalogue.allItems.filter(item => {
      if (
        item.status === CatalogueStatus.inStock ||
        item.status === CatalogueStatus.reserved
      ) {
        if (this.targetList === "borrow") {
          return !this.userCopy.borrowedMedia.some(uMedia => {
            return uMedia === item.itemID;
          });
        }
        return !this.userCopy.reservedMedia.some(uMedia => {
          return uMedia === item.itemID;
        });
      }
    });
  }
  get userMedia() {
    return catalogue.allItems.filter(item => {
      if (this.targetList === "borrow") {
        return this.userCopy.borrowedMedia.some(uMedia => {
          return uMedia === item.itemID;
        });
      }
      return this.userCopy.reservedMedia.some(uMedia => {
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
    if (itemID) {
      if (this.targetList === "borrow") {
        this.userCopy.borrowedMedia.push(itemID);
      } else {
        this.userCopy.reservedMedia.push(itemID);
      }
      const item = catalogue.hasItem(itemID);

      item
        .then(res => {
          if (res) {
            if (this.targetList === "borrow")
              this.changedItems.push([res, "borrow"]);
            else this.changedItems.push([res, "reserve"]);
          }
        })
        .catch(err => console.error(err));
    }
  }

  closeDialog() {
    this.$emit("closeDialog");
    this.showDialog = false;
  }

  saveDialog() {
    this.$emit("saveDialog", {
      changedItems: this.changedItems,
      userCopy: this.userCopy
    });
    this.showDialog = false;
  }

  beforeMount() {
    this.userCopy = JSON.parse(JSON.stringify(this.user)) as UserAccount;
    if (catalogue.allItems.length === 0) {
      catalogue.queryCatalogue().catch(err => console.error(err));
    }
  }
}
</script>

<style lang="scss" scoped>
.mediaSelectorCard {
  min-width: 20%;
  .q-list {
    width: 48%;
    margin: 0 auto;
  }
  .q-item {
    border: 1px solid #bbb;
    border-radius: 25px;
    padding: 4px 16px;
    margin: 2px 0;
  }
}
</style>
