import { createSlice } from "@reduxjs/toolkit";
import { getMoviesPath } from "../utils/paths";

const initialState = {
    loading: false,
    movies: {},
    error: ""
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        getMovies: state => {
            state.loading = true
        },
        getMoviesSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = "";
            state.movies = payload;
        },
        getMoviesFailure: (state, { error }) => {
            state.loading = false;
            state.error = error;
            state.movies = {};
        },
    }
});

export const { getMovies, getMoviesSuccess, getMoviesFailure } = moviesSlice.actions;
export default moviesSlice.reducer;

export const fetchMovies = (pageNo) => {
    return async dispatch => {
        dispatch(getMovies());
        try {
            const response = await fetch(`${getMoviesPath + pageNo}`);
            const data = await response.json();
            dispatch(getMoviesSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(getMoviesFailure(error));
        }
    }
}