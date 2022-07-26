import React from "react";
import Header from "./component/header/Header";
import Footer from "./component/footer";

export default function Layout({ children }) {
    return (
        <div>
            <Header />
            <main className="mt-4">{children}</main>
            <Footer />
        </div>
    );
}