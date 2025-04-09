import React, { useEffect } from 'react';
import { useHttp } from '../custom-hooks/useHttp';
import { NavLink, useParams } from 'react-router-dom';
import '../style/ProducerEventList.css';  

export const ProducerEventList = () => {
    const { email } = useParams();

    const { data: events, error: eventsError, isLoading: eventsLoading, request: requestGetAllEvents } = useHttp<Event>('/events', 'get');
    const { error: deleteEventError, request: requestDeleteEvent } = useHttp('', 'delete');

    useEffect(() => {
        if (email) {
            requestGetAllEvents();
        }
    }, [email, requestGetAllEvents]);

    const deleteFunc = async (eventId: string) => {
        try {
            await requestDeleteEvent(`/events/${eventId}`); // העבר את ה-URL הדינמי כאן
            await requestGetAllEvents(); // רענן את רשימת האירועים
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div className="producer-event-list">
            {eventsLoading && <p className="loading-text">Loading events...</p>}
            {eventsError && <p className="error-text">Error loading events: {eventsError}</p>}
            <ul>
                {Array.isArray(events) &&
                    events
                        .filter(event => event.producerEmail === email)
                        .map(event =>
                            <li key={event._id}>
                                <NavLink to={`/producers/sign-in/${email}/${event._id}`}>
                                    {event.name}
                                </NavLink>
                                <button onClick={() => deleteFunc(event._id)}>Delete</button>
                                {deleteEventError && <p className="error-text">{deleteEventError}</p>}
                            </li>
                        )
                }
            </ul>
        </div>
    );
};

export default ProducerEventList;
