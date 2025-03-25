import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../context/event.context';
import { useHttp } from '../custom-hooks/useHttp';
import { NavLink, useParams } from 'react-router-dom';

export const ProducerEventList = () => {
    const {email} = useParams();

    const [idEvent, setIdEvent] = useState('');
    const { refresh } = useContext(EventContext);

    const { data: events, error: eventsError, isLoading: eventsLoading, request: requestGetAllEvents } = useHttp<Event>('/events', 'get');
    const { error: deleteEventError, isLoading: deleteEventLoading, request: requestDeleteEvent } = useHttp(`/events/${idEvent}`, 'delete');

    useEffect(() => {
        if (email) {
            requestGetAllEvents();
        }
    }, [email, requestGetAllEvents])

    const deleteFunc = async (eventId: string) => {
        
        await setIdEvent(eventId);
        try {
            await requestDeleteEvent();  // שלח את הבקשה עם ה- URL המלא
            //refresh!(); // רענן את רשימת האירועים אחרי מחיקה
            setIdEvent('');
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };
    return (
        <>
            {eventsLoading && <p>Loading events...</p>}
            {eventsError && <p>Error loading events: {eventsError}</p>}
            <ul>
                {Array.isArray(events) &&
                    events
                        .filter(event => event.producerEmail === email)
                        .map(event =>
                            <li key={event._id}>
                                <NavLink to={`/producers/sign-in/${email}/${event._id}`}>
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