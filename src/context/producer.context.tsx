import { createContext, useEffect, useState } from "react"
import { Producer } from "../types/producer";
import { useHttp } from "../custom-hooks/useHttp";

type ProducerContextType = {
    producers: Producer[],
    // selectedProducer: Producer | null,
    updateProducer: (id: string, newProducer: Producer) => void;
    refresh: () => Promise<unknown>
}
export const ProducerContext = createContext<Partial<ProducerContextType>>({});

export const ProducerProvider = (props: any) => {

    const { data, error, isLoading, request } = useHttp<Producer[]>('/producers', 'get');

    // הגדרת הסטייטים
    const [producers, setProducers] = useState<Producer[]>([]);
    const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);

    // פונקציה לעדכון מפיקה
    const updateProducer = (id: string, newProducer: Producer) => {
        setProducers((prevProducers) =>
            prevProducers?.map((producer) =>
                producer._id === id ? newProducer : producer
            )
        );
    };
    
    // פונקציה לרענון הנתונים
    const refresh = async () => {
        await request();
    };
    // פונקציה לבחירת מפיקה
    const selectProducer = (id: string) => {
        const producer = producers.find(p => p._id === id);
        setSelectedProducer(producer || null);
    };

    const contextValue: ProducerContextType = {
        producers,
        updateProducer,
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