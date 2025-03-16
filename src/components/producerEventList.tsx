import React, { useContext } from 'react';
import { EventContext } from '../context/event.context';
import ProducerEventDetails from './producerEventDetails';

export const ProducerEventList = (props: any) => {
    const { id } = props;
    const selectEvents = useContext(EventContext);
    if(!Array.isArray(selectEvents))
        return <p>have no events</p>
    return (
        <>
            <ul>
                {selectEvents
                    .filter((e: { producerId: any; }) => e.producerId === id)
                    .map((e: any, index: React.Key | null | undefined) => (
                        <li key={index}>
                            <ProducerEventDetails event={e} />
                        </li>
                    ))}
            </ul>
        </>
    )
}
export default ProducerEventList;