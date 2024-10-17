import { getMovies } from "~/server/tmdb";

export default defineEventHandler(async (event) => {
  const body = JSON.parse(await readBody(event));
  const movie = await getMovies(body.page);
  return {
    statusCode: 200,
    body: JSON.stringify(movie),
  };
});
