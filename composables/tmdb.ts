const getMovies = async (page?: number) => {
  const { data } = await useFetch("/api/tmdb/getMovies", {
    method: "POST",
    body: JSON.stringify({ page: page || 1 }),
  });
  if (typeof data.value === "string") {
    return JSON.parse(JSON.parse(data.value).body).results;
  }
};

const searchMovies = async (query: string, page?: number) => {
  const { data } = await useFetch("/api/tmdb/searchMovies", {
    method: "POST",
    body: JSON.stringify({ query, page: page || 1 }),
  });
  if (typeof data.value === "string") {
    return JSON.parse(JSON.parse(data.value).body).results;
  }
};

const getMovie = async (id: string) => {
  const { data } = await useFetch(`/api/tmdb/movie/${id}`);
  if (typeof data.value === "string") {
    return JSON.parse(data.value);
  }
};

export { getMovies, getMovie, searchMovies };
