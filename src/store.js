import { configureStore } from "@reduxjs/toolkit";
import listMovieReducer from "./features/listMovie/slice";
import filterMovieReducer from "./features/filterMovie/slice";

export default configureStore({
    reducer: {
        movies: listMovieReducer,
        filteredMovies: filterMovieReducer
    }
});