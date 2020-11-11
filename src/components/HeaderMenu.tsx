import React from "react";
import { Link } from "react-router-dom";

export const HeaderMenu = () => {
    return (
        <div className="header-menu">
            <Link to="/">Posts</Link>
            <Link to="/comments">Comments</Link>
            <Link to="/users">Users</Link>
            <Link to="/todos">Todos</Link>
        </div>
    );
};
