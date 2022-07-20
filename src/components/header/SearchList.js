import React from "react";
import { getGenres } from "../../utils/helpers";
import { posterImagePath } from "../../utils/paths";

export default function SearchList({ movies, error, getMovieDetails }) {
    const formatList = () => {
        return <ul id="search-list">
            {
                movies.map(movie => {
                    const { id, title, genre_ids, poster_path, vote_average, release_date, overview } = movie;
                    const genre = getGenres(genre_ids);
                    const releaseDate = release_date && release_date.split("-")[0];
                    const voteAverage = vote_average && `${vote_average}/10`;
                    const posterPath = `${posterImagePath + poster_path}`;
                    const movieDetail = { id, title, releaseDate, voteAverage, genre, posterPath, overview };
                    return (
                        <li
                            key={id}
                            onClick={() => getMovieDetails(movieDetail)}
                            className="movie-list"
                        >
                            <div className="movie-list">{title}</div>
                            <span className="fw-lighter movie-list">{releaseDate}</span>
                        </li>
                    )
                })
            }
        </ul >
    }

    if (!movies || movies.length <= 0) {
        return;
    }

    if (error) {
        return (
            <ul id="search-list">
                <li key="error">{error}</li>
            </ul>
        );
    }

    return formatList()
}