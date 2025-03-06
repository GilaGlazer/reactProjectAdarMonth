import { useContext } from 'react';
import { EventContext } from '../context/event.context';

export const ProducerEventDetails = ()=>{
    const {selectedEvent} = useContext(EventContext);
    return(
    <>
        <div>
            <p>id:{selectedEvent?.id}</p>
            <p>name:{selectedEvent?.name}</p>
            <p>description:{selectedEvent?.description}</p>
            <p>date:{selectedEvent?.date}</p>
            <p>producerId:{selectedEvent?.producerId}</p>
        </div>
    </>
    )
}
export default ProducerEventDetails;