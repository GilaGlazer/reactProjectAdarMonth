import { createContext, useEffect, useState } from "react"
import { Producer } from "../types/producer";
import { useHttp } from "../custom-hooks/useHttp";

type ProducerContextType = {
    producer: Producer | undefined,
    // selectedProducer: Producer | null,
    //updateProducer: (id: string, newProducer: Producer) => void;
    refresh: () => Promise<unknown>
}
export const ProducerContext = createContext<Partial<ProducerContextType>>({});

export const ProducerProvider = (props: any) => {
    const [producer, setProducer] = useState<Producer>();
    console.log(`Requesting producer with ID: ${producer?._id}`);

    const { data, error, isLoading, request } = useHttp<Producer>(`/producers/${producer?._id}`, 'get');

    // הגדרת הסטייטים
    //const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);

    // // פונקציה לעדכון מפיקה
    // const updateProducer = (id: string, newProducer: Producer) => {
    //     setProducers((prevProducers) =>
    //         prevProducers?.map((producer) =>
    //             producer._id === id ? newProducer : producer
    //         )
    //     );
    // };

    const refresh = async () => {
        if (!producer?._id) return; // אם אין ID, לא נבצע רענון
        try {
            await request();
            if (data) {
                setProducer(data);  // עדכון הסטייט עם המפיק החדש
            }
        } catch (error) {
            console.log("Error while refreshing producer", error);
        }
    };


    // // פונקציה לבחירת מפיקה
    // const selectProducer = (id: string) => {
    //     const producer = producers.find(p => p._id === id);
    //     setSelectedProducer(producer || null);
    // };

    const contextValue: ProducerContextType = {
        producer,
        //updateProducer,
        refresh
        //selectedProducer: 
    }

    // החזרת הקונטקסט עם הערכים המתאימים
    return (
        <ProducerContext.Provider value={contextValue}>
            {isLoading && 'Loading...'}
            {error && error}
            {!error && props.children}
        </ProducerContext.Provider>
    );
}