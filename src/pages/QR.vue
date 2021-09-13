<template>
  <q-page class="column items-center q-pa-md">
    <QrActionSelector @actionChange="setAction" />
    <QrWrapper @scanned="setContent" />
    {{ qrContent }}
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QrWrapper from "components/QrScanner/QrWrapper.vue";
import QrActionSelector from "components/QrScanner/QrActionSelector.vue";
import { QrActions } from "src/components/models";
import { returnItem } from "src/assets/ts/transactions";
import { Dialog } from "quasar";

@Component({ components: { QrWrapper, QrActionSelector } })
export default class QR extends Vue {
  qrContent = "";
  qrAction: QrActions = QrActions.inspect;

  setAction(action: QrActions) {
    this.qrAction = action;
  }
  setContent(content: string) {
    const urlParts = content.split("/");
    this.qrContent = urlParts.pop() || "";
    if (this.qrAction === QrActions.return && this.qrContent) {
      this.returnMedia(this.qrContent);
    }
  }
  returnMedia(mediaID: string) {
    Dialog.create({
      title: "Confirm",
      message: "Would you like to turn on the wifi?",
      cancel: true,
      persistent: true
    }).onOk(() => {
      console.log("clicked ok");
      returnItem(mediaID);
    });
  }
}
</script>

<style lang="scss" scoped></style>
