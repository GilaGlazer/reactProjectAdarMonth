import { useContext } from 'react';
//import { EventContext } from '../context/event.context';

export const ProducerEventDetails = (props: any) => {
    //const {selectedEvent} = useContext(EventContext);
    const { event } = props;
    return (
        <>
            <div>
                <p>id:{event?.id}</p>
                <p>name:{event?.name}</p>
                <p>description:{event?.description}</p>
                <p>date:{event?.date}</p>
                <p>producerId:{event?.producerId}</p>
            </div>
        </>
    )
}
export default ProducerEventDetails;