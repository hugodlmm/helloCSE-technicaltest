<template>
  <v-img
    class="align-end text-white rounded-2xl"
    height="400"
    :src="TMDB_IMAGE_BASE_THUMBNAIL + movieDetails?.backdrop_path"
    cover
  ></v-img>

  <div class="flex justify-between my-6">
    <div class="tags-container flex gap-4">
      <span
        class="tags my-2 bg-white/30 py-2 px-4 text-[12px] rounded-md"
        v-for="(tag, index) in movieDetails?.genres"
        :key="index"
      >
        {{ tag.name }}
      </span>
    </div>
    <v-card-subtitle class="pt-4 bg-white/30 rounded-md"> {{ movieDetails?.vote_average ?? 0 }} / 10 </v-card-subtitle>
  </div>

  <div class="flex justify-between my-6">
    <div class="flex flex-col">
      <p v-if="crew" class="my-4">Director : {{ crew[0].name }}</p>

      <v-card-title class="bg-black/70 w-fit rounded-tr-xl">{{
        movieDetails?.title ?? movieDetails?.original_title ?? ""
      }}</v-card-title>
    </div>
    <div class="flex flex-col">
      <p>Release date:</p>
      <v-card-subtitle> {{ movieDetails?.release_date ?? "" }} </v-card-subtitle>
    </div>
  </div>

  <v-card-text class="pt-4"> {{ movieDetails?.overview ?? "" }} </v-card-text>
</template>

<script lang="ts" setup>
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";

import type { Media, Person } from "~/types/tmdb";

defineProps<{
  movieDetails?: Media;
  crew?: Person[];
}>();
</script>
