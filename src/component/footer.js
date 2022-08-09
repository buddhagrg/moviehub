import React from "react";
import { Container } from "reactstrap";

export default function Footer() {
    return (
        <footer>
            <Container className="d-flex p-3">
                <div><p>&#169; MovieHub</p></div>
                <div className="ms-auto"><a href="https://github.com/buddhagrg/moviehub" rel="external">Github</a></div>
            </Container>
        </footer>
    );
}