import { useContext } from "react"
import { EventContext } from "../context/event.context";
import { Event } from '../types/event'
import { useHttp } from "../custom-hooks/useHttp";
export const AddEvent = () => {

    const { data, error, isLoading, request } = useHttp('/events', 'post');
    const { refresh } = useContext(EventContext);
    const submit = async (event: any) => {
        event.preventDefault();
        const newEvent: Event = {
            name: event.target.name.value,
            date: event.target.date.value,
            producerEmail: event.target.producerEmail.value
        }
        try {
            await request(newEvent);
            //await refresh!();
            event.target.reset();
        } catch (error) {
            console.log(error);
        }
    }
    return (<>
        <form onSubmit={submit}>
            {/* <input type="text"  placeholder="name" /> */}
            <input type="text" name="name" placeholder="name" />
            <input type="text" name="date" placeholder="date" />
            <input type="text" name="producerEmail" placeholder="producerEmail" />
            <button disabled={isLoading}>add</button>
        </form>
        {error && <span>{error}</span>}
    </>)
}