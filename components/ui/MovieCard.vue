<template>
  <v-card class="mx-auto w-full shadow-none" style="background-color: rgb(var(--v-theme-background))">
    <nuxt-link :to="'movie/' + dataMovie.id">
      <v-img
        class="align-end text-white rounded-2xl"
        height="200"
        :src="TMDB_IMAGE_BASE_THUMBNAIL + dataMovie.poster_path"
        cover
      >
        <v-card-title class="bg-black/70 w-fit rounded-tr-xl">{{ dataMovie.title ?? dataMovie.original_title ?? "" }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4"> {{ dataMovie.overview ?? "" }} </v-card-subtitle>

      <v-card-subtitle class="pt-4"> {{ dataMovie.vote_average ?? 0 }} / 10 </v-card-subtitle>
    </nuxt-link>
  </v-card>
</template>

<script lang="ts" setup>
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";
import type { Media } from "~/types/tmdb";

defineProps<{
  dataMovie: Media;
}>();
</script>
