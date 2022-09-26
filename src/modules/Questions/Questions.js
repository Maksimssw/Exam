import './questions.scss';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Questions = (props) =>{

    const {ticket} = props;

    // Ответ пользователся
    const setAnswerUser = (e, boolean) =>{
        const answer = e.target;

        const answersWrapper = answer.closest('.answers');

        if(answersWrapper.classList.contains('hidden')){

        }else{
            if(boolean){
                answer.classList.add('right');
                answersWrapper.classList.add('hidden');
            } else{
                answer.classList.add('mistake');
                answersWrapper.classList.add('hidden');
            } 
        }
    }

    // Обработка правильного ответа
    const processingCorrectAnswer = () => {

    }

    const [translateX, setTranslateX] = useState(0);
    const width = useRef();

    // Получение нажатого номера
    const numberProcessing = (num) => {
        setTranslateX(num * width.current.offsetWidth - width.current.offsetWidth);
    }
    
    const question = ticket.map((el, i) => {
        const {title, ticket_number, image, question, answers, correct_answer, answer_tip, topic} = el;

        const answerWrapper = answers.map((el, i) => {
            const {answer_text, is_correct} = el;

            return(
                <li key={i} onClick={(e) => setAnswerUser(e, is_correct)} className='answers__list' boleen={`${is_correct}`}>{i + 1}.{answer_text}</li>
            )
        })

        const img = image.replace(/.\Dimages\D/, '');

        return(
            <li key={i} className='question'>
                <div className='question__info'>
                    <p className='question__ticket'>{ticket_number}</p>
                    <p className='question__title'>{title}</p>
                </div>
                <div className='question__photo'>
                    <img src={require(`../../images/${img}`)} alt="photo"/>
                </div>
                <h2 className='question__title'>{question}</h2>
                <ul className='answers'>
                    {answerWrapper}
                </ul>
                <div hidden className='mistake'>
                    <p className='mistake__correct'>{correct_answer}</p>
                    <p className='mistake__answer'>{answer_tip}</p>
                    <p className='mistake__topic'>{topic}</p>
                    <button className='mistake__btn'>СЛЕДУЮЩИЙ ВОПРОС</button>
                </div>
            </li>
        )
    })

    return(
        <>
            <TicketNumber ticket={ticket} numberProcessing={numberProcessing}/>
            <div ref={width} className='questions'>
                <ul className='questions__wrapper' style={{
                    transform: `translateX(-${translateX}px)`
                }}>
                    {question}
                </ul>
            </div>
        </>
    )
}

const TicketNumber = (props) =>{

    // Номера всех вопросов
    const {ticket, numberProcessing} = props

    // Получение номера 1 вопроса
    const getQuestionNumber = (e) => {
        numberProcessing(+e.target.innerText);
    }

    const numbers = ticket === undefined ? null : ticket.map(el => {

        // Получение номера вопроса
        const num = el.title.replace(/\D/g, '');

        // Создание номера
        return (
            <li onClick={(e) => getQuestionNumber(e)} key={num} className='numbers__list'>
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

export default Questions