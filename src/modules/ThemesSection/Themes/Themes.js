import { useState, useEffect } from "react";
import './themes.scss';
import { Link } from "react-router-dom";
import useModal from "../../../hooks/useModal";

const Themes = (data) => {

    // Все темы
    const [themes, useThemes] = useState(Array.from(data.data));

    // Список решенных тем
    const [passedThemes, setPassedThemes] = useState(
        localStorage.getItem('passedTopic')
    );

    // Номер темы
    const [numTopic, setNumTopic] = useState();

    // Список нерешенных тем
    const [notPassedThemes, setNotPassedThemes] = useState(
        localStorage.getItem('notPassedTopic')
    );

    const [textTopic, setTextTopic] = useState();

    // Активация модального окна
    const [switchTic, setSwitchTic] = useState();

    useEffect(() => {
        changingStyles(passedThemes, 'passed')
    }, [passedThemes])

    useEffect(() => {
        changingStyles(notPassedThemes, 'not_passed')
    }, [notPassedThemes])

    // Изменение стилей
    const changingStyles = (topic, style) => {
        if(topic){
            const arr = Array.from(new Set(topic.split('-'))).filter(el => el !== '');

            arr.forEach(el => {
                const themesList = document.getElementById(el);

                themesList.classList.add(style);
            })
        }
    }

     // Пройти тему повторно 
     const passTicketAgain = (e) => {
        const warpp = e.target.closest('.themes__list');
        if(warpp.classList.contains('passed')){
            e.preventDefault();

            // Добавить номер темы
            setNumTopic(warpp.getAttribute('id'))

            // Добавить сыллку для перехода
            setTextTopic(
                warpp.querySelector('.themes__link').innerHTML
            );

            // Активация модального окна
            setSwitchTic(!switchTic);
        }
    }


    // Создание тем
    const topic =  themes !== false ? themes.map((el, i) => {
        return(
            <li key={i} id={i + 1} className="themes__list">
                {i + 1})
                <Link 
                    to={`/themes/${el}${i + 1}`}
                    className="themes__link"
                    onClick={(e) => passTicketAgain(e)}>
                        {el}
                </Link>
            </li>
        )
    }) : null

    return(
        <section className="themes">
            <div className="container">
                <div className="themes__heading">
                    <Link to={'/'}>←</Link>
                    <h1 className="themes__title">Тренеровка по темам</h1>
                </div>
                <nav>
                    <ul className="themes__wrapper">
                        {topic}
                    </ul>
                </nav>
                <RepeatTicket 
                    num={numTopic} 
                    switchTic={switchTic}
                    way={`/themes/${textTopic}${numTopic}`}/>
            </div>
        </section>
    )
}

// Модальное окно пройденых билетов
const RepeatTicket = (props) => {

    const {num, switchTic, way} = props;

    const {closingModalWindow, modal, deletingResolvedTicket} = useModal({
        num: num,
        switchTic: switchTic
    })

    return(
        <div className={`modal ${modal}`}>
            <div className='modal__wrapper modal__wrapper_repeat'>
                <div className='modal__close' onClick={closingModalWindow}></div>
                <h2 className='modal__title'>Тема {num} уже пройден</h2>
                <div className='modal__btns'>
                    <Link 
                        to={way} 
                        className='modal__btn modal__btn_again'
                        onClick={() => deletingResolvedTicket('passedTopic')}>
                            Пройти заново
                    </Link>
                    <button className='modal__btn modal__btn_cancellation'  
                            onClick={closingModalWindow}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Themes;