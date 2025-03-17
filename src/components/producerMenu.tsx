import React from 'react';
import { NavLink } from 'react-router-dom';

export const ProducerMenu = () => {
    return (
        <>
            <div>
                <NavLink to="/exist-producer">sign in</NavLink><br />
                <NavLink to="/producers/sign-up">sign up</NavLink>
            </div>
        </>
    )
}
export default ProducerMenu;