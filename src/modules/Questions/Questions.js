import './questions.scss';
import { useState, useRef } from 'react';
import TicketNumber from '../TicketNumber/TicketNumber';

const Questions = (props) =>{

    const {ticket} = props;

    // Номер правильного ответа
    const [rightAnswers, setRightAnswers] = useState();

    // Номера неправильных ответов
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);

    // Ответ пользователся
    const setAnswerUser = (e, boolean) =>{
        // Получение нажатого элемента
        const answer = e.target;

        const answersWrapper = answer.closest('.answers');

        // boolean приходит с JSON
        // true - Пользователь ответил правильно и активируется функция  обработки правильного ответа
        // false - Пользователь ответил неправильно и активируется функция обработки неправильного ответа
        
        if(answersWrapper.classList.contains('hidden')){

        }else{
            if(boolean){
                answer.classList.add('right');
                answersWrapper.classList.add('hidden');
                processingCorrectAnswer(answer);
            } else{
                answer.classList.add('mistake');
                answersWrapper.classList.add('hidden');
                handlingIncorrectResponse(answer);
            } 
        }
    }

    // Пойск номера вопроса 
    function searchTicket(answer){
        // Получение Родителя
        const ticketWrapper = answer.closest('.question');

        // Номер вопроса
        const res = +ticketWrapper.querySelector('.question__title').innerText.replace(/\D/g, '');
        return res;
    }

    // Обработка правильного ответа
    const processingCorrectAnswer = (answer) => {

        const num = searchTicket(answer);

        setRightAnswers(num)
        
        // Скролл к следующему вопросу
        numberProcessing(num + 1);
    }

    // Обработка неправильного ответа
    const handlingIncorrectResponse = (answer) =>{
        
        const num = searchTicket(answer);

        setIncorrectAnswers(num);
    }

    const [translateX, setTranslateX] = useState(0);
    const width = useRef();

    // Скролл к следующему вопросу
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
            <TicketNumber 
                ticket={ticket} 
                numberProcessing={numberProcessing}
                rightAnswers={rightAnswers}
                incorrectAnswers={incorrectAnswers}/>
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

export default Questions