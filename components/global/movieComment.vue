<template>
  <div>
    <h3 class="text-2xl bold my-12">Comments :</h3>
    <div class="flex flex-col my-8" v-for="(comment, index) in comments" :key="index">
      <div class="text-white/30 text-[12px]">{{ comment.username }}</div>
      <div class="flex items-center">
        <span class="mr-2">Rating:</span>
        <div class="flex">
          <span v-for="star in 10" :key="star" class="text-2xl">
            {{ star <= comment.rating ? "★" : "☆" }}
          </span>
        </div>
      </div>
      <div v-html="comment.comment"></div>
      <hr class="mt-4" />
    </div>
    <form class="flex flex-col gap-5">
      <div class="flex flex-col">
        <label for="username">Username:</label>
        <input
          class="border border-white"
          id="username"
          v-model="state.username"
          type="text"
          @input="v$.username.$touch()"
        />
        <div class="text-red-500" v-if="v$.username.$error">
          {{ v$.username.$errors[0].$message }}
        </div>
      </div>

      <div class="flex flex-col">
        <label for="rating">Rating:</label>
        <div class="flex">
          <span
            v-for="star in 10"
            :key="star"
            @click="state.rating = star"
            @mouseover="hoverRating = star"
            @mouseleave="hoverRating = 0"
            class="text-2xl cursor-pointer"
          >
            {{ (hoverRating || state.rating) >= star ? "★" : "☆" }}
          </span>
        </div>
        <div class="text-red-500" v-if="v$.rating.$error">
          {{ v$.rating.$errors[0].$message }}
        </div>
      </div>

      <div class="flex flex-col">
        <label for="comment">Comment:</label>
        <client-only>
          <editor
            api-key="n6d31g01j408yebxvq4ffqtyrp15a1oyi6ynkjdki5ptcnfj"
            id="comment"
            v-model="state.comment"
            :init="editorConfig"
            @input="v$.comment.$touch()"
          />
        </client-only>
        <div class="text-red-500" v-if="v$.comment.$error">
          {{ v$.comment.$errors[0].$message }}
        </div>
      </div>
      <v-btn color="white-darken-4" @click="submitForm" :disabled="v$.$invalid">Submit</v-btn>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers, between } from "@vuelidate/validators";
import Editor from "@tinymce/tinymce-vue";

const route = useRoute();
const movieId = route.params.id;

const comments = ref([]);
const hoverRating = ref(0);

const state = reactive({
  username: "",
  rating: 0,
  comment: "",
});

const alphanumeric = helpers.regex(/^[a-zA-Z0-9\s]*$/);

const rules = {
  username: {
    required: helpers.withMessage("Username is required", required),
    minLength: helpers.withMessage("Username must be at least 3 characters long", minLength(3)),
    maxLength: helpers.withMessage("Username must be no more than 50 characters long", maxLength(50)),
    alphanumeric: helpers.withMessage("Username must contain only letters, numbers, and spaces", alphanumeric),
  },
  rating: {
    required: helpers.withMessage("Rating is required", required),
    between: helpers.withMessage("Rating must be between 1 and 10", between(1, 10)),
  },
  comment: {
    required: helpers.withMessage("Comment is required", required),
    minLength: helpers.withMessage("Comment must be at least 3 characters long", minLength(3)),
    maxLength: helpers.withMessage("Comment must be no more than 500 characters long", maxLength(500)),
  },
};

const v$ = useVuelidate(rules, state);

const editorConfig = {
  height: 300,
  menubar: false,
  plugins: ["link", "lists", "autoresize"],
  toolbar:
    "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link",
};

onMounted(() => {
  const savedData = localStorage.getItem(`tmdb-comment-${movieId}`);
  if (savedData) {
    comments.value = JSON.parse(savedData);
  }
});

const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    comments.value.push({
      username: state.username,
      rating: state.rating,
      comment: state.comment,
    });
    localStorage.setItem(`tmdb-comment-${movieId}`, JSON.stringify(comments.value));
    state.username = "";
    state.rating = 1;
    state.comment = "";
    console.log("Form submitted:", state);
  }
};
</script>
