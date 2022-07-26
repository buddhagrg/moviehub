import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardImg, CardBody, Container, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Layout from "./layout";
import { getPopularMovies } from "./features/listMovie/thunk";
import MovieDetail from "./component/MovieDetail";
import { getGenres } from "./utils/helpers";
import { posterImagePath } from "./constants/paths";

export default function App() {
    const dispatch = useDispatch();
    const { loading, movies, error } = useSelector(state => state.movies);
    const { results, total_pages } = movies;
    const [movieDetail, setMovieDetail] = useState(null);
    const [movieDetailModal, setMovieDetailModal] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        window.addEventListener('click', handleClick);

        return () => window.removeEventListener('click', handleClick);
    }, []);
    const handleClick = (event) => {
        const elementHasValidCss = event.target.classList.contains("movie-list") || event.target.classList.contains("movie-input");
        const element = document.getElementById("search-list");
        if (element && typeof (element)) {
            if (elementHasValidCss) {
                document.getElementById("search-list").style.display = "block";
            } else {
                document.getElementById("search-list").style.display = "none";
            }
        }
    }
    useEffect(() => {
        dispatch(getPopularMovies(1));
    }, [dispatch]);
    useEffect(() => {
        setMovieDetail(null);
        setMovieDetailModal(false);
        setPage(1);
    }, []);
    const getMovieDetails = (movieDetail) => {
        setMovieDetail(movieDetail);
        toggleMovieDetailModal();
    }
    const toggleMovieDetailModal = () => {
        setMovieDetailModal(movieDetailModal => !movieDetailModal);
    }
    const getContent = () => {
        let content = "";
        if (loading) {
            content = <div>loading data...</div>;
        } else if (error) {
            content = <div>{error}</div>;
        } else if (!Array.isArray(results) || results.length <= 0) {
            content = <div>Movies not found</div>;
        } else {
            content = results.map(movie => {
                const { id, title, genre_ids, poster_path, vote_average, release_date, overview } = movie;
                const genre = getGenres(genre_ids);
                const releaseDate = release_date && release_date.split("-")[0];
                const voteAverage = vote_average && `${vote_average}/10`;
                const posterPath = `${posterImagePath + poster_path}`;
                const movieDetail = { id, title, releaseDate, voteAverage, genre, posterPath, overview };
                return (
                    <Col lg={3} sm={6} key={id}>
                        <Card className="p-1 mb-3 home-page-card"                                    >
                            <CardImg
                                src={posterPath}
                                width="100%"
                                height="100%"
                                className="home-page-card-image"
                            />
                            <CardBody className="home-page-card-body">
                                <h4 className="mt-1">{voteAverage}</h4>
                                <h4 className="mt-3">
                                    {title}{` `}
                                    ({releaseDate})
                                </h4>
                                <Button
                                    type="button"
                                    color="primary"
                                    onClick={() => getMovieDetails(movieDetail)}
                                    className="mt-4"
                                >View Details</Button>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        }

        return content;
    }
    const handlePaginationChange = (event, pageNo) => {
        dispatch(getPopularMovies(pageNo));
        setPage(pageNo);
    }

    return (
        <>
            <Layout>
                <Container>
                    <Row>{getContent()}</Row>
                    <Box>
                        <Pagination
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "20px 0px"
                            }}
                            shape="rounded"
                            color="primary"
                            size="large"
                            count={total_pages ? (total_pages > 500 ? 500 : total_pages) : 0}
                            page={page}
                            onChange={handlePaginationChange}
                        />
                    </Box>
                </Container>

                <MovieDetail
                    movieDetailModal={movieDetailModal}
                    closeMovieDetailModal={toggleMovieDetailModal}
                    movieDetail={movieDetail}
                />
            </Layout >
        </>
    );
}