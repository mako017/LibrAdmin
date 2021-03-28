<template>
  <div class="col">
    <q-table
      title="Catalogue"
      :data="allItems"
      :columns="columns"
      :rows-per-page-options="[0]"
      row-key="name"
    ></q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CatalogueItem } from "components/models";
import { catalogue } from "src/store/";

@Component({})
export default class ItemTable extends Vue {
  columns = [
    {
      name: "ID",
      required: true,
      label: "Test ID",
      align: "left",
      field: (row: CatalogueItem) => row.itemID,
      sortable: true
    },
    {
      name: "status",
      required: true,
      label: "Available",
      align: "left",
      field: (row: CatalogueItem) => row.status,
      sortable: true
    },
    {
      name: "title",
      required: true,
      label: "Title",
      align: "left",
      field: (row: CatalogueItem) => row.title,
      sortable: true
    },
    {
      name: "authors",
      required: true,
      label: "Authors",
      align: "left",
      field: (row: CatalogueItem) => row.authors,
      sortable: true
    },
    {
      name: "category1",
      required: true,
      label: "Category 1",
      align: "left",
      field: (row: CatalogueItem) => row.category1,
      sortable: true
    },
    {
      name: "category2",
      required: true,
      label: "Category 2",
      align: "left",
      field: (row: CatalogueItem) => row.category2,
      sortable: true
    },
    {
      name: "category3",
      required: true,
      label: "Category 3",
      align: "left",
      field: (row: CatalogueItem) => row.category3,
      sortable: true
    },
    {
      name: "category4",
      required: true,
      label: "Category 4",
      align: "left",
      field: (row: CatalogueItem) => row.category4,
      sortable: true
    },
    {
      name: "publisher",
      required: true,
      label: "Publisher",
      align: "left",
      field: (row: CatalogueItem) => row.publisher,
      sortable: true
    },
    {
      name: "language",
      required: true,
      label: "Language",
      align: "left",
      field: (row: CatalogueItem) => row.language,
      sortable: true
    }
  ];
  get allItems() {
    return catalogue.allItems;
  }
}
</script>

<style scoped></style>
