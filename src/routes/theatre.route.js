import { Router } from "express";

import {
    createTheatre,
    deleteTheatre,
    getTheatreById,
    getTheatreByFilter,
    updateTheatre,
    addMovieInTheatre,
    deleteMovieInTheatre
} from "../controllers/theatre.controller.js";
import { validateBody, validateQuery } from "../middlewares/validate.middleware.js";
import {
    createTheatreValidator,
    filterQuerySchemaValidator,
} from "../validators/theatre.validator.js";

export const theatreRoute = Router();

theatreRoute.post("/", validateBody(createTheatreValidator), createTheatre);

theatreRoute.get("/", validateQuery(filterQuerySchemaValidator), getTheatreByFilter);
theatreRoute.get("/:id", getTheatreById);

theatreRoute.put("/:id", updateTheatre);

theatreRoute.patch("/:id/movies", addMovieInTheatre);
theatreRoute.delete("/:id/movies", deleteMovieInTheatre);

theatreRoute.delete("/:id", deleteTheatre);