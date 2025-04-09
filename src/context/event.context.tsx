import { createContext, useEffect, useState } from "react";
import { Event } from '../types/event';
import { useHttp } from "../custom-hooks/useHttp";

type EventContextType = {
    events: Event[] | undefined;
    refresh(): Promise<void>;
}

export const EventContext = createContext<Partial<EventContextType>>({});

export const EventProvider = (props: any) => {
    const { data, error, isLoading, request } = useHttp<Event[]>('/events', 'get');
    const [events, setEvents] = useState<Event[]>([]);

    const refresh = async () => {
        try {
            const response = await request("/events", "get");
            if (response!==undefined) {
                setEvents(response);  // עדכון הסטייט
            }
        } catch (error) {
            console.error('Error refreshing events:', error);
        }
    };


    const contextValue: EventContextType = {
        events,
        refresh, 
    };

    return (
        <EventContext.Provider value={contextValue}>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!error && !isLoading && props.children}
        </EventContext.Provider>
    );
};
