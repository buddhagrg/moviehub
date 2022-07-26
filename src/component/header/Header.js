import React from "react";
import {
    Container,
    Navbar,
    NavbarBrand,
    NavbarText,
} from "reactstrap";
import Search from "./Search";

export default function Header() {
    return (
        <header>
            <Container>
                <Navbar>
                    <NavbarBrand>MovieHub</NavbarBrand>
                    <NavbarText>
                        <Search />
                    </NavbarText>
                </Navbar>
            </Container>
        </header>
    );
}