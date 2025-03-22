import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const ProducerMenu = () => {

    const [emailInput, setEmailInput] = useState('');
    const [showInputEmail, setShowInputEmail] = useState(false);

    const navigate = useNavigate();

    const submit = (event: any) => {
        event.preventDefault();
        if (emailInput)
            navigate(`/producers/sign-in/${emailInput}`);
    }
    return (
        <>
            <div>
                {!showInputEmail && <>
                    <NavLink to={"/producers/sign-up"}>sign up</NavLink><br />
                    <button onClick={() => setShowInputEmail(true)}>sign in</button>
                </>
                }
                {showInputEmail &&
                    <form onSubmit={submit}>
                        <input
                            type="email"
                            name="email"
                            value={emailInput}
                            placeholder="email"
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <button type="submit">sign in by email</button>
                    </form>
                }
            </div>
        </>
    )
}
export default ProducerMenu;