// import { createContext, useEffect, useState } from "react"
// import { Producer } from "../types/producer";
// import { useHttp } from "../custom-hooks/useHttp";

// type ProducerContextType = {
//     producer: Producer | undefined,
//     // selectedProducer: Producer | null,
//     //updateProducer: (id: string, newProducer: Producer) => void;
//     refresh: () => Promise<unknown>
// }
// export const ProducerContext = createContext<Partial<ProducerContextType>>({});

// export const ProducerProvider = (props: any) => {
//     const [producer, setProducer] = useState<Producer>();
//     console.log(`Requesting producer with ID: ${producer?._id}`);

//     const { data, error, isLoading, request } = useHttp<Producer>(`/producers/${producer?._id}`, 'get');

//     const refresh = async () => {
//         if (!producer?._id) return; 
//         try {
//             await request();
//             if (data) {
//                 setProducer(data);  
//             }
//         } catch (error) {
//             console.log("Error while refreshing producer", error);
//         }
//     };


//     const contextValue: ProducerContextType = {
//         producer,
//         refresh
//     }

//     // החזרת הקונטקסט עם הערכים המתאימים
//     return (
//         <ProducerContext.Provider value={contextValue}>
//             {isLoading && 'Loading...'}
//             {error && error}
//             {!error && props.children}
//         </ProducerContext.Provider>
//     );
// }