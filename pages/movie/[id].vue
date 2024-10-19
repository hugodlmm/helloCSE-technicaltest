<template>
  <v-card class="mx-auto w-full mb-10" style="background-color: rgb(var(--v-theme-background)); max-width: 80vw">
    <Skeleton v-if="!loaded" class="h-72 mb-4 rounded-md" />
    <Skeleton v-if="!loaded" class="h-72 mb-4 rounded-md" />
    <Skeleton v-if="!loaded" class="h-72 mb-4 rounded-md" />
    <div v-if="loaded">
      <MovieDetails :movieDetails="movieDetails" :crew="credits?.crew" />
      <TMDBCommentForm />
      <ActorsCard :credits="credits" />
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TMDBCommentForm from "~/components/ui/MovieComment.vue";
import ActorsCard from "~/components/ui/ActorsCard.vue";
import MovieDetails from "~/components/ui/MovieDetails.vue";
import Skeleton from "~/components/global/Skeleton.vue";
import type { Credits, Media } from "~/types/tmdb";

const route = useRoute();
const id = route.params.id;

const movieDetails = ref<Media>();
const credits = ref<Credits>();
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
