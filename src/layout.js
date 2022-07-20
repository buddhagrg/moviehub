import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

export default function Layout({ children }) {
    return (
        <div>
            <Header />
            <main className="mt-4">{children}</main>
            <Footer />
        </div>
    );
}