import axios from "axios";
import { Producer } from "../types/producer";

const Instance = axios.create({
    baseURL: 'http://localhost:8000',
})

// export const fetchProducer = async ():Promise<Producer[]>=>{
//     const response = await Instance.get<Producer[]>('/producers');
//     return response.data;
// }

export const addProducer = async (newProducer:Producer):Promise<Producer>=>{
    const response = await Instance.post<Producer>('/producer',newProducer);
    return response.data;
}


export const updateProducer = async (newProducer:Producer):Promise<Producer>=>{
    const response = await Instance.put<Producer>('/producer',newProducer);
    return response.data;
}

export const ApiRequests = {
    // fetchProducer,
    updateProducer,
    addProducer
}as const

type Keys = keyof typeof ApiRequests;
export type RequestMethods = typeof ApiRequests[Keys];