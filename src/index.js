import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/style/main.css";
import store from './store';
import Home from "./pages/Home";

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Home />
    </Provider>
);