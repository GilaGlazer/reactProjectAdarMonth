import { createContext } from  "react"
import { Producer } from "../types/producer";

type ProducerContextType={
    producers:Producer[] | undefined,
    selectedProducer: Producer | null,
    updateProducer:(oldProducer:Producer,newProducer:Producer)=>void;
}
export const ProducerContext = createContext<Partial<ProducerContextType>>({});

export const ProducerProvider = (props:any) =>{
    
}