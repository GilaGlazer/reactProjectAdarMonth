import React from 'react';
import { NavLink } from "react-router-dom";

export const MainMenu = () => {
    return (
        <>
            <div>
                <NavLink to="/">home</NavLink><br />
                <NavLink to="/user">user</NavLink><br />
                <NavLink to="/producer">producer</NavLink>
            </div>
        </>
    )
}
export default MainMenu;