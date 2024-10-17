import { getMovie } from "~/server/tmdb";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing id" }),
    };
  }
  const movie = await getMovie(id);
  return {
    statusCode: 200,
    body: JSON.stringify(movie),
  };
});
