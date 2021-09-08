<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { user } from "./store";
// if (process.env.DEV) {
import { catalogue } from "./store";
// }
@Component
export default class App extends Vue {
  created() {
    user.updateAbilities();
    user.attemptRemember();

    if (process.env.DEV) {
      catalogue.setCatalogue([
        {
          catalogueCounter: 0,
          itemID: "1",
          abbreviation: "AST",
          title: "",
          authors: "",
          status: 0,
          currentlyWith: "",
          due: "",
          abstract: "",
          category1: "",
          category2: "",
          category3: "",
          category4: "",
          image: "",
          publisher: "",
          language: ""
        },
        {
          catalogueCounter: 1,
          itemID: "2",
          abbreviation: "DESIGMA",
          title: "",
          authors: "",
          status: 0,
          currentlyWith: "",
          due: "",
          abstract: "",
          category1: "",
          category2: "",
          category3: "",
          category4: "",
          image: "",
          publisher: "",
          language: ""
        },
        {
          catalogueCounter: 2,
          itemID: "3",
          abbreviation: "IST",
          title: "",
          authors: "",
          status: 0,
          currentlyWith: "",
          due: "",
          abstract: "",
          category1: "",
          category2: "",
          category3: "",
          category4: "",
          image: "",
          publisher: "",
          language: ""
        }
      ]);
    }
  }
}
</script>
