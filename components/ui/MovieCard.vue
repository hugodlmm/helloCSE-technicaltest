<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="align-end text-white" height="200" :src="dataMovie.image" cover>
      <v-card-title>{{ dataMovie.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4"> {{ dataMovie.rating }} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange" text="Explore"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
const dataMovie = defineProps<{
  title: string;
  image: string;
  rating: number;
  link: string;
}>();
</script>
