import { useState,useCallback } from "react"

const Https = () => {

    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);

    const request = useCallback(async(url) => {

        setLoading(true);

        try{

            const res = await fetch(url);

            if(!res.ok){
                throw new Error(`url: ${url}, status: ${res.status}`);
            }

            setLoading(false);
            setError(false);

            console.log(res);
            return await res.json();

        } catch{
            setLoading(false);
            setError(true);
        }
      
    }, []);

    return {loading, error, request};

}

export default Https;