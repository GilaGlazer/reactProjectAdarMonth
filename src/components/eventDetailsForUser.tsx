import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../custom-hooks/useHttp';
import {Event} from '../types/event';
export const EventDetailsForUser = () => {
    const { id } = useParams();
    const { data: event, error, isLoading, request: getById } = useHttp<Event | null>(`/events/${id}`, 'get');
    
    useEffect(() => {
        if (id)
            getById();
    }, [id, getById])
   
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
                    <p><strong>producerEmail:</strong> {event.producerEmail}</p>
                </div>
            ) : (
                <p>Event not found</p>
            )}
        </>
    );
}
export default EventDetailsForUser;