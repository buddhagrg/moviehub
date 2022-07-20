import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/moviesSlice";
import filteredMovieReducer from "./slices/searchMovieSlice";

export default configureStore({
    reducer: {
        movies: movieReducer,
        filteredMovies: filteredMovieReducer
    }
});