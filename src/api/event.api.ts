import axios from "axios";
import { Event } from "../types/event";

const Instance = axios.create({
    baseURL: 'http://localhost:8000',
})

export const fetchEvents = async ():Promise<Event[]>=>{
    const response = await Instance.get<Event[]>('/events');
    return response.data;
}

export const fetchEvent = async (idEvent:string):Promise<Event>=>{
    const response = await Instance.get<Event>(`/event/${idEvent}`);
    return response.data;
}

export const addEvent = async (newEvent:Event):Promise<Event>=>{
    const response = await Instance.post<Event>('/event',newEvent);
    return response.data;
}
export const deleteEvent = async (idEvent:string):Promise<Event>=>{
    const response = await Instance.delete<Event>(`/event/${idEvent}`);
    return response.data;
}
export const updateEvent = async (newEvent:Event):Promise<Event>=>{
    const response = await Instance.put<Event>('/event',newEvent);
    return response.data;
}

export const ApiRequests = {
    fetchEvents,
    fetchEvent,
    addEvent,
    updateEvent,
    deleteEvent,
}as const

type Keys = keyof typeof ApiRequests;
export type RequestMethods = typeof ApiRequests[Keys];