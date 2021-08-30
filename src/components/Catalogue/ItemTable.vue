<template>
  <div class="col">
    <q-table
      :grid="$q.screen.xs"
      :dense="$q.screen.lt.md"
      title="Catalogue"
      :data="allItems"
      :columns="columns"
      :visible-columns="visibleColumns"
      :rows-per-page-options="[0]"
      virtual-scroll
      class="sticky-header"
      row-key="name"
      @row-click="(evt, row, index) => rowClick(row)"
    >
      <template v-slot:top>
        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />
      </template>

      <template v-slot:body="props" v-if="ability.can('manage', 'tests')">
        <q-tr :props="props">
          <q-menu anchor="bottom left" self="top left" context-menu>
            <q-item v-close-popup clickable>
              <q-item-section @click="getQRCode(props.row, false)"
                >Download QR Code</q-item-section
              >
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section @click="getQRCode(props.row, true)"
                >Print QR Code</q-item-section
              >
            </q-item>
            <q-item
              v-close-popup
              clickable
              v-if="ability.can('delete', 'tests')"
            >
              <q-item-section @click="deleteItem(props.row.catalogueCounter)"
                >Delete</q-item-section
              >
            </q-item>
          </q-menu>
          <q-td key="ID" :props="props">
            {{ props.row.itemID }}
            <q-popup-edit
              v-model="popupEditData.itemID"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.itemID" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="abbreviation" :props="props">
            {{ props.row.abbreviation }}
            <q-popup-edit
              v-model="popupEditData.abbreviation"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.abbreviation" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="title" :props="props">
            {{ shortenText(props.row.title, 20) }}
            <q-popup-edit
              v-model="popupEditData.title"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.title" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="status" :props="props">
            {{ shortenText(props.row.status, 20) }}
            <q-popup-edit
              v-model="popupEditData.status"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.status" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="authors" :props="props">
            {{ shortenText(props.row.authors, 20) }}
            <q-popup-edit
              v-model="popupEditData.authors"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.authors" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="category1" :props="props">
            {{ props.row.category1 }}
            <q-popup-edit
              v-model="popupEditData.category1"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.category1" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="category2" :props="props">
            {{ props.row.category2 }}
            <q-popup-edit
              v-model="popupEditData.category2"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.category2" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="category3" :props="props">
            {{ props.row.category3 }}
            <q-popup-edit
              v-model="popupEditData.category3"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.category3" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="category4" :props="props">
            {{ props.row.category4 }}
            <q-popup-edit
              v-model="popupEditData.category4"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.category4" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="publisher" :props="props">
            {{ props.row.publisher }}
            <q-popup-edit
              v-model="popupEditData.publisher"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.publisher" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="language" :props="props">
            {{ props.row.language }}
            <q-popup-edit
              v-model="popupEditData.language"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.language" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CatalogueItem } from "components/models";
import { catalogue, user } from "src/store/";
import { emptyCatalogueItem } from "assets/ts/initFunctions";
import { createTestLabel } from "assets/ts/pdfPrinter";

@Component({})
export default class ItemTable extends Vue {
  popupEditData: CatalogueItem = emptyCatalogueItem();
  columns = [
    {
      name: "ID",
      label: "Test ID",
      align: "left",
      field: (row: CatalogueItem) => row.itemID,
      sortable: true
    },
    {
      name: "abbreviation",
      required: true,
      label: "Abbreviation",
      align: "left",
      field: (row: CatalogueItem) => row.abbreviation,
      sortable: true
    },
    {
      name: "title",
      required: true,
      label: "Title",
      align: "left",
      field: (row: CatalogueItem) => this.shortenText(row.title, 65),
      sortable: true,
      headerStyle: "max-width:10%",
      style: "max-width:10%; overflow-x:hidden;"
    },
    {
      name: "status",
      required: true,
      label: "Status",
      align: "left",
      field: (row: CatalogueItem) => row.status,
      sortable: true,
      headerStyle: "max-width:10%",
      style: "max-width:10%; overflow-x:hidden;"
    },
    {
      name: "authors",
      label: "Authors",
      align: "left",
      field: (row: CatalogueItem) => this.shortenText(row.authors, 30),
      sortable: true
    },
    {
      name: "category1",
      label: "Category 1",
      align: "left",
      field: (row: CatalogueItem) => row.category1,
      sortable: true
    },
    {
      name: "category2",
      label: "Category 2",
      align: "left",
      field: (row: CatalogueItem) => row.category2,
      sortable: true
    },
    {
      name: "category3",
      label: "Category 3",
      align: "left",
      field: (row: CatalogueItem) => row.category3,
      sortable: true
    },
    {
      name: "category4",
      label: "Category 4",
      align: "left",
      field: (row: CatalogueItem) => row.category4,
      sortable: true
    },
    {
      name: "publisher",
      label: "Publisher",
      align: "left",
      field: (row: CatalogueItem) => row.publisher,
      sortable: true
    },
    {
      name: "language",
      label: "Language",
      align: "left",
      field: (row: CatalogueItem) => row.language,
      sortable: true
    }
  ];
  visibleColumns = ["abbreviation", "title"];
  get allItems() {
    return catalogue.allItems;
  }
  get ability() {
    return user.ability;
  }
  rowClick(row: CatalogueItem) {
    this.$emit("select", row.itemID);
  }
  saveChange() {
    catalogue.updateItem(this.popupEditData);
  }
  shortenText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "…";
    } else return text;
  }
  setEditData(data: CatalogueItem) {
    this.popupEditData = { ...data };
    console.log(this.popupEditData);
  }
  deleteItem(catalogueCounter: number) {
    catalogue
      .deleteItem(catalogueCounter)
      .then(response => {
        const data = response.data;
        if ((data.call = "success")) {
          alert("successfully deleted entry");
          catalogue.queryCatalogue().catch(err => console.error(err));
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  getQRCode(test: CatalogueItem, print: boolean) {
    createTestLabel(test, print);
  }
}
</script>

<style lang="scss" scoped>
.sticky-header {
  height: 90vh;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: hsla(100, 10%, 100%, 0.5);
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }
}
</style>
