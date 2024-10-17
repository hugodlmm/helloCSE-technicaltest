import { searchMovies } from "~/server/tmdb";

export default defineEventHandler(async (event) => {
  const body = JSON.parse(await readBody(event));
  const movies = await searchMovies(body.query, body.page);
  return {
    statusCode: 200,
    body: JSON.stringify(movies),
  };
});
