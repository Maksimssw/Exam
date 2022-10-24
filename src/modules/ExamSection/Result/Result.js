import { useEffect } from "react";
import useCouting from "../../../hooks/useCouting";
import { Link } from "react-router-dom";

const Result = (props) => {
    const {answered, 
        right, 
        wrong, 
        resetQuestions,  
        savingResponses,} = props;

    const {resultsQuestion, wrongWrapper, passedWrapper,
        endingOne, endingToFor, endingMany  } = useCouting({answered, 
        right, 
        wrong, 
        resetQuestions, 
        ticket: false, 
        savingResponses})

    useEffect(() => {
        resultsQuestion();
    }, [answered])

    const reboot = () => {
        window.location.reload()
    };

    const notPassed  = wrongWrapper !== null ? 
    <div>
        <h2 className="results__title"> Тренеруйтесь!</h2>
        <p className="results__subtitle">{wrong} {endingOne} {endingToFor} {endingMany}</p>
        <Link className="results__btn" to='/mistakes'>МОИ ОШИБКИ</Link>
        <div className="results__more"
             onClick={() => reboot()}>ПРОЙТИ ЕЩЕ РАЗ</div>
    </div> : null

    const passed = passedWrapper !== null ?
    <div>
        <h2 className="results__title">Поздравляем!</h2>
        <p className="results__subtitle">{wrong} {endingOne} {endingToFor} {endingMany}</p>        <div className="results__more"
            onClick={() => reboot()}>ПРОЙТИ ЕЩЕ РАЗ</div>
    </div> : null

    return(
        <div className="results">
            {notPassed}
            {passed}
        </div>
    )
}

export default Result;