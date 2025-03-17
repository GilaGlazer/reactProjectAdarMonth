import { useContext } from "react"
import { EventContext } from "../context/event.context";
import {Event} from '../types/event'
import { useHttp } from "../custom-hooks/useHttp";
export const AddEvent = () => {

    const { data, error, isLoading, request } = useHttp('/events', 'post');
    const { refresh } = useContext(EventContext);

   // const event = useContext(EventContext);
    const submit = async (event:any) => {
        event.preventDefault();
        const newEvent:Event = {
            name: event.target.name.value,
            date: event.target.date.value,
            producerId: event.target.producerId.value
        }
       await request(newEvent);
       refresh!();
    }
    return (<>
        <form onSubmit={submit}>
            <input type="email" placeholder="name" />
            <input type="text" placeholder="date" />
            <input type="text" placeholder="producerId" />
            <button disabled={isLoading}>add</button>
        </form>   
        { error &&  <span>{error}</span>}
        </>)
}