import React, { useContext } from "react";
import { EventContext } from "../context/event.context";
import { Event } from '../types/event';
import { useHttp } from "../custom-hooks/useHttp";
import { useParams } from "react-router-dom";

export const AddEvent = () => {
    const { email } = useParams();
    const { request } = useHttp('/events', 'post');
    const { refresh } = useContext(EventContext);

    const submit = async (event: any) => {
        event.preventDefault();
        const newEvent: Event = {
            name: event.target.name.value,
            date: event.target.date.value,
            producerEmail: email || '',
        }

        try {
            await request(undefined, newEvent);
            await refresh!();
            event.target.reset();
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <>
            <form onSubmit={submit}>
                <input type="text" name="name" placeholder="name" required />
                <input type="datetime-local" name="date" placeholder="date" required />
                <button type="submit">add event</button>
            </form>
        </>
    );
}
