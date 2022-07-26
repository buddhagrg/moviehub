import { createAsyncThunk } from "@reduxjs/toolkit";
const API_KEY = process.env.REACT_APP_API_KEY;

export const filterMovie = createAsyncThunk(
    'movies/filter',
    async (query) => {
        let result = {};
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
            if (!response.ok) {
                throw new Error("Bad Request");
            }
            result = await response.json();
        } catch (error) {
            result = { ...result, error };
        }
        return result;
    });