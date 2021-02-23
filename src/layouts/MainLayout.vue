<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          LibrAdmin
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from "components/EssentialLink.vue";
import { user } from "src/store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { EssentialLink }
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  get essentialLinks() {
    return [
      {
        title: "Home",
        caption: "Landing page",
        icon: "home",
        link: "./#/"
      },
      {
        title: "User Administration",
        caption: "Add, edit, and delete users",
        icon: "group",
        link: "./#/usercontrol"
      },
      {
        title: "Catalogue",
        caption: "See the complete library catalogue",
        icon: "format_list_numbered",
        link: "./#/catalogue"
      },
      {
        title: "QR Scanner",
        caption: "Scan the code inside you test",
        icon: "qr_code_scanner",
        link: "./#/qrscanner"
      },
      {
        title: user.isLoggedIn ? "My Account" : "Login",
        caption: user.isLoggedIn ? "View Account Info" : "User / Admin login",
        icon: user.isLoggedIn ? "account_box" : "login",
        link: user.isLoggedIn ? "./#/account" : "./#/login"
      }
    ];
  }
}
</script>
