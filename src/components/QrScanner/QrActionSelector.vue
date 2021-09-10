<template>
  <q-option-group
    class="flex row wrap"
    v-model="action"
    :options="options"
    @input="emitChange()"
  >
  </q-option-group>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { QrActions } from "../models";

@Component
export default class QrActionSelector extends Vue {
  action = QrActions.inspect;
  options = [
    {
      label: "Return",
      value: QrActions.return
    },
    {
      label: "Reserve",
      value: QrActions.reserve
    },
    {
      label: "Borrow",
      value: QrActions.borrow
    },
    {
      label: "Inspect",
      value: QrActions.inspect
    }
  ];
  emitChange() {
    this.$emit("actionChange", this.action);
  }
}
</script>

<style scoped></style>
