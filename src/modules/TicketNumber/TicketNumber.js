import './ticketNumber.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TicketNumber = (props) =>{

    // Номера всех вопросов
    const {ticket, numberProcessing, rightAnswers, incorrectAnswers} = props

    // Получение номера 1 вопроса
    const getQuestionNumber = (e) => {
        numberProcessing(+e.target.innerText);
    }

    // При рендере активация функция правильного ответа
    useEffect(() => {
        questionNumberCorrectly()
    }, [rightAnswers])

    // При рендере активация функция неправильного ответа
    useEffect(() => {
        questionNumberWrong()
    }, [incorrectAnswers])

    // Добавление стилей для правильного ответа
    const questionNumberCorrectly = () => {
        if(rightAnswers){
            const ticketNum = document.getElementById(`${rightAnswers}`);

            // Сделать номер зелёным
            ticketNum.classList.add('answered');
            ticketNum.classList.add('active')
        }
    }

     // Добавление стилей для неправильного ответа
    const questionNumberWrong = () => {
        if(incorrectAnswers){
            const ticketNum = document.getElementById(`${incorrectAnswers}`);         

            // Сделать номер красным
            ticketNum.classList.add('answered');
            ticketNum.classList.add('wrong')
        }
    }

    const numbers = ticket === undefined ? null : ticket.map(el => {

        // Получение номера вопроса
        const num = el.title.replace(/\D/g, '');

        // Создание номера
        return (
            <li onClick={(e) => getQuestionNumber(e)} id={num} key={num} className='numbers__list'>
                {num}
            </li>
        )
    });

    return(
        <>
            <div className='back back_ticket'>
                <Link to="/tickets">← Вернутся ко всем билетам</Link>
            </div>
            <ul className='numbers'>
                {numbers}
            </ul>
        </>
    )
}

export default TicketNumber;