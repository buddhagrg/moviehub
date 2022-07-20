import { createSlice } from "@reduxjs/toolkit";
import { getMoviePath } from "../utils/paths";

const initialState = {
    loading: false,
    movies: {},
    error: ""
};

const searchMovieSlice = createSlice({
    name: "filteredMovies",
    initialState,
    reducers: {
        initiateSearchMovieState: state => {
            state.loading = false;
            state.movies = {};
            state.error = "";
        },
        getSearchedMovies: state => {
            state.loading = true;
            state.movies = {};
            state.error = "";
        },
        getSearchedMoviesSuccess: (state, { payload }) => {
            state.loading = false;
            state.movies = payload;
            state.error = "";
        },
        getSearchedMoviesFailure: (state, { error }) => {
            state.loading = false;
            state.movies = {};
            state.error = error;
        }
    }
});

export const { initiateSearchMovieState, getSearchedMovies, getSearchedMoviesSuccess, getSearchedMoviesFailure } = searchMovieSlice.actions;
export default searchMovieSlice.reducer;

export const searchMovie = (movieName) => {
    return async dispatch => {
        dispatch(getSearchedMovies());
        try {
            const response = await fetch(`${getMoviePath + movieName}`);
            const data = await response.json();
            dispatch(getSearchedMoviesSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(getSearchedMoviesFailure(error));
        }
    }
}