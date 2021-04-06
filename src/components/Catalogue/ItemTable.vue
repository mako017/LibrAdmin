<template>
  <div class="col">
    <q-table
      :grid="$q.screen.xs"
      :dense="$q.screen.lt.md"
      title="Catalogue"
      :data="allItems"
      :columns="columns"
      :rows-per-page-options="[0]"
      row-key="name"
    >
      <template v-slot:body="props" v-if="ability.can('manage', 'tests')">
        <q-tr :props="props">
          <q-menu anchor="bottom left" self="top left" context-menu>
            <q-item v-close-popup clickable>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item v-close-popup clickable>
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
          <q-td key="status" :props="props">
            {{ props.row.status }}
            <q-popup-edit
              v-model="popupEditData.status"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.status" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="title" :props="props">
            {{ props.row.title }}
            <q-popup-edit
              v-model="popupEditData.title"
              @show="() => setEditData(props.row)"
              @save="val => saveChange()"
              buttons
            >
              <q-input v-model="popupEditData.title" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="authors" :props="props">
            {{ props.row.authors }}
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

@Component({})
export default class ItemTable extends Vue {
  popupEditData: CatalogueItem = emptyCatalogueItem();
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
  get ability() {
    return user.ability;
  }
  saveChange() {
    catalogue.updateItem(this.popupEditData);
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
          catalogue.queryCatalogue();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}
</script>

<style scoped></style>
