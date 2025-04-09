import React, { useEffect, useState } from 'react';
import { useHttp } from '../custom-hooks/useHttp';
import { NavLink } from 'react-router-dom';
import '../style/EventListForUserWithSearch.css';
import { Event } from '../types/event';
export const EventListForUserWithSearch = () => {

    const { data: events, error: eventsError, isLoading: eventsLoading, request: requestGetAllEvents } = useHttp<Event>('/events', 'get');
    const [search, setSearch] = useState('');

    useEffect(() => {
        requestGetAllEvents();
    }, [requestGetAllEvents, search]);

    return (
        <div className="event-list-container">
            <input
                type="text"
                name="search"
                value={search}
                placeholder="Search events..."
                onChange={(s) => setSearch(s.target.value)}
                className="search-input"
            />

            {eventsLoading && <p className="loading-text">Loading events...</p>}
            {eventsError && <p className="error-text">Error loading events: {eventsError}</p>}

            <ul className="event-list">
                {Array.isArray(events) &&
                    events
                        .filter(event => event.name.toLowerCase().includes(search.toLowerCase()))
                        .map(event =>
                            <li key={event._id} className="event-item">
                                <NavLink to={`/user/events/${event._id}`} className="event-link">
                                    {event.name}
                                </NavLink>
                            </li>
                        )
                }
            </ul>
        </div>
    )
}
export default EventListForUserWithSearch;