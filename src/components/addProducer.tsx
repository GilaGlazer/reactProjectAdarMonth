import { Producer } from "../types/producer";
import { useHttp } from "../custom-hooks/useHttp";
import '../style/AddProducer.css'; 

export const AddProducer = () => {
    const { error, isLoading, request } = useHttp('/producers', 'post');

    const submit = async (event: any) => {
        event.preventDefault();
        const newProducer: Producer = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
        };
        try {
            await request(undefined, newProducer);
            event.target.reset();
            alert("Producer added successfully!");  
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={submit} className="add-producer-form">
                <input type="text" name="name" placeholder="Name" required/>
                <input type="email" name="email" placeholder="Email" required/>
                <input type="text" name="phone" placeholder="Phone" required/>
                <button disabled={isLoading}>Add Producer</button>
            </form>
            {error && <span>{error}</span>}
        </>
    );
};
