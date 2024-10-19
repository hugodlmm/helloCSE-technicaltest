<template>
  <div>
    <h1 v-if="searchInput.length === 0" class="text-2xl bold my-12">Film populaire</h1>
    <h1 v-if="searchInput.length > 0" class="text-2xl bold my-12">Votre recherche</h1>
    <TransitionGroup
      name="movie-list"
      tag="div"
      :class="[
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 my-12',
        { hidden: searchInput.length > 0 },
      ]"
    >
      <MovieCard v-for="movie in movies" :key="movie?.id" :dataMovie="movie" flat class="w-full" />
    </TransitionGroup>
    <TransitionGroup
      name="movie-list"
      tag="div"
      :class="[
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 my-12',
        { hidden: searchInput.length === 0 },
      ]"
    >
      <MovieCard v-for="movie in searchedMovies" :key="movie?.id" :dataMovie="movie" flat class="w-full" />
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useFetch, useDebounceFn } from "@vueuse/core";
import type { Media } from "~/types/tmdb";
import MovieCard from "~/components/ui/MovieCard.vue";
import { useInfiniteScroll } from "~/composables/useInfiniteScroll";
import { useSearchState } from "~/composables/useSearchState";

const { searchInput } = useSearchState();
const newMoviesPage = ref(1);
const searchMoviesPage = ref(1);
const movies = ref<Media[]>([]);
const searchedMovies = ref<Media[]>([]);

const loadMoreMovies = async () => {
  const newMovies = await getMovies(newMoviesPage.value);
  movies.value.push(...newMovies);
  movies.value = movies.value.filter((movie, index, self) => self.findIndex((m) => m.id === movie.id) === index);
  newMoviesPage.value++;
};

const loadMoreSearchedMovies = async () => {
  const newMovies = await searchMovies(searchInput.value, searchMoviesPage.value);
  searchedMovies.value.push(...newMovies);
  searchedMovies.value = searchedMovies.value.filter(
    (movie, index, self) => self.findIndex((m) => m.id === movie.id) === index
  );
  searchMoviesPage.value++;
};

const loadMore = async () => {
  if (searchInput.value.length === 0) {
    await loadMoreMovies();
  } else {
    await loadMoreSearchedMovies();
  }
};

useInfiniteScroll(loadMore);

const getMovies = async (page: number) => {
  const { data } = await useFetch("/api/tmdb/getMovies", {
    method: "POST",
    body: JSON.stringify({ page: page || 1 }),
  });
  if (typeof data.value === "string") {
    return JSON.parse(JSON.parse(data.value).body).results;
  }
  return [];
};

const searchMovies = async (searchInput: string, page: number) => {
  const { data } = await useFetch("/api/tmdb/searchMovies", {
    method: "POST",
    body: JSON.stringify({ query: searchInput, page: page || 1 }),
  });
  if (typeof data.value === "string") {
    return JSON.parse(JSON.parse(data.value).body).results;
  }
  return [];
};

const debouncedSearch = useDebounceFn(async (query: string) => {
  if (query.length === 0) {
    if (movies.value.length === 0) {
      movies.value = await getMovies(1);
      newMoviesPage.value = 2;
    }
  } else {
    searchedMovies.value = await searchMovies(query, 1);
    searchMoviesPage.value = 2;
  }
}, 500);

watch(searchInput, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    debouncedSearch(newValue);
  }
});

onMounted(async () => {
  movies.value = await getMovies(1);
  newMoviesPage.value = 2;
});

definePageMeta({
  layout: "default",
});
</script>

<style scoped>
.movie-list-move,
.movie-list-enter-active,
.movie-list-leave-active {
  transition: all 0.5s ease;
}

.movie-list-enter-from,
.movie-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.movie-list-leave-active {
  position: absolute;
}
</style>
