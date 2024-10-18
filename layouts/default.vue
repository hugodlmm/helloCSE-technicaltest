<template>
  <v-layout class="rounded-md">
    <v-app-bar>
      <GlobalNavBar @update-search-input="atSearchUpdate" />
    </v-app-bar>

    <div class="main mx-auto w-4/5">
      <v-main class="d-flex align-center justify-center" style="min-height: 300px">
        <slot :search="searchInput" />
      </v-main>
    </div>
  </v-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import GlobalNavBar from "../components/global/NavBar.vue";

const searchInput = ref("");

const atSearchUpdate = (value: string) => {
  searchInput.value = value;
};
</script>
