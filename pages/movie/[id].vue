<template>
  <v-card class="mx-auto w-full mb-10" style="background-color: rgb(var(--v-theme-background)); max-width: 80vw">
    <div v-if="loaded">
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
        <v-card-subtitle class="pt-4 bg-white/30 rounded-md">
          {{ movieDetails?.vote_average ?? 0 }} / 10
        </v-card-subtitle>
      </div>

      <div class="flex justify-between my-6">
        <v-card-title class="bg-black/70 w-fit rounded-tr-xl">{{
          movieDetails?.title ?? movieDetails?.original_title ?? ""
        }}</v-card-title>
        <div class="flex flex-col">
          <p>Release date:</p>
          <v-card-subtitle> {{ movieDetails?.release_date ?? "" }} </v-card-subtitle>
        </div>
      </div>

      <v-card-text class="pt-4"> {{ movieDetails?.overview ?? "" }} </v-card-text>

      <TMDBCommentForm />

      <h3 class="text-2xl bold my-12">Actors :</h3>
      <div
        class="credits grid content-stretch items-stretch justify-stretch grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-12"
      >
        <div class="flex flex-col justify-between h-40 sm:h-44 md:h-48" v-for="(person, index) in credits.cast" :key="index">
          <div
            class="actors h-full w-full bg-cover aspect-[9/16]"
            :style="{
              'background-image': person.profile_path
                ? `url(${TMDB_IMAGE_BASE_THUMBNAIL + person.profile_path})`
                : 'url(/default-avatar.png)',
            }"
          ></div>
          <p class="min-h-10">{{ person.name }}</p>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";
import TMDBCommentForm from '~/components/global/movieComment.vue'
import type { Credits, Media } from "~/types/tmdb";

const route = useRoute();
const id = route.params.id;

const movieDetails = ref();
const credits = ref();
const loaded = ref(false);

onMounted(() => {
  Promise.all([getMovie(id), getCredits(id)]).then(([movie, credit]) => {
    movieDetails.value = movie as Media;
    credits.value = credit as Credits;
    loaded.value = true;
  });
});

definePageMeta({
  layout: "default",
});

const getMovie = async (id?: string | string[]) => {
  if (!id) return;
  if (Array.isArray(id)) return;
  const res = await fetch(`/api/tmdb/movie/${id}`).then((res) => res.json());
  if (res.statusCode === 200) {
    return JSON.parse(res.body);
  } else {
    return { error: JSON.parse(res.body) };
  }
};

const getCredits = async (id?: string | string[]) => {
  if (!id) return;
  if (Array.isArray(id)) return;
  const res = await fetch(`/api/tmdb/credit/${id}`).then((res) => res.json());
  if (res.statusCode === 200) {
    return JSON.parse(res.body);
  } else {
    return { error: JSON.parse(res.body) };
  }
};
</script>
