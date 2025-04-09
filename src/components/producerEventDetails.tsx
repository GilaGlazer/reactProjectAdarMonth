import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../custom-hooks/useHttp';
import { Event } from '../types/event';
import { EventContext } from '../context/event.context';
import '../style/producerEventDetails.css';
export const ProducerEventDetails = () => {
    const { id, email } = useParams();
    const { data: event, error, isLoading, request: getById } = useHttp<Event | null>(`/events/${id}`, 'get');
    const { error: errorUpdate, isLoading: isLoadingUpdate, request: updateEvent } = useHttp(`/events/${id}`, 'put');

    const { refresh } = useContext(EventContext);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        if (id)
            getById();
    }, [id, getById])

    const submitUpdate = async (event: any) => {
        event.preventDefault();
        const updatedEvent: Event = {
            name: event.target.name.value,
            date: event.target.date.value,
            description: event.target.description.value,
            producerEmail: email || '',
        }
        try {
            await updateEvent(undefined, updatedEvent);
            await getById();
            setUpdate(false);
            event.target.reset();
        }
        catch (error) {
            console.error('Error updating event:', error);
        }
    }

    return (
        <div className="producer-event-details">
            {isLoading && <p className="loading-text">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {event ? (
                <>
                    <h1>Event Details</h1>
                    <p><strong>name:</strong> {event.name}</p>
                    <p><strong>date:</strong> {event.date}</p>
                    <p><strong>description:</strong> {event.description}</p>
                    <p><strong>producer Email:</strong> {event.producerEmail}</p>

                    {!update && <button onClick={() => setUpdate(true)}>Update</button>}

                    {update && (
                        <form onSubmit={submitUpdate}>
                            <input type="text" name="name" placeholder="Event Name" defaultValue={event.name} required />
                            <input type="datetime-local" name="date" defaultValue={event.date} required />
                            <input type="text" name="description" placeholder="Event Description" defaultValue={event.description} />
                            <button disabled={isLoadingUpdate}>Update Event</button>
                            {errorUpdate && <p className="error">{errorUpdate}</p>}
                        </form>
                    )}
                </>
            ) : (
                <p>Event not found</p>
            )}
        </div>
    );
};

export default ProducerEventDetails;
