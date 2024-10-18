<template>
  <div class="navbar mx-auto w-4/5 flex justify-between">
    <div class="navbar navbar-logo">
      <a href="/">
        <img src="https://www.hellocse.fr/images/logo/hellocse.svg?v=2" alt="logo" />
      </a>
    </div>
    <div v-if="isHomepage" class="navbar navbar-search">
      <input type="text" v-model="searchInput" placeholder="Search" @input="updateSearch" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSearchState } from "~/composables/useSearchState";

const { searchInput, setSearchInput } = useSearchState();

const isHomepage = computed(() => {
  return useRoute().path === "/";
});

const updateSearch = () => {
  setSearchInput(searchInput.value);
};
</script>
