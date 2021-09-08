<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card class="override">
      <q-form>
        <q-card-section>
          <q-input
            class="q-mb-xs"
            filled
            label="User Name"
            type="text"
            v-model="userCopy.name"
          ></q-input>
          <q-input
            class="q-mb-xs"
            filled
            label="E-Mail"
            type="email"
            v-model="userCopy.email"
          ></q-input>
          <q-option-group
            :options="statusOptions"
            v-model="userCopy.role"
          ></q-option-group>
        </q-card-section>
        <q-card-section class="flex column">
          <span class="text-h6">Borrowed Media</span>
          <div class="flex wrap">
            <span v-if="borrowedMedia.length === 0">Nothing here</span>
            <template v-for="(media, key) in borrowedMedia" v-else>
              <q-chip
                :key="key"
                color="primary"
                text-color="white"
                icon="remove_circle_outline"
                :label="media.abbreviation"
                clickable
                @click="removeMedia(media, 'borrow')"
              />
            </template>
          </div>
          <q-chip
            class="q-ml-auto"
            color="primary"
            text-color="white"
            icon="add_circle_outline"
            label="Add entry"
            clickable
            @click="showMediaSelector('borrow')"
          />
        </q-card-section>
        <q-card-section class="flex column">
          <span class="text-h6">Reserved Media</span>
          <div class="flex wrap">
            <span v-if="reservedMedia.length === 0">Nothing here</span>
            <template v-for="(media, key) in reservedMedia" v-else>
              <q-chip
                :key="key"
                color="primary"
                text-color="white"
                icon="remove_circle_outline"
                :label="media.abbreviation"
                clickable
                @click="removeMedia(media, 'reserve')"
              />
            </template>
          </div>
          <q-chip
            class="q-ml-auto"
            color="primary"
            text-color="white"
            icon="add_circle_outline"
            label="Add entry"
            clickable
            @click="showMediaSelector('reserve')"
          />
        </q-card-section>
        <q-separator class="q-mb-sm" />
        <q-card-section class="flex justify-between q-pa-sm">
          <q-btn
            color="red"
            text-color="white"
            label="Cancel"
            @click="closeDialog()"
          />
          <q-btn
            color="primary"
            text-color="white"
            label="Update"
            @click="saveChanges()"
          />
        </q-card-section>
      </q-form>
    </q-card>
    <MediaSelector
      v-if="showSelector"
      @closeDialog="showSelector = false"
      @saveDialog="updateFromPopup($event)"
      :user="userCopy"
      :targetList="targetList"
    />
  </q-dialog>
</template>

<script lang="ts">
import { catalogue, user, userControl } from "src/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  CatalogueItem,
  CatalogueStatus,
  ItemChange,
  TargetList,
  UserAccount,
  userRoles
} from "../models";
import MediaSelector from "src/components/UserControl/MediaSelector.vue";
import { emptyUser } from "src/assets/ts/initFunctions";

@Component({ components: { MediaSelector } })
export default class UserEditor extends Vue {
  targetList: TargetList = "borrow";
  showDialog = true;
  showSelector = false;
  @Prop({ required: true }) editUser!: UserAccount;
  userCopy = emptyUser();
  statusOptions: { value: userRoles; label: string; disable?: boolean }[] = [
    {
      value: "admin",
      label: "Admin",
      disable: user.ability.cannot("manage", "roles")
    },
    {
      value: "mod",
      label: "Moderator"
    },
    {
      value: "user",
      label: "User"
    },
    {
      value: "guest",
      label: "Guest"
    }
  ];
  changedItems: ItemChange[] = [];
  public get borrowedMedia(): CatalogueItem[] {
    return catalogue.allItems.filter(item => {
      return this.userCopy.borrowedMedia.some(borrowedItem => {
        return borrowedItem === item.itemID;
      });
    });
  }
  public get reservedMedia(): CatalogueItem[] {
    return catalogue.allItems.filter(item => {
      return this.userCopy.reservedMedia.some(borrowedItem => {
        return borrowedItem === item.itemID;
      });
    });
  }

  showMediaSelector(targetList: TargetList) {
    this.targetList = targetList;
    this.showSelector = true;
  }
  removeMedia(media: CatalogueItem, targetList: TargetList) {
    const targetsBorrowed = targetList === "borrow";
    if (targetsBorrowed) {
      if (media.status === CatalogueStatus.withUser)
        media.status = CatalogueStatus.inStock;
      else if (media.status === CatalogueStatus.withUserAndReserved)
        media.status = CatalogueStatus.reserved;
    } else {
      if (media.status === CatalogueStatus.reserved)
        media.status = CatalogueStatus.inStock;
      else if (media.status === CatalogueStatus.withUserAndReserved)
        media.status = CatalogueStatus.withUser;
    }
    const itemIndex = targetsBorrowed
      ? this.userCopy.borrowedMedia.indexOf(media.itemID)
      : this.userCopy.reservedMedia.indexOf(media.itemID);
    if (itemIndex > -1) {
      if (targetsBorrowed) this.userCopy.borrowedMedia.splice(itemIndex, 1);
      else this.userCopy.reservedMedia.splice(itemIndex, 1);
    }
  }
  applyCatalogueChanges() {
    this.changedItems.forEach(item => {
      switch (item[1]) {
        case "borrow":
          this.borrowItem(item[0]);
          break;
        case "reserve":
          this.reserveItem(item[0]);
          break;
        case "remove":
          this.removeItem(item[0]);
          break;
      }
      catalogue.updateItem(item[0]);
    });
  }
  removeItem(item: CatalogueItem) {
    if (item.status === CatalogueStatus.withUserAndReserved)
      item.status = CatalogueStatus.reserved;
    else item.status = CatalogueStatus.inStock;
    item.currentlyWith = "";
  }
  borrowItem(item: CatalogueItem) {
    item.status = CatalogueStatus.withUser;
    item.currentlyWith = this.editUser.name;
  }
  reserveItem(item: CatalogueItem) {
    if (item.status === CatalogueStatus.withUser)
      item.status = CatalogueStatus.withUserAndReserved;
    else item.status = CatalogueStatus.reserved;
  }
  closeDialog() {
    this.$emit("closeDialog");
    this.showDialog = false;
  }
  saveChanges() {
    userControl.updateUser(this.userCopy);
    this.applyCatalogueChanges();
    this.closeDialog();
  }
  updateFromPopup(update: {
    changedItems: ItemChange[];
    userCopy: UserAccount;
  }) {
    this.userCopy = update.userCopy;
    this.changedItems = update.changedItems;
    this.showSelector = false;
  }
  created() {
    this.userCopy = JSON.parse(JSON.stringify(this.editUser)) as UserAccount;
  }
}
</script>

<style lang="scss" scoped>
.override {
  position: absolute;
  z-index: 10000;
  top: 0;
  min-width: 300px;
  max-width: 400px;
}
</style>
