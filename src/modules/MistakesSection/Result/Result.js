import { useEffect } from "react";

const Result = (props) => {
    const {quantity, answered, noMistakes} = props 
    
    useEffect(() => {
        if(noMistakes === null){
            if(quantity === answered){
                window.location.reload();
            }
        }
    }, [answered])
}

export default Result;