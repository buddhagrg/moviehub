import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/main.css";
import store from './store';
import App from "./app";

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);