import React, { useContext, useState } from 'react';
import { ProducerContext } from '../context/producer.context';
import { useHttp } from '../custom-hooks/useHttp';
import { Producer } from '../types/producer';

export const ProducerDetails = () => {
    const [emailInput, setEmailInput] = useState('');
    const [update, setUpdate] = useState(false);

    const { data: producer, error: fetchError, isLoading: fetchLoading, request: fetchProducer } = useHttp<Producer>('/producers', 'get');
    const { error: updateError, isLoading: updateLoading, request: updateProducer } = useHttp<Producer>(`/producers/${emailInput}`, 'put');

    const { refresh } = useContext(ProducerContext);

    const submit = async (e: any) => {
        e.preventDefault();
        if (emailInput)
            await fetchProducer(`/${emailInput}`);
    };

    const submitUpdate = async (event: any) => {
        event.preventDefault();
        const updatedProducer: Producer = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
        };

        await updateProducer(updatedProducer);
        refresh!();
        setUpdate(false);
    };

    return (
        <>
            <form onSubmit={submit}>
                <input
                    type="email"
                    name="email"
                    value={emailInput}
                    placeholder="email"
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <button disabled={fetchLoading}>Search</button>
            </form>

            {fetchLoading && <p>Loading...</p>}
            {fetchError && <p>{fetchError}</p>}

            {producer && (
                <div>
                    <p>id: {producer._id}</p>
                    <p>name: {producer.name}</p>
                    <p>email: {producer.email}</p>
                    <p>phone: {producer.phone}</p>

                    <button onClick={() => setUpdate(true)}>Update</button>

                    {update && (
                        <form onSubmit={submitUpdate}>
                            <input type="text" name="name" placeholder="name" />
                            <input type="email" name="email" placeholder="email" />
                            <input type="text" name="phone" placeholder="phone" />
                            <button disabled={updateLoading}>Update</button>
                            {updateError && <p>{updateError}</p>}
                        </form>
                    )}
                </div>
            )}
        </>
    );
};

export default ProducerDetails;
