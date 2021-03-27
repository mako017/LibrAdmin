<template>
  <q-dialog v-model="prompt" persistent>
    <q-card class="qcard">
      <q-card-section>
        <div class="text-h6">New Item</div>
      </q-card-section>

      <q-card-section class="q-pt-none row wrap justify-around">
        <span class="text-subtitle2 col-11">Test</span>
        <q-input
          class="col-5 q-mb-xs"
          filled
          v-model="catalogueItem.itemID"
          label="Test ID"
          type="text"
        >
        </q-input>
        <q-input
          class="col-5 q-mb-xs"
          filled
          v-model="catalogueItem.title"
          label="Test Title"
          type="text"
        >
        </q-input>
        <q-input
          class="col-5"
          filled
          v-model="catalogueItem.abbreviation"
          label="Test Abbreviation"
          type="text"
        >
        </q-input>
        <q-input
          class="col-5"
          filled
          v-model="authors"
          label="Authors (seperated by semi-colons)"
          type="text"
        >
        </q-input>
      </q-card-section>
      <q-card-section class="q-pt-none row wrap justify-around">
        <span class="text-subtitle2 col-11">Categorization</span>
        <q-input
          class="col-5 q-mb-xs"
          filled
          v-model="category1"
          label="Category 1"
          type="text"
        >
        </q-input>
        <q-input
          class="col-5 q-mb-xs"
          filled
          v-model="category2"
          label="Category 2"
          type="text"
        >
        </q-input>
        <q-input
          class="col-5 q-mb-xs"
          filled
          v-model="category3"
          label="Category 3"
          type="text"
        >
        </q-input>
        <q-input
          class="col-5 q-mb-xs"
          filled
          v-model="category4"
          label="Category 4"
          type="text"
        >
        </q-input>
        <q-input
          filled
          class="col-5"
          v-model="catalogueItem.publisher"
          label="Publisher"
          type="text"
        >
        </q-input>
        <q-input
          filled
          class="col-5"
          v-model="catalogueItem.language"
          label="Language"
          type="text"
        >
        </q-input>
      </q-card-section>
      <q-card-section class="q-pt-none row wrap justify-around">
        <span class="text-subtitle2 col-11">Detailed Information</span>
        <q-input
          class="col-11"
          filled
          v-model="catalogueItem.abstract"
          label="Abstract"
          type="text"
        >
        </q-input>
      </q-card-section>
      <!-- <q-card-section class="q-pt-none row wrap justify-around">
        <q-input
          filled
          class="col-11 q-mb-xs"
          v-model="catalogueItem.image"
          label="Image"
          type="text"
        >
        </q-input>
      </q-card-section> -->

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="closePrompt" />
        <q-btn flat label="Add Item" @click="closePrompt" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CatalogueItem } from "../models";

@Component
export default class ItemCreator extends Vue {
  prompt = true;
  catalogueItem: CatalogueItem = {
    itemID: "",
    abbreviation: "",
    title: "",
    authors: [],
    status: 0,
    currentlyWith: "",
    due: "",
    abstract: "",
    category1: [],
    category2: [],
    category3: [],
    category4: [],
    image: "",
    publisher: "",
    language: ""
  };

  public set authors(e: string) {
    this.catalogueItem.authors = e.split(";").map(author => {
      return author.trim();
    });
  }
  public get authors() {
    return this.catalogueItem.authors.join("; ");
  }
  public set category1(e: string) {
    this.catalogueItem.category1 = e.split(";").map(category => {
      return category.trim();
    });
  }
  public get category1() {
    return this.catalogueItem.category1
      ? this.catalogueItem.category1.join("; ")
      : "";
  }
  public set category2(e: string) {
    this.catalogueItem.category2 = e.split(";").map(category => {
      return category.trim();
    });
  }
  public get category2() {
    return this.catalogueItem.category2
      ? this.catalogueItem.category2.join("; ")
      : "";
  }
  public set category3(e: string) {
    this.catalogueItem.category3 = e.split(";").map(category => {
      return category.trim();
    });
  }
  public get category3() {
    return this.catalogueItem.category3
      ? this.catalogueItem.category3.join("; ")
      : "";
  }
  public set category4(e: string) {
    this.catalogueItem.category4 = e.split(";").map(category => {
      return category.trim();
    });
  }
  public get category4() {
    return this.catalogueItem.category4
      ? this.catalogueItem.category4.join("; ")
      : "";
  }

  closePrompt() {
    this.prompt = false;
    this.$emit("closePrompt");
  }
}
</script>

<style scoped>
.qcard {
  min-width: 350px;
}
</style>
