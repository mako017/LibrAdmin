<template>
  <div class="flex column w-limit q-mx-md btn-container">
    <q-btn
      color="primary"
      text-color="white"
      label="++"
      @click="incrementValueBy(5)"
    />
    <q-btn
      color="primary"
      text-color="white"
      label="+"
      @click="incrementValueBy(1)"
    />
    <q-input
      type="text"
      input-class="text-center"
      maxlength="2"
      v-model="asChar"
      dense
      outlined
      readonly
    />
    <q-btn
      color="primary"
      text-color="white"
      label="-"
      @click="incrementValueBy(-1)"
    />
    <q-btn
      color="primary"
      text-color="white"
      label="--"
      @click="incrementValueBy(-5)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CharacterMenu extends Vue {
  @Prop({ required: true, type: Boolean }) isText!: boolean;
  asNumber = 1;

  public get asChar(): string {
    if (this.isText) {
      return String.fromCharCode(this.asNumber + 64);
    }
    return this.asNumber.toString();
  }

  public set asChar(v: string) {
    if (this.isText) {
      this.asNumber = v.charCodeAt(0);
      return;
    }
    this.asNumber = +v;
  }

  incrementValueBy(incrementBy = 1) {
    const result = this.asNumber + incrementBy;

    if (result <= 1) {
      this.asNumber = 1;
    } else this.asNumber = result;

    this.$emit("update", this.asChar);
  }
}
</script>

<style lang="scss" scoped>
.w-limit {
  max-width: 120px;
}
.btn-container {
  * {
    margin: 0.2rem 0;
  }
}
</style>
