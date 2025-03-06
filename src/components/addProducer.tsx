import { useContext } from "react"
import { ProducerContext } from "../context/producer.context"
import { Producer } from "../types/producer";

export const AddProducer = () => {

    const producer = useContext(ProducerContext);
    const submit = async (event: any) => {
        event.preventDefault();
        const newProducer: Producer = {
            id: event.target.id.value,
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            events: event.target.events.value,
        }
       // await request(newProducer);
    }
    return (<>
        <form onSubmit={submit}>
            <input type="text" placeholder="id" />
            <input type="text" placeholder="name" />
            <input type="email" placeholder="email" />
            <input type="text" placeholder="phone" />
        </form>    </>)
}