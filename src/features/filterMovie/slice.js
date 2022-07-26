import { createSlice } from "@reduxjs/toolkit";
import { filterMovie } from "./thunk";

const initialState = {
    loading: false,
    movies: [],
    error: ""
};

const listMovieSlice = createSlice({
    name: "filteredMovies",
    initialState,
    extraReducers: {
        [filterMovie.pending]: (state) => {
            state.loading = true;
            state.movies = [];
            state.error = "";
        },
        [filterMovie.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.movies = payload;
            state.error = "";
        },
        [filterMovie.rejected]: (state, { payload }) => {
            state.loading = false;
            state.movies = [];
            state.error = payload;
        }
    }
});

export default listMovieSlice.reducer;