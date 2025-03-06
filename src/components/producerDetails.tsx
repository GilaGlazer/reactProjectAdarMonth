import React, { useContext } from 'react';
import { ProducerContext } from '../context/producer.context';
import ProducerEventDetails from './producerEventDetails';

export const ProducerDetails = () => {
    const { selectedProducer } = useContext(ProducerContext);
    return (
        <>
            <div>
                <p>id:{selectedProducer?.id}</p>
                <p>name producer{selectedProducer?.name}</p>
                <p>email{selectedProducer?.email}</p>
                <p>phone{selectedProducer?.phone}</p>
                {selectedProducer?.events?.length? (
                    <ul>
                        {selectedProducer?.events.map((event, index) => (
                            <li key={index}>
                                <ProducerEventDetails event={event}/>                        
                                </li>
                        ))}
                    </ul>
                ) : (
                    <p>have no events</p>
                )}            </div>
        </>
    )
}
export default ProducerDetails;