import { createContext } from  "react"
import {Event} from '../types/event'

type EventContextType={
    events:Event[] | undefined,
    selectedEvent:Event|null,
    updateEvent:(oldEvent:Event,newEvent:Event)=>void;
}
export const EventContext = createContext<Partial<EventContextType>>({});

export const EventProvider = (props:any) =>{
    
}