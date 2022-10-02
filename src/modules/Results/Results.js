import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './results.scss';

const Results = (props) => {

    const {answered, right, wrong, resetQuestions, ticket, savingResponses} = props;

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
            
            // При нажатий на кнопку 'Вернутся ко всем билетам', билет сохранится
            savingResponses();

            // Билет не сдан , если будет больше 2-ух ошибок
            if(wrong > 2){
                setFailded(true);
                
                // Сохранение несданных билетов
                savingData('unresolvedTickets');
            } 
            // Билет сдан без ошибок
            else if(right === 20){
                setPassed(true);

                // Сохранение сданных билетов
                savingData('solvedTickets')

                // Удаление с базы данных нерешенного билета
                // В случае если билет решили правильно
                deletionFromDatabase();
            }
        } 
    }

    // Удаление с базы данных нерешенного билета
    const deletionFromDatabase = () => {
        const local = localStorage.getItem('unresolvedTickets')
            .split('-')
            .filter(el => +el !== ticket)
            .join('-');
    
        localStorage.removeItem('unresolvedTickets');
        localStorage.setItem('unresolvedTickets', local);
    }

    // Сохранение данных через LocalStorage
    const savingData = (name) => {
        const local = localStorage.getItem(name);
        localStorage.removeItem(name);
        
        const res = `${local + ticket}-`;
        
        localStorage.setItem(name, res);
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