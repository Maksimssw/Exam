import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './results.scss';

const Results = (props) => {

    const {answered, right, wrong, resetQuestions, ticket} = props;

    useEffect(() => {
        resultsQuestion();
    }, [answered])

    // В случае если билет не пройдет ,failed будет true
    const [failed, setFailded] = useState(null);

    // В случае если билет пройдет , passed будет true
    const [passed, setPassed] = useState(null);

    // Результаты отвеченных вопросов
    const resultsQuestion = () => {
        if(answered === 20){
            // Билет не сдан , если будет больше 2-ух ошибок
            if(wrong > 2){
                setFailded(true);
            } 
            // Билет сдан без ошибок
            else if(right === 20){
                setPassed(true);

                // Сохранение сданных билетов
                const local = localStorage.getItem('solvedTickets');
                localStorage.removeItem('solvedTickets');
                
                const res = `${local + ticket}-`;
                
                localStorage.setItem(`solvedTickets`, res);
            }
        } 
    }

    // Вёрстка не сданного билета
    const wrongWrapper = failed === true ? 
    <div>
        <h2 className="results__title"> Тренеруйтесь!</h2>
        <p className="results__subtitle">{wrong} ошибок</p>
        <Link className="results__btn" to='/mistakes'>МОИ ОШИБКИ</Link>
        <div className="results__more"
             onClick={(e) => resetQuestions(e)}>ПРОЙТИ ЕЩЕ РАЗ</div>
    </div> : null

    // Вёрстка сданного билета
    const passedWrapper = passed === true ?
    <div>
        <h2 className="results__title">Поздравляем!</h2>
        <p className="results__subtitle">0 ошибок</p>
        <Link 
            className="results__btn" 
            to={`/tickets`}>
                Следующий билет
        </Link>

        <div className="results__more"
             onClick={(e) => resetQuestions(e)}>ПРОЙТИ ЕЩЕ РАЗ</div>
    </div> : null


    return(
        <div className="results">
            {wrongWrapper}
            {passedWrapper}
        </div>
    )
}

export default Results;