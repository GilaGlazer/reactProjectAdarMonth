import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../style/mainMenu.css';

export const MainMenu = () => {

    const location = useLocation();

    return (
        <>
            <div className="main-menu">
                <NavLink to="/">Home</NavLink>
                {location.pathname === "/" && (
                    <>
                        <NavLink to="/user">User</NavLink>
                        <NavLink to="/producers">Producer</NavLink>
                    </>
                )}
            </div>
            <div className="container">
            </div>
        </>
    );
}

export default MainMenu;
