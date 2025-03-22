import { useContext } from "react"
import { ProducerContext } from "../context/producer.context"
import { Producer } from "../types/producer";
import { useHttp } from "../custom-hooks/useHttp";

export const AddProducer = () => {
    const { data, error, isLoading, request } = useHttp('/producers', 'post');
    const { refresh } = useContext(ProducerContext);

    const submit = async (event: any) => {
        event.preventDefault();
        const newProducer: Producer = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
        }
        try {
            await request(newProducer);
           // await new Promise(res => setTimeout(res, 500)); // מחכה חצי שנייה לפני הרענון
          //  refresh!();
            event.target.reset();
        } catch (error) {
            console.log(error); 
        }

    }
    return (<>
        <form onSubmit={submit}>
            <input type="text" name="name" placeholder="name" />
            <input type="email" name="email" placeholder="email" />
            <input type="text" name="phone" placeholder="phone" />
            <button disabled={isLoading}>add</button>
        </form>
        {error && <span>{error}</span>}
    </>)
}