<template>
  <div class="navbar mx-auto w-4/5 flex justify-between">
    <div class="navbar navbar-logo">
      <a href="/">
        <img src="https://www.hellocse.fr/images/logo/hellocse.svg?v=2" alt="logo" />
      </a>
    </div>
    <div class="navbar navbar-search">
      <input type="text" v-model="searchInput" placeholder="Search" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const searchInput = ref("");
</script>
