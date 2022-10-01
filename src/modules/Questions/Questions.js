import './questions.scss';
import { useState, useRef } from 'react';
import TicketNumber from '../TicketNumber/TicketNumber';
import Results from '../Results/Results';
import { Link } from 'react-router-dom';

const Questions = (props) =>{

    const {ticket} = props;

    // Все номера отвечаенных на вопрос
    const [allQuestionAnswered, setAllQuestionAnswered] = useState(0);

    // Номер правильного ответа
    const [rightAnswers, setRightAnswers] = useState();

    // Номера неправильного ответов
    const [incorrectAnswers, setIncorrectAnswers] = useState();

    // Количество правильно отвеченных вопросов
    const [right, setRight] = useState(0);

    // Количество неправильно отвеченных вопросов
    const [wrong, setWrong] = useState(0);

    // Сброс номеров
    const [resetNum, setResetNum] = useState(0);

    // Номер билета 
    const [ticketNumber, setTicketNumber] = useState(
        +ticket[0].ticket_number.replace(/\D/g, '')
    )

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
            answersWrapper.classList.add('hidden');

            setAllQuestionAnswered(allQuestionAnswered + 1);

            if(boolean){
                answer.classList.add('right');
                processingCorrectAnswer(answer);
            } else{
                answer.classList.add('wrong');
                handlingIncorrectResponse(answer);
            } 
        }
    }

    // Пойск номера вопроса 
    function searchNum(answer){
        // Получение Родителя
        const ticketWrapper = answer.closest('.question');

        // Номер вопроса
        const res = +ticketWrapper.querySelector('.question__title').innerText.replace(/\D/g, '');
        return res;
    }

    // Обработка правильного ответа
    const processingCorrectAnswer = (answer) => {

        const num = searchNum(answer);

        setRightAnswers(num)
        
        // Скролл к следующему вопросу
        numberProcessing(num + 1);

        // Количество правильно отвеченных вопросов
        setRight(right + 1);
    }

    // Обработка неправильного ответа
    const handlingIncorrectResponse = (answer) =>{
        
        const num = searchNum(answer);

        setIncorrectAnswers(num);

        // Получение блока с ошибкой
        const question  = answer.closest('.question');
        const mistake = question.querySelector('.mistake');

        // Удаление атрибута hidden для отображения правильного ответа и кнопки 
        mistake.removeAttribute('hidden');

        // Скрол к кнопке "Следующий вопрос"
        scrollNextQuestion();

        // Количество неправильно отвеченных вопросов
        setWrong(wrong + 1);
    }

    // Обработка кнопки "Следующий вопрос"
    const nextQuestion = (e) => {
        e.preventDefault();

        // Получение номера вопроса 
        const num = searchNum(e.target);
        
        // Скролл к следующему вопросу
        numberProcessing(num + 1);

        // Скрытие кнопки
        e.target.classList.add('hidden');
    }

    const [translateX, setTranslateX] = useState(0);
    const width = useRef();

    // Скролл к следующему вопросу
    const numberProcessing = (num) => {
        setTranslateX(num * width.current.offsetWidth - width.current.offsetWidth);
    }
    
    // Скрол к кнопке "Следующий вопрос"
    const scrollNextQuestion = () =>{
        button.current.scrollIntoView({ behavior: "smooth" });
    }

    // Пройти билет повтороно
    // Сброс вопросов 
    const resetQuestions = (e) => {
        const questions = e.target.closest('.questions'),
              question = questions.querySelectorAll('.question');

        // Сброс стилей в каждом вопросе
        question.forEach(el => {
            // Удаление класса отвеченного на вопрос
            const answers = el.querySelector('.answers');
            answers.classList.remove('hidden');

            // Добавление атрибута hidden, для скрытия правильного ответа
            const mistake = el.querySelector('.mistake');
            mistake.setAttribute('hidden', '');

            // Удаление класса hidden, для отображение кнопки,
            // при неправильном ответе
            const mistakeBtn = el.querySelector('.mistake__btn');
            mistakeBtn.classList.remove('hidden');

            // Получение всех вариантов ответа на 1 вопрос
            const answersList = el.querySelectorAll('.answers__list');

            answersList.forEach(el => {

                // Сброс классов
                el.classList.remove('wrong');
                el.classList.remove('right');
            })
        })

        // Сброс номеров классов
        setResetNum(resetNum + 1);

        // Сброс хуков
        setRight(0);
        setWrong(0);
        setAllQuestionAnswered(0);

        // Скролл к первому вопросу
        numberProcessing(1);
    }

    const button = useRef(null);
    
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
                    <button 
                        className='mistake__btn'
                        onClick={(e) => nextQuestion(e)}
                        ref={button}>СЛЕДУЮЩИЙ ВОПРОС</button>
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
                incorrectAnswers={incorrectAnswers}
                resetNum={resetNum}/>
            <div ref={width} className='questions'>
                <ul className='questions__wrapper' style={{
                    transform: `translateX(-${translateX}px)`
                }}>
                    {question}
                    <Results 
                        answered={allQuestionAnswered}
                        right={right}
                        wrong={wrong}
                        resetQuestions={resetQuestions}
                        ticket={ticketNumber}/>
                </ul>
            </div>
        </>
    )
}


export default Questions