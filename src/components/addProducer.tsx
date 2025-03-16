import { useContext } from "react"
import { ProducerContext } from "../context/producer.context"
import { Producer } from "../types/producer";
import { useHttp } from "../custom-hooks/useHttp";

export const AddProducer = () => {

    const { data, error, isLoading, request } = useHttp('/producer', 'post');
    //const producer = useContext(ProducerContext);
    const { refresh } = useContext(ProducerContext);

    const submit = async (event: any) => {
        event.preventDefault();
        const newProducer: Producer = {
            id: event.target.id.value,
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            events: event.target.events.value,
        }
        await request(newProducer);
        refresh!();
    }
    return (<>
        <form onSubmit={submit}>
            <input type="text" placeholder="id" />
            <input type="text" placeholder="name" />
            <input type="email" placeholder="email" />
            <input type="text" placeholder="phone" />
            <button disabled={isLoading}>add</button>
        </form>
        {error && <span>{error}</span>}
    </>)
}