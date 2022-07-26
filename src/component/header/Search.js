import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";
import { BiLoaderCircle } from "react-icons/bi";
import SearchList from "./SearchList";
import { filterMovie } from "../../features/filterMovie/thunk";
import MovieDetail from "../MovieDetail";

export default function Search() {
    const dispatch = useDispatch();
    const { loading, movies, error } = useSelector(state => state.filteredMovies);
    const { results } = movies;
    const [movieName, setMovieName] = useState("");
    const [movieDetail, setMovieDetail] = useState({});
    const [movieDetailModal, setMovieDetailModal] = useState(false);

    const handleChange = (event) => {
        const { value } = event.target;
        setMovieName(value);
    }
    useEffect(() => {
        setMovieName("");
    }, [dispatch]);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!movieName) {
                return;
            }

            dispatch(filterMovie(movieName));
        }, 500);

        return () => clearTimeout(timer);
    }, [dispatch, movieName]);
    const getMovieDetails = (movieDetail) => {
        setMovieDetail(movieDetail);
        toggleMovieDetailModal();
    }
    const toggleMovieDetailModal = () => {
        setMovieDetailModal(movieDetailModal => !movieDetailModal);
    }

    return (
        <>
            <div className="input-container">
                <Input
                    type="text"
                    name="movieName"
                    value={movieName}
                    onChange={handleChange}
                    placeholder="Search Movies"
                    className="movie-input"
                />
                {loading && <Spinner />}
            </div>
            <SearchList movies={results} error={error} getMovieDetails={getMovieDetails} />
            <MovieDetail
                movieDetailModal={movieDetailModal}
                closeMovieDetailModal={toggleMovieDetailModal}
                movieDetail={movieDetail}
            />
        </>
    );
}

export const Spinner = () => {
    return (
        <div className="spinner-container">
            <BiLoaderCircle className="spinner" size="25" />
        </div>
    );
}