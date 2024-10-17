<template>
  <div>
    <h1 class="text-2xl bold my-12">Film populaire</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 my-12">
      <MovieCard flat class="w-full" v-for="movie in movies" :key="movie?.id" :dataMovie="movie" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFetch } from "@vueuse/core";
import type { Credits, Media, MediaType, PageResult, Person } from "~/types/tmdb";
import MovieCard from "~/components/ui/MovieCard.vue";
import { useInfiniteScroll } from "~/composables/useInfiniteScroll";

const page = ref(1);
const movies = ref<Media[]>([]);

const loadMoreMovies = async () => {
  const newMovies = await getMovies(page.value);
  movies.value.push(...newMovies);
  movies.value = movies.value.filter((movie, index, self) => self.findIndex((m) => m.id === movie.id) === index);
  page.value++;
};

useInfiniteScroll(loadMoreMovies);

const getMovies = async (page: number) => {
  const { data } = await useFetch("/api/tmdb/getMovies", {
    method: "POST",
    body: JSON.stringify({ page: page || 1 }),
  });
  if (typeof data.value === "string") {
    return JSON.parse(JSON.parse(data.value).body).results;
  }
};

onMounted(async () => {
  movies.value = await getMovies(page.value);
});

definePageMeta({
  layout: "default",
});
</script>
