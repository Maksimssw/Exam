import { useState, useEffect, useRef } from "react"
import './questions.scss';

const useSlider = (width, wholTicket, exam) => {

    const [widthTranslate, setWidthTranslate] = useState('fit-content');
    const [translateX, setTranslateX] = useState(0);

    // Скролл к следующему вопросу
    const numberProcessing = (num) => {
        setTranslateX(num * width.current.offsetWidth - width.current.offsetWidth);
    }

    useEffect(() => {
        setWidthTranslate(ticket.lenght * 100 + 100);
    }, [])

    // Все номера отвечаенных на вопрос
    const [allQuestionAnswered, setAllQuestionAnswered] = useState(0);

    // Номер правильного ответа
    const [rightAnswers, setRightAnswers] = useState();

    // Количество правильно отвеченных вопросов
    const [right, setRight] = useState(0);

    // Номера неправильного ответов
    const [incorrectAnswers, setIncorrectAnswers] = useState();

    // Количество неправильно отвеченных вопросов
    const [wrong, setWrong] = useState(0);

    // Сброс номеров
    const [resetNum, setResetNum] = useState(0);

    // Сохранение
    const [saving, setSaving] = useState('');

    const [ticket, setTicket] = useState(wholTicket)

    const button = useRef(null);

    // Ответ пользователся
    const setAnswerUser = (e, boolean) =>{
        // Получение нажатого элемента
        const answer = e.target;

        const answersWrapper = answer.closest('.question');

        // boolean приходит с JSON
        // true - Пользователь ответил правильно, активируется функция  обработки правильного ответа
        // false - Пользователь ответил неправильно, активируется функция обработки неправильного ответа

        // Номер билета
        const ticNumber = answersWrapper.querySelector('.question__ticket').innerText.replace(/\D/g, '');

        // Номер вопроса
        const quesNum = answersWrapper.querySelector('.question__title').innerText.replace(/\D/g, '');

        if(answersWrapper.classList.contains('hidden')){

        }else{
            answersWrapper.classList.add('hidden');

            setAllQuestionAnswered(allQuestionAnswered + 1);

            if(boolean){
                answer.classList.add('right');
                if(exam) answer.classList.add('exam');
                processingCorrectAnswer(answer, ticNumber, quesNum);
            } else{
                answer.classList.add('wrong');
                if(exam) answer.classList.add('exam');
                handlingIncorrectResponse(answer, ticNumber, quesNum);
            } 
        }
    }

    // Добавление дополнительных вопросов в билет
    const addingAdditionalQuestion = (data) => {
        if(data) {
            setTicket([...ticket, ...data]);
        };
    }

    // Обработка ошибок
    const errorHandling = (tic, ques, del) => {
        if(del === 'delete'){
            try{
                // Убрать ошибку
                const local = localStorage.getItem('mistakes')
                                .split('-')
                                .filter(el => el !== `${tic}_${ques}`)
                                .join('-');

                localStorage.removeItem('mistakes');
                localStorage.setItem('mistakes', local);
            }catch{}
        } else {
            // Добавить ошибку
            const local = localStorage.getItem('mistakes') ? localStorage.getItem('mistakes') : '';
            localStorage.removeItem('mistakes');

            const res = `${tic}_${ques}-`

            localStorage.setItem('mistakes', res + local);  
        }
    }

    // Обработка правильного ответа
    const processingCorrectAnswer = (answer, tic, ques) => {

        const num = searchNum(answer);

        setRightAnswers(num)
        
        // Скролл к следующему вопросу
        numberProcessing(num + 1);

        // Количество правильно отвеченных вопросов
        setRight(right + 1);

        // Удалить ошибки
        errorHandling(tic, ques, 'delete')
    }

    // Обработка неправильного ответа
    const handlingIncorrectResponse = (answer, tic, ques) =>{
        
        const num = searchNum(answer);
        setIncorrectAnswers(num);

        // Получение блока с ошибкой
        const question  = answer.closest('.question');
        const mistake = question.querySelector('.mistake');

        if(!exam){
            // Удаление атрибута hidden для отображения правильного ответа и кнопки 
            mistake.removeAttribute('hidden');
        } else{
            // Скролл к следующему вопросу
            numberProcessing(num + 1);
        }

        // Количество неправильно отвеченных вопросов
        setWrong(wrong + 1);

        // Добавление ошибки 
        errorHandling(tic, ques);
    }

    // Пойск номера вопроса 
    function searchNum(answer){
        // Получение Родителя
        const ticketWrapper = answer.closest('.question');

        // Номер вопроса
        const res = +ticketWrapper.querySelector('.question__title').innerText.replace(/\D/g, '');
        return res;
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

    // Сохранение ответов при нажатий на "Вернутся ко всем билетам"
    const savingResponses = () =>{ 
        setSaving('save');
    }


    // Создание вопросов
    const question = ticket.map((el, i) => {
        const {ticket_number, title, image, question, answers, correct_answer, answer_tip, topic} = el;

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
                    <img src={require(`../images/${img}`)} alt="photo"/>
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

        // Сброс дополнительных вопросов
        const arr = ticket.filter((el, i) => {
            return +el.title.replace(/\D/g, '') <= 20
        });
        setTicket(arr);

        // Сброс номеров классов
        setResetNum(resetNum + 1);

        // Сброс хуков
        setRight(0);
        setWrong(0);
        setAllQuestionAnswered(0);

        // Скролл к первому вопросу
        numberProcessing(1);

        setIncorrectAnswers(null);
    }

    return {widthTranslate, translateX, numberProcessing, allQuestionAnswered,
        rightAnswers, incorrectAnswers, wrong, ticket, setAnswerUser, processingCorrectAnswer,
        handlingIncorrectResponse, searchNum, question, addingAdditionalQuestion,
        resetQuestions, savingResponses, resetNum, saving, right}
}

export default useSlider;