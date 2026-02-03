import { Router } from "express";
import { createMovie, deleteMovie, getMovieById, getMovieByName, updateMovie } from "../controllers/movie.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { createMovieValidator } from "../validators/movie.validator.js";

export const movieRoute = Router();

movieRoute.post("/", validateBody(createMovieValidator), createMovie);

movieRoute.get("/", getMovieByName);
movieRoute.get("/:mId", getMovieById);

movieRoute.put("/:mId", updateMovie);

movieRoute.delete("/:mId", deleteMovie);