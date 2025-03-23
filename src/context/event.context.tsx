import { createContext, useState } from "react"
import { Event } from '../types/event'
import { useHttp } from "../custom-hooks/useHttp";

type EventContextType = {
    events: Event[] | undefined,
    //selectedEvent: Event | null,
    //updateEvent: (id: string, newEvent: Event) => void;
    refresh(): Promise<unknown>
}
export const EventContext = createContext<Partial<EventContextType>>({});

export const EventProvider = (props: any) => {

    const { data, error, isLoading, request } = useHttp<Event[]>('/events', 'get');

    const [events, setEvents] = useState<Event[]>([]); // סוג של מערך אירועים או undefined
    //const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // סוג של Event או null

    // // פונקציה לעדכון ארוע
    // const updateEvent = (id: string, newEvent: Event) => {
    //     setEvents((prevEvents) =>
    //         prevEvents?.map((event) =>
    //             event.id === id ? newEvent : event
    //         )
    //     );
    // };
     // פונקציה לרענון הנתונים
    const refresh = async () => {
        const response = await request(); // קריאה ל-API
        if (response!=null) {
            setEvents(response); // עדכון ה-state עם התשובה שהתקבלה
        }
    };

    const contextValue: EventContextType = {
        events,
        //updateEvent,
        refresh,
    }
    // החזרת הקונטקסט עם הערכים המתאימים
    return (
        <EventContext.Provider value={contextValue}>
            {isLoading && 'Loading...'}
            {error && error}
            {!error && props.children}        
        </EventContext.Provider>
    );
}