import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../custom-hooks/useHttp';
import { Producer } from '../types/producer';
import { useParams } from 'react-router-dom';
import ProducerEventList from './producerEventList';
import { AddEvent } from './addEvent';
import '../style/producerDetails.css';

export const ProducerDetails = () => {
    const { email } = useParams();
    const [update, setUpdate] = useState(false);
    const [addEvent, setAddEvent] = useState(false);
    

    const { data: producer, request: requestGetProducerByEmail } = useHttp<Producer>(`/producers/${email}`, 'get');
    const { error: updateError, isLoading: updateLoading, request: requestUpdateProducer } = useHttp<Producer>(`/producers/${email}`, 'put');

    useEffect(() => {
        if (email) {
            try {
                requestGetProducerByEmail();
            } catch (error) {
                console.log(error);
            }
        }
    }, [email, requestGetProducerByEmail]);

    const submitUpdate = async (event: any) => {
        event.preventDefault();
        const updatedProducer: Producer = {
            name: event.target.name.value,
            email: email || '',
            phone: event.target.phone.value,
        };
        try {
            await requestUpdateProducer(undefined, updatedProducer);
            await requestGetProducerByEmail();
            setUpdate(false);
            event.target.reset();
        } catch (error) {
            console.error('Error updating producer:', error);
        }
    };

    return (
        <div className="producer-details">
            {producer && (
                <>
                    <p>Name: {producer.name}</p>
                    <p>Email: {producer.email}</p>
                    <p>Phone: {producer.phone}</p>
                    {!update && <button onClick={() => setUpdate(true)}>Update Producer</button>
                    }

                    {update && (
                        <form onSubmit={submitUpdate}>
                            <input type="text" name="name" placeholder="Name" required/>
                            <input type="text" name="phone" placeholder="Phone" required/>
                            <button disabled={updateLoading}>Update Producer</button>
                            {updateError && <p className="error">{updateError}</p>}
                        </form>
                    )}

                    <ProducerEventList />

                    <div className="add-event-container">
                        {!addEvent&&
                        <button onClick={() => setAddEvent(true)}>Add Event</button>}
                        {addEvent && <AddEvent/>}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProducerDetails;
