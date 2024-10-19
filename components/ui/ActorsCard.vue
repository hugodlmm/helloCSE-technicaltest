<template>
  <h3 class="text-2xl bold my-12">Actors :</h3>
  <div
    class="credits grid content-stretch items-stretch justify-stretch grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-12"
  >
    <div class="flex flex-col justify-between" v-for="(person, index) in credits?.cast.splice(0, 8)" :key="index">
      <div class="h-full w-full">
        <div
          class="actors bg-cover aspect-[9/16]"
          :style="{
            'background-image': person.profile_path
              ? `url(${TMDB_IMAGE_BASE_THUMBNAIL + person.profile_path})`
              : 'url(/default-avatar.png)',
          }"
        ></div>
        <p class="min-h-10 mt-2">{{ person.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";

import type { Credits } from "~/types/tmdb";

defineProps<{
  credits?: Credits;
}>();
</script>
