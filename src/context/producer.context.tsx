import { createContext,useState } from "react"
import { Producer } from "../types/producer";

type ProducerContextType = {
    producers: Producer[] | undefined,
    selectedProducer: Producer | null,
    updateProducer: (oldProducer: Producer, newProducer: Producer) => void;
}
export const ProducerContext = createContext<Partial<ProducerContextType>>({});

export const ProducerProvider = (props: any) => {

 // הגדרת הסטייטים
 const [producers, setProducers] = useState<Producer[] | undefined>([]);
 const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);

 // פונקציה לעדכון מפיקה
 const updateProducer = (oldProducer: Producer, newProducer: Producer) => {
     setProducers((prevProducers) =>
         prevProducers?.map((producer) =>
             producer.id === oldProducer.id ? newProducer : producer
         )
     );
 };

 // החזרת הקונטקסט עם הערכים המתאימים
 return (
     <ProducerContext.Provider value={{ producers, selectedProducer, updateProducer }}>
         {props.children}
     </ProducerContext.Provider>
 );
}