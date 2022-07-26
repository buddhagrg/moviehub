import { createSlice } from "@reduxjs/toolkit";
import { getPopularMovies } from "./thunk";

const initialState = {
    loading: false,
    movies: [],
    error: ""
};

const listMovieSlice = createSlice({
    name: "movies",
    initialState,
    extraReducers: {
        [getPopularMovies.pending]: (state) => {
            state.loading = true;
            state.movies = [];
            state.error = "";
        },
        [getPopularMovies.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.movies = payload;
            state.error = "";
        },
        [getPopularMovies.rejected]: (state, { payload }) => {
            state.loading = false;
            state.movies = [];
            state.error = payload;
        }
    }
});

export default listMovieSlice.reducer;