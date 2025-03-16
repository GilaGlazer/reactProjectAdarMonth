import React from 'react';
import { NavLink } from 'react-router-dom';

export const ProducerMenu = () => {
    return (
        <>
            <div>
                <NavLink to="/exist-producer">sign in</NavLink><br />
                <NavLink to="/add-producer">sign up</NavLink>
            </div>
        </>
    )
}
export default ProducerMenu;