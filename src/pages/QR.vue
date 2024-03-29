<template>
  <q-page class="column items-center q-pa-md">
    <QrActionSelector
      v-if="ability.can('manage', 'tests')"
      @actionChange="setAction"
    />
    <q-select
      v-if="showUserSelector"
      class="min-w"
      v-model="selectedUser"
      :options="users"
      label="User"
    />
    <QrWrapper @scanned="setContent" />
    {{ qrContent }}
    <div v-if="showStorageSelector" class="row">
      <CharacterMenu @update="setStorageCol($event)" isText />
      <CharacterMenu @update="setStorageRow($event)" :isText="false" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QrWrapper from "components/QrScanner/QrWrapper.vue";
import QrActionSelector from "components/QrScanner/QrActionSelector.vue";
import CharacterMenu from "components/QrScanner/CharacterMenu.vue";
import { QrActions } from "src/components/models";
import {
  borrowItem,
  reserveItem,
  returnItem
} from "src/assets/ts/transactions";
import { Dialog } from "quasar";
import { user, userControl } from "src/store";

@Component({ components: { QrWrapper, QrActionSelector, CharacterMenu } })
export default class QR extends Vue {
  qrContent = "";
  qrAction: QrActions = QrActions.inspect;
  storageLoc: [string, string] = ["A", "1"];
  get ability() {
    return user.ability;
  }
  get users() {
    return userControl.users.map(user => user.name);
  }
  get showUserSelector() {
    if (
      this.qrAction === QrActions.reserve ||
      this.qrAction === QrActions.borrow
    ) {
      return true;
    } else return false;
  }
  get showStorageSelector(): boolean {
    return this.qrAction === QrActions.return ? true : false;
  }
  selectedUser = "";

  setAction(action: QrActions) {
    this.qrAction = action;
  }
  setContent(content: string) {
    const urlParts = content.split("/");
    this.qrContent = urlParts.pop() || "";
    if (this.qrContent) {
      switch (this.qrAction) {
        case QrActions.return:
          this.returnMedia(this.qrContent);
          break;
        case QrActions.inspect:
          this.inspectMedia(this.qrContent);
          break;
        case QrActions.borrow:
          this.borrowMedia(this.qrContent);
          break;
        case QrActions.reserve:
          this.reserveMedia(this.qrContent);
          break;
      }
    }
    if (this.qrAction === QrActions.return && this.qrContent) {
    }
  }
  setStorageCol(val: string) {
    this.storageLoc = [val, this.storageLoc[1]];
  }
  setStorageRow(val: string) {
    this.storageLoc = [this.storageLoc[0], val];
  }
  returnMedia(mediaID: string) {
    Dialog.create({
      title: "Confirm",
      message: "Mark this test as available?",
      cancel: true,
      persistent: true
    }).onOk(() => {
      returnItem(mediaID);
    });
  }
  inspectMedia(mediaID: string) {
    void this.$router.push("/catalogue/" + mediaID);
  }
  borrowMedia(mediaID: string) {
    Dialog.create({
      title: "Confirm",
      message: `Lend this test to ${this.selectedUser}?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      borrowItem(mediaID, this.selectedUser);
    });
  }
  reserveMedia(mediaID: string) {
    Dialog.create({
      title: "Confirm",
      message: `Block this test for ${this.selectedUser}?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      reserveItem(mediaID, this.selectedUser);
    });
  }
}
</script>

<style lang="scss" scoped>
.min-w {
  min-width: 100px;
}
</style>
