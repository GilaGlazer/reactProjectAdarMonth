import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../style/producerMenu.css';

export const ProducerMenu = () => {
    const [emailInput, setEmailInput] = useState('');
    const [showInputEmail, setShowInputEmail] = useState(false);
    const navigate = useNavigate();

    const submit = (event: any) => {
        event.preventDefault();
        if (emailInput) {
            navigate(`/producers/sign-in/${emailInput}`);
        }
    };

    return (
        <div className="producer-menu">
            {!showInputEmail && (
                <>
                    <NavLink to="/producers/sign-up">Sign up</NavLink>
                    <button onClick={() => setShowInputEmail(true)}>Sign in</button>
                </>
            )}

            {showInputEmail && (
                <form onSubmit={submit}>
                    <input
                        required
                        type="email"
                        name="email"
                        value={emailInput}
                        placeholder="Email"
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    <button type="submit">Sign in by email</button>
                </form>
            )}
        </div>
    );
};

export default ProducerMenu;
