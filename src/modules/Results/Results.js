import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './results.scss';

const Results = (props) => {

    const {answered, right, wrong} = props;
    
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
        } 
    }

    const wrongWrapper = failed === null ? 
    <div>
        <h2 className="results__title"> Тренеруйтесь!</h2>
        <p className="results__subtitle">{wrong} ошибок</p>
        <Link className="results__btn" to='/mistakes'>МОИ ОШИБКИ</Link>
        <div className="results__more">ПРОЙТИ ЕЩЕ РАЗ</div>
    </div> : null

    return(
        <div className="results">
            {wrongWrapper}
        </div>
    )
}

export default Results;