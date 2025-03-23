import React, { useEffect, useState } from 'react';
import { useHttp } from '../custom-hooks/useHttp';
import { NavLink } from 'react-router-dom';

export const EventListForUserWithSearch = () => {

    const { data: events, error: eventsError, isLoading: eventsLoading, request: requestGetAllEvents } = useHttp<Event>('/events', 'get');
    const [search, setSearch] = useState('');

    useEffect(()=>{
        requestGetAllEvents();
    },[requestGetAllEvents,search]);
    return (
        <>
            <input
                type="text"
                name="search"
                value={search}
                placeholder="search"
                onChange={(s) => setSearch(s.target.value)} />

            {eventsLoading && <p>Loading events...</p>}
            {eventsError && <p>Error loading events: {eventsError}</p>}
            <ul>
                {Array.isArray(events) &&
                    events
                        .filter(event => event.name.toLowerCase().includes(search.toLowerCase()))
                        .map(event =>
                            <li key={event._id}>
                                <NavLink to={`/events/${event._id}`}>
                                    {event.name}
                                </NavLink>
                            </li>
                        )
                }
            </ul>
        </>
    )
}
export default EventListForUserWithSearch;