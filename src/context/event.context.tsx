import { createContext ,useState} from "react"
import { Event } from '../types/event'

type EventContextType = {
    events: Event[] | undefined,
    selectedEvent: Event | null,
    updateEvent: (oldEvent: Event, newEvent: Event) => void;
}
export const EventContext = createContext<Partial<EventContextType>>({});

export const EventProvider = (props: any) => {

    const [events, setEvents] = useState<Event[] | undefined>([]); // סוג של מערך אירועים או undefined
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // סוג של Event או null

    // פונקציה לעדכון ארוע
    const updateEvent = (oldEvent: Event, newEvent: Event) => {
        setEvents((prevEvents) =>
            prevEvents?.map((event) =>
                event.id === oldEvent.id ? newEvent : event
            )
        );
    };

   // החזרת הקונטקסט עם הערכים המתאימים
   return (
    <EventContext.Provider value={{ events, selectedEvent, updateEvent }}>
        {props.children}
    </EventContext.Provider>
);
}