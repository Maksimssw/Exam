import './ticketNumber.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useModal from '../../hooks/useModal';

const TicketNumber = (props) =>{
    // Номера всех вопросов
    const {ticket, numberProcessing, rightAnswers, incorrectAnswers, resetNum} = props

    // Получение номера 1 вопроса
    const getQuestionNumber = (e) => {
        numberProcessing(+e.target.innerText);
    }

    // Удаление данных при выходе
    const [switchTic, setSwitchTic] = useState(false);
    const [modal, setModal] = useState(false);

    // При рендере активация функция правильного ответа
    useEffect(() => {
        questionNumberCorrectly(document.getElementById(`${rightAnswers}`));
    }, [rightAnswers])

    // При рендере активация функция неправильного ответа
    useEffect(() => {
        questionNumberWrong(document.getElementById(`${incorrectAnswers}`))
    }, [incorrectAnswers])

    // Сброс номеров    
    useEffect(() => {
        resetNumber(resetNum);
    }, [resetNum])

    const resetNumber = (el) => {
        if(el){
            const wrapper = document.querySelector('.numbers');
            const numList = wrapper.querySelectorAll('.numbers__list');
            numList.forEach(el => {
                el.classList.remove('answered');
                el.classList.remove('wrong');
                el.classList.remove('active');
            })
        }
    }

    // Добавление стилей для правильного ответа
    const questionNumberCorrectly = (el) => {
        // Сделать номер зеленого цвета
        if(rightAnswers) el.classList.add('active')
    }

     // Добавление стилей для неправильного ответа
    const questionNumberWrong = (el) => {
        // Сделать номер красного цвета
        if(incorrectAnswers) el.classList.add('wrong')
    }

    // Открытие модального окна о закрытие страницы
    const openModal = () =>  {
        setSwitchTic(!switchTic);
        setModal(true);
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
                <div onClick={openModal}>← Вернутся ко всем билетам</div>
            </div>
            <ul className='numbers'>
                {numbers}
            </ul>
            <DeletingData
                    switchTic={switchTic}
                    ticket={modal}
                    />
        </>
    )
}

// Удаление данных
const DeletingData = (props) => {
    const {switchTic,ticket} = props;

    const {closingModalWindow, modal} = useModal({
        ticket: ticket,
        switchTic: switchTic
    })

    return(
        <div className={`modal ${modal}`}>
            <div className='modal__wrapper modal__wrapper_repeat'>
                <div className='modal__close' onClick={closingModalWindow}></div>
                <h2 className='modal__title'>Данные ответов будут удалены!</h2>
                <div className='modal__btns'>
                    <Link 
                        to={`/tickets`} 
                        className='modal__btn modal__btn_again'
                        onClick={closingModalWindow}> Продолжить
                    </Link>
                    <button className='modal__btn modal__btn_again'  
                            onClick={closingModalWindow}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TicketNumber;