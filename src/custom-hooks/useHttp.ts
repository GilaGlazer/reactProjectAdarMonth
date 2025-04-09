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

    const request = useCallback(async (dynamicUrl: string = url, ...params: any[]) => {
        setIsloading(true);
        setError('');
        try {
            const result = await Instance[method]<T>(dynamicUrl, ...params);
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error); // הדפס את השגיאה
            setError(`error while fetching data ${error}`);
        } finally {
            setIsloading(false); // זה יבטיח שהמצב מתעדכן גם במקרה של שגיאה
        }
    }, [method, url]);

    return { isLoading, error, data, request };
}
