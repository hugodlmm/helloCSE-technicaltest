import type { Credits, Media, MediaType, PageResult, Person } from "../../types/tmdb";

const apiKey = useRuntimeConfig();

const postOptions = (methods: string) => {
  return {
    method: methods,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey.TMDB_KEY}`,
    },
  };
};

const baseUrl = "https://api.themoviedb.org/3";

const getMovies = async (page?: number) => {
  const url = `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${
    page || 1
  }&sort_by=popularity.desc`;
  const response = await fetch(url, postOptions("GET"));
  const data = (await response.json()) as PageResult<Media>[];
  return data;
};

const getMovie = async (id: string) => {
  const url = `${baseUrl}/movie/${id}`;
  const response = await fetch(url, postOptions("GET"));
  const data = (await response.json()) as Media;
  return data;
};

const searchMovies = async (query: string, page?: number) => {
  const url = `${baseUrl}/search/movie?include_adult=false&include_video=false&language=fr-FR&page=${
    page || 1
  }&query=${query}`;
  const response = await fetch(url, postOptions("GET"));
  const data = (await response.json()) as PageResult<Media>;
  return data;
};

const getCredits = async (id: string) => {
  const url = `${baseUrl}/movie/${id}/credits?language=fr-FR`;
  const response = await fetch(url, postOptions("GET"));
  const data = (await response.json()) as Credits;
  return data;
};

export { getMovies, getMovie, searchMovies, getCredits };
