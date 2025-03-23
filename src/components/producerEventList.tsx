import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../context/event.context';
import { useHttp } from '../custom-hooks/useHttp';
import { NavLink } from 'react-router-dom';

export const ProducerEventList = (producerEmail: any) => {

    const [idEvent, setIdEvent] = useState('');
    const { refresh } = useContext(EventContext);

    const { data: events, error: eventsError, isLoading: eventsLoading, request: requestGetAllEvents } = useHttp<Event>('/events', 'get');
    const { error: deleteEventError, isLoading: deleteEventLoading, request: requestDeleteEvent } = useHttp(`/events/${idEvent}`, 'delete');

    useEffect(() => {
        if (producerEmail)
            requestGetAllEvents();
    }, [producerEmail, requestGetAllEvents])

    const deleteFunc = async (eventId: any) => {
        setIdEvent(eventId);
        await requestDeleteEvent();
       // refresh!();
        setIdEvent('');
    }
    return (
        <>
            {eventsLoading && <p>Loading events...</p>}
            {eventsError && <p>Error loading events: {eventsError}</p>}
            <ul>
                {Array.isArray(events) &&
                    events
                        .filter(event => event.producerEmail === producerEmail)
                        .map(event =>
                            <li key={event._id}>
                                <NavLink to={`/events/${event._id}`}>
                                    {event.name}
                                </NavLink>
                                <button onClick={() => deleteFunc(event._id)}>delete</button>
                                {deleteEventError && <p>{deleteEventError}</p>}
                            </li>
                        )
                }
            </ul>
        </>
    )
}
export default ProducerEventList;