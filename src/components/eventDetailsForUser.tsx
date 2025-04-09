import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../custom-hooks/useHttp';
import { Event } from '../types/event';
import '../style/eventDetailsForUser.css'

export const EventDetailsForUser = () => {
    const { id } = useParams();
    const { data: event, error, isLoading, request: getById } = useHttp<Event | null>(`/events/${id}`, 'get');
    
    useEffect(() => {
        if (id) {
            getById();
        }
    }, [id, getById]);

    return (
        <div className="event-details">
            {isLoading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">Error: {error}</p>}
            {event ? (
                <>
                    <h1>Event Details</h1>
                    <p><strong>Name:</strong> {event.name}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Producer Email:</strong> {event.producerEmail}</p>
                </>
            ) : (
                <p>Event not found</p>
            )}
        </div>
    );
};

export default EventDetailsForUser;
