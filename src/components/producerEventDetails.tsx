import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../custom-hooks/useHttp';
import { Event } from '../types/event';
import { EventContext } from '../context/event.context';

export const ProducerEventDetails = () => {
    const { id } = useParams();
    const { data: event, error, isLoading, request: getById } = useHttp<Event | null>(`/events/${id}`, 'get');
    const { error: errorUpdate, isLoading: isLoadingUpdate, request: updateEvent } = useHttp(`/events${id}`, 'put');

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
            descreption: event.target.descreption.value,
            producerId: event.target.producerId.value
        }
        await updateEvent(updatedEvent);
       // refresh!();
        setUpdate(false);
    }
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {event ? (
                <div>
                    <p><strong>id:</strong> {event._id}</p>
                    <p><strong>name:</strong> {event.name}</p>
                    <p><strong>date:</strong> {event.date}</p>
                    <p><strong>description:</strong> {event.descreption}</p>
                    <p><strong>producerId:</strong> {event.producerId}</p>
                    <button onClick={(e) => setUpdate(true)}>update</button>
                    {update && (
                        <form onSubmit={submitUpdate}>
                            <input type="text" name="name" placeholder="name" />
                            <input type="text" name="date" placeholder="date" />
                            <input type="text" name="descreption" placeholder="descreption" />
                            <input type="text" name="producerId" placeholder="producerId" />
                            <button disabled={isLoadingUpdate}>update</button>
                            {errorUpdate && <p>{errorUpdate}</p>}
                        </form>
                    )}
                </div>
            ) : (
                <p>Event not found</p>
            )}
        </>
    );
};

export default ProducerEventDetails;
