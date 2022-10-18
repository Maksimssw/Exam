import { useState } from "react"
import { Link } from "react-router-dom";

const useCouting = ({answered, 
    right, 
    wrong, 
    resetQuestions, 
    ticket, 
    savingResponses,}) => {
    // В случае если билет не пройдет ,failed будет true
    const [failed, setFailded] = useState(null);

    // В случае если билет пройдет , passed будет true
    const [passed, setPassed] = useState(null);


    // Результаты отвеченных вопросов 'Билеты АВ'
    const resultsQuestion = () => {
        const questions = document.querySelectorAll('.question');
        if(answered === questions.length){
            // Билет не сдан , если будет больше 2-ух ошибок
            if(wrong > 2){
                ticketFalse();
            } 
        
            // Билет сдан без ошибок
            if(right === 20){
                ticketTrue();

                // При нажатий на кнопку 'Вернутся ко всем билетам', 
                // билет сохранится
                savingResponses();
            }

            // Ошибка Дополнительных вопросов
            if(answered > 20 && wrong > 2){
                ticketFalse();
            } else if(answered === 25 && wrong === 2){
                ticketFalse();
            }else if(answered > 20){
                ticketTrue();
            }
        } 
    }

    // Результаты отвеченных вопросов 'Темы'
    const topicResilt = () => {
        const questions = document.querySelectorAll('.question');
        if(answered === questions.length){
            if(wrong > 0) {
                setPassed(false);
                setFailded(true);
                savingData('notPassedTopic');

                // Удаление решенной темы
                deletionFromDatabase('passedTopic')
            } else {
                setPassed(true);
                setFailded(false);
                savingData('passedTopic');

                // Удаление нерешенной темы
                deletionFromDatabase('notPassedTopic')
            }
        }
    }

    // Билет сдан
    const ticketTrue = () => {
        setPassed(true);
        setFailded(false);

        // Сохранение сданных билетов
        savingData('solvedTickets')

        // Удаление с базы данных нерешенного билета
        // В случае если билет решили правильно
        deletionFromDatabase('unresolvedTickets');

        // При нажатий на кнопку 'Вернутся ко всем билетам', билет сохранится
        savingResponses();
    }

    // Билет не сдан
    const ticketFalse = () => {
        setPassed(false);
        setFailded(true);
        
        // Сохранение несданного билета
        savingData('unresolvedTickets');

        // При нажатий на кнопку 'Вернутся ко всем билетам', билет сохранится
        savingResponses();

        // Удаление с базы данных решенного билета
        // В случае если билет решили неправильно
        deletionFromDatabase('solvedTickets');
    }


    // Удалить с LocalStorage билет
    const deletionFromDatabase = (name) => {
        try{
            const local = localStorage.getItem(name)
            .split('-')
            .filter(el => +el !== ticket)
            .join('-');
    
        localStorage.removeItem(name);
        localStorage.setItem(name, local);
        } catch{}
    }

    // Сохранение данных через LocalStorage
    const savingData = (name) => {
        const local = localStorage.getItem(name);
        localStorage.removeItem(name);
        
        const res = `${local + ticket}-`;
        
        localStorage.setItem(name, res);
    }

    // Изменение окончания 
    const endingOne = wrong === 1 ? 'ошибка' : null;
    const endingToFor = wrong >= 2 && wrong <= 4 ? 'ошибки' : null
    const endingMany = wrong === 0 || wrong > 4 ? 'ошибок' : null 
 
    const wrongWrapper = failed === true ? 
    <div>
        <h2 className="results__title"> Тренеруйтесь!</h2>
        <p className="results__subtitle">{wrong} {endingOne} {endingToFor} {endingMany}</p>
        <Link className="results__btn" to='/mistakes'>МОИ ОШИБКИ</Link>
        <div className="results__more"
             onClick={(e) => resetQuestions(e)}>ПРОЙТИ ЕЩЕ РАЗ</div>
    </div> : null

    const passedWrapper = passed === true ?
    <div>
        <h2 className="results__title">Поздравляем!</h2>
        <p className="results__subtitle">{wrong} {endingOne} {endingToFor} {endingMany}</p>
        <Link 
            className="results__btn" 
            to={`/tickets`}>
                Следующий билет
        </Link>

        <div className="results__more"
             onClick={(e) => resetQuestions(e)}>ПРОЙТИ ЕЩЕ РАЗ</div>
    </div> : null

    return{resetQuestions, endingOne, endingToFor, endingMany, 
           resultsQuestion, topicResilt, wrongWrapper, passedWrapper}
}

export default useCouting;