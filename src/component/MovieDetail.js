import React from "react";
import { Modal, ModalBody, Row, Col } from "reactstrap";
import { AiOutlineStar } from 'react-icons/ai';

export default function MovieDetail({ movieDetailModal, closeMovieDetailModal, movieDetail }) {
    const { posterPath, title, releaseDate, voteAverage, genre, overview } = movieDetail ? movieDetail : {};
    return (
        <Modal
            isOpen={movieDetailModal}
            toggle={closeMovieDetailModal}
            size="xl"
            centered
        >
            <ModalBody className="movie-detail-body">
                <div>
                    <button
                        className="close"
                        onClick={closeMovieDetailModal}
                        style={{ position: 'absolute', right: '15px', top: '15px' }}
                    >×</button>
                </div>
                <Row>
                    <Col lg={4} sm={12} className="text-center">
                        <img
                            src={posterPath}
                            width="100%"
                            height="500px"
                        />
                    </Col>
                    <Col lg={8} sm={12}>
                        <h1>{title}</h1>
                        <div className="my-4">
                            <h4>{releaseDate}</h4>
                            <h4>{genre}</h4>
                            <div className="d-flex">
                                <h4>{voteAverage}</h4>
                                <AiOutlineStar className="rating-star" size="1.5em" />
                            </div>
                        </div>
                        <div className="movie-overview">
                            <p>{overview}</p>
                        </div>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
}