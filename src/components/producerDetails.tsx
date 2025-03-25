import React, { useContext, useEffect, useState } from 'react';
import { ProducerContext } from '../context/producer.context';
import { useHttp } from '../custom-hooks/useHttp';
import { Producer } from '../types/producer';
import { NavLink, useParams } from 'react-router-dom';
import { Event } from '../types/event';
import ProducerEventList from './producerEventList';
import { AddEvent } from './addEvent';
import { EventContext } from '../context/event.context';
import '../style/ProducerDetails.css'; // אל תשכח לייבא את ה-CSS

export const ProducerDetails = () => {
    const { email } = useParams();
    const [update, setUpdate] = useState(false);
    const [addEvent, setAddEvent] = useState(false);

    const { data: producer, error: errorProducer, isLoading: isLoadingProducer, request: requestGetProducerByEmail } = useHttp<Producer>(`/producers/${email}`, 'get');
    const { error: updateError, isLoading: updateLoading, request: requestUpdateProducer } = useHttp<Producer>(`/producers/${email}`, 'put');

    const { refresh } = useContext(ProducerContext);
    const { refresh: refreshEvent } = useContext(EventContext); // קבלת events גם כאן

    useEffect(() => {
        if (email)
            try {
                requestGetProducerByEmail();
                //refresh!();
            } catch (error) {
                console.log(error);
            }
    }, [email, requestGetProducerByEmail]);

    const submitUpdate = async (event: any) => {
        event.preventDefault();
        const updatedProducer: Producer = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
        };
        try {
            await requestUpdateProducer(updatedProducer);
            refresh!();
            setUpdate(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="producer-details">
            {producer && (
                <>
                    <p>Name: {producer.name}</p>
                    <p>Email: {producer.email}</p>
                    <p>Phone: {producer.phone}</p>
                    <button onClick={() => setUpdate(true)}>Update Producer</button>
                    
                    {update && (
                        <form onSubmit={submitUpdate}>
                            <input type="text" name="name" placeholder="Name" />
                            <input type="email" name="email" placeholder="Email" />
                            <input type="text" name="phone" placeholder="Phone" />
                            <button disabled={updateLoading}>Update Producer</button>
                            {updateError && <p className="error">{updateError}</p>}
                        </form>
                    )}

                    <ProducerEventList />

                    <div className="add-event-container">
                        <button onClick={() => setAddEvent(true)}>Add Event</button>
                        {addEvent && <AddEvent />}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProducerDetails;
