import React from 'react';
import { NavLink, useLocation } from "react-router-dom";

export const MainMenu = () => {

    const location = useLocation();

    return (
        <>

            <div>
                <NavLink to="/">home</NavLink><br />
                {location.pathname === "/" && (
                    <>
                        <NavLink to="/user">user</NavLink><br />
                        <NavLink to="/producers">producer</NavLink>
                    </>
                )}
            </div>
        </>
    )
}
export default MainMenu;