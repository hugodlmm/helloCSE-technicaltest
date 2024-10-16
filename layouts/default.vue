<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <GlobalNavBar />
    </v-app-bar>

    <div class="main mx-auto w-4/5">
      <v-main class="d-flex align-center justify-center" style="min-height: 300px">
        <slot />
      </v-main>
    </div>
  </v-layout>
</template>

<script lang="ts" setup>
import GlobalNavBar from "@/components/global/NavBar.vue";
</script>
