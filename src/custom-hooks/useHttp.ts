import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Instance = axios.create({
    //הכתובת שעליו NODE ירוץ
    baseURL: 'http://localhost:8000',
})

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export const useHttp = <T,>(url: string, method: HttpMethod) => {

    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState<T>();

    const request = useCallback(async (...params: any[]) => {
        setIsloading(true);
        setError('');
        try {
            const result = await Instance[method]<T>(url,...params);
            setIsloading(false);
            setData(result.data);
        } catch (error) {
            setIsloading(false);
            setError(`error while fetching data ${error}`);
        }
    },[])

    useEffect(()=>{
        if(method=='get')
            request();
    },[]);

    return {isLoading , error, data , request};
}
