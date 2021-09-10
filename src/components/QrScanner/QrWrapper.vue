<template>
  <video id="qrVid"></video>
</template>

<script lang="ts">
import QrScanner from "qr-scanner";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class QrWrapper extends Vue {
  qrScanner: QrScanner | undefined;
  mounted() {
    const videoEl = document.getElementById("qrVid") as HTMLVideoElement;
    console.log(videoEl);

    this.qrScanner = new QrScanner(videoEl, result => {
      this.$emit("scanned", result);
    });
    if (this.qrScanner) {
      void this.qrScanner.start();
    }
  }
}
</script>

<style scoped>
video {
  width: 300px;
  height: 300px;
  max-width: 90vmin;
  max-height: 90vmin;
  margin: 1rem auto;
  border: 1px solid black;
}
</style>
