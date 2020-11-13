<template>
  <div class="col">
    <q-table
      title="Catalogue"
      :data="mockdata"
      :columns="columns"
      row-key="name"
    ></q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CatalogueItem } from "components/models.ts";

@Component
export default class ItemTable extends Vue {
  columns = [
    {
      name: "ID",
      required: true,
      label: "Test ID",
      align: "left",
      field: (row: CatalogueItem) => row.ID,
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
      field: (row: CatalogueItem) => row.authors.join(", "),
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
  mockdata = [
    {
      ID: "Int-01",
      title: "DESIGMA",
      authors: ["Nicolas Becker", "Frank M. Spinath"],
      status: 0,
      //0 = avail.; 1 = out of stock; 2 = due
      due: "",
      abstract: "",
      category1: 1,
      category2: 5,
      category3: 3,
      category4: 7,
      image: "string",
      publisher: "Hogrefe",
      language: "deutsch"
    },
    {
      ID: "Auf-01",
      title: "FAIR II",
      authors: ["IDC"],
      status: 0,
      //0 = avail.; 1 = out of stock; 2 = due
      due: "",
      abstract: "",
      category1: 1,
      category2: 5,
      category3: 3,
      category4: 7,
      image: "string",
      language: "deutsch"
    },
    {
      ID: "Auf-02",
      title: "D2-R",
      authors: ["IDC"],
      status: 2,
      //0 = avail.; 1 = out of stock; 2 = due
      due: "",
      abstract: "",
      category1: 1,
      category2: 5,
      category3: 3,
      category4: 7,
      image: "string",
      publisher: "Pearson",
      language: "deutsch"
    }
  ];
}
</script>

<style scoped></style>
