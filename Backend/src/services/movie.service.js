import { Movie } from "../models/movie.model.js"
import { ApiError } from "../utils/error_class.js";


const getMovieByNameService = async (q) => {
    if (q?.m) {
        const movie = await Movie.find({ $text: { $search: q.m } }).
        lean();
        if (!movie.length) {
            throw new ApiError(404, "Movie not found");
        }
        return movie;
    }

    const pagination = {};
    pagination.limit = Math.min(Math.max(parseInt(q?.limit) || 10, 1), 100);
    pagination.skip = parseInt(q?.skip || 0);


    return await Movie.find({})
        .lean()
        .limit(pagination.limit)
        .skip(pagination.skip);
};


const getMovieByIdService = async (mId) => {
    const movie = await Movie.findById(mId);
    if(!movie) {
        const error = new Error("Movie not found");
        error.statusCode = 404;
        throw error;
    }
    return movie;
};


const createMovieService = async (data) => {
    const movie = await Movie.create(data);
    return movie;
};


const updateMovieService = async(mId, data) => {
    const movie = await Movie.findByIdAndUpdate(mId, data, { 
        new: true, runValidators: true 
    });
    if(!movie) {
        const error = new Error("Movie not found");
        error.statusCode = 404;
        throw error;
    }
    return movie;
};


const deleteMovieService = async(mId) => {
    const result = await Movie.findByIdAndDelete(mId);
    if(!result) {
        const error = new Error("Movie not found");
        error.statusCode = 404;
        throw error;
    }
    return result;
};


export { 
    getMovieByNameService,
    getMovieByIdService,
    createMovieService,
    updateMovieService,
    deleteMovieService
};