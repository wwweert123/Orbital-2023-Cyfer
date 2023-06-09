import { Link } from "react-router-dom";
import "./pages.css";

import React from "react";

const Missing = () => {
    return (
        <article style={{ padding: "100px" }} className="page">
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit our HomePage</Link>
            </div>
        </article>
    );
};

export default Missing;
