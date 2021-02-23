<template>
  <q-page class="column q-pa-md">
    <h4>Testothek der Universität des Saarlandes</h4>
    <WideBlog />
    <div class="row justify-center q-mb-sm q-mt-sm">
      <NarrowBlog />
      <NarrowBlog />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import WideBlog from "components/Home/WideBlog.vue";
import NarrowBlog from "components/Home/NarrowBlog.vue";

@Component({
  components: {
    WideBlog,
    NarrowBlog
  }
})
export default class PageIndex extends Vue {}
</script>
