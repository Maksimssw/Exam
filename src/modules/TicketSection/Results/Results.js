import { useEffect } from "react";
import './results.scss';
import useCouting from "../../../hooks/useCouting";

const Results = (props) => {

    const {answered, 
           right, 
           wrong, 
           resetQuestions, 
           ticket, 
           savingResponses,} = props;

    const {resultsQuestion, wrongWrapper, passedWrapper} = useCouting({answered, 
        right, 
        wrong, 
        resetQuestions, 
        ticket, 
        savingResponses})

    useEffect(() => {
        resultsQuestion();
    }, [answered])

    return(
        <div className="results">
            {wrongWrapper}
            {passedWrapper}
        </div>
    )
}

export default Results;