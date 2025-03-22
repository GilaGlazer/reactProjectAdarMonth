import React, { useContext, useEffect, useState } from 'react';
import { ProducerContext } from '../context/producer.context';
import { useHttp } from '../custom-hooks/useHttp';
import { Producer } from '../types/producer';
import { NavLink, useParams } from 'react-router-dom';
import { Event } from '../types/event'
import ProducerEventList from './producerEventList';
import { AddEvent } from './addEvent';

export const ProducerDetails = () => {
    const { email } = useParams();
    const [update, setUpdate] = useState(false);

    const { data: producer, error: errorProducer, isLoading: isLoadingProducer, request: requestGetProducerByEmail } = useHttp<Producer>(`/producers/${email}`, 'get');
    const { error: updateError, isLoading: updateLoading, request: requestUpdateProducer } = useHttp<Producer>(`/producers/${email}`, 'put');

    const { refresh } = useContext(ProducerContext);

    useEffect(() => {
        if (email)
            try {
                requestGetProducerByEmail();
            } catch (error) {
                console.log(error);
            }
    }, [email, requestGetProducerByEmail])

    const submitUpdate = async (event: any) => {
        event.preventDefault();
        const updatedProducer: Producer = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
        };

        await requestUpdateProducer(updatedProducer);
        refresh!();
        setUpdate(false);
    };

    return (
        <>
            {producer && (
                //  הצגת פרטי המפיק וארועיו
                <div>
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

                    <ProducerEventList element={producer._id} />

                    <button onClick={() => <AddEvent />}>add event</button>
                </div>
            )}
        </>
    );
};

export default ProducerDetails;
