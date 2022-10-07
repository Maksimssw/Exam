import './tickets.scss'
import '../Style/modal.scss';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import useModal from '../../hooks/useModal';
import useCalculator from '../../hooks/useCalculator';

const Tickets = (props) => {

    const {tickets} = props;

    // Получение процентов сданных билетов
    const {coutingSolvedTickets} = useCalculator();

    // Номер билета
    const [ticket, setTicket] = useState();
    const [switchTic, setSwitchTic] = useState();

    const ticketsList = tickets.map(el => {

        // Получение цифры билета
        const num = +el.replace(/\D/g, '');
        
        // Создание карточки билета
        return(
            <Link 
                key={num} 
                to={`/tickets/${num}`} 
                id={`ticket-${num}`} 
                className='tickets__list'
                onClick={(e) => passTicketAgain(e)}>
                {el}
            </Link>
        )
    })

    // Список решенных билетов
    const [solvedTickets, setSolvedTickets] = useState(
        localStorage.getItem('solvedTickets')
    )

    useEffect(() => {
        changingTicketStyle(solvedTickets)
    }, [solvedTickets, ticketsList])

    // Иземенение стилей решенных билетов
    const changingTicketStyle = (ticket) => {
        changingStyle(ticket, 'decided');
    }

    // Список несданных билетов 
    const [unresolvedTickets, setUnresolvedTickets] = useState(
        localStorage.getItem('unresolvedTickets')
    )

    useEffect(() => {
        outstandingTicket(unresolvedTickets)
    }, [unresolvedTickets, ticketsList])

    // Иземенение стилей решенных билетов
    const outstandingTicket = (ticket) => {
        changingStyle(ticket, 'incorrect');
    }

    // Изменение стилей
    const changingStyle = (ticket, style) => {
        if(ticketsList.length === 40 && ticket){
            const arr = ticket.split('-');
        
            console.log(arr);

            // Удаление повторяющих номеров билетов и пробелов
            const arrFil =  arr.filter((item, index) => {
                return arr.indexOf(item) === index
            }).filter(item => item !== '');

            arrFil.forEach(el => {
                const ticketList = document.getElementById(`ticket-${el}`);

                ticketList.classList.add(style);
            })
        }
    }

    // Пройти билет повторно 
    const passTicketAgain = (e) => {
        if(e.target.classList.contains('decided')){
            e.preventDefault();
            setTicket(e.target.innerText.replace(/Билет /g, ''));
            setSwitchTic(!switchTic);
        }
    }

    return(
        <>
            <div className='back'>
                <div className='container'>
                    <div className='back__wrapper'>
                        <Link to="/" className='arrow arrow_left'>←</Link>
                        <p className='back__text'>Билеты ПДД АВ</p>
                    </div>
                </div>
            </div>
            <div className="tickets">
                <div className="container">
                    <h2 className='tickets__title'>Прогресс</h2>
                    <div className='tickets__progress'>
                        <div className='tickets__active' style={{
                            width: `${coutingSolvedTickets('percent')}%`
                        }}>
                        </div>
                    </div>
                    <div className='tickets__wrapper'>
                        {ticketsList}
                    </div>
                    <RepeatTicket
                        ticket={ticket}
                        switchTic={switchTic}/>
                </div>
            </div>
        </>
    )
}

// Модальное окно пройденых билетов
const RepeatTicket = (props) => {

    const {ticket, switchTic} = props;

    const {closingModalWindow, modal, deletingResolvedTicket} = useModal({
        ticket: ticket,
        switchTic: switchTic
    })

    return(
        <div className={`modal ${modal}`}>
            <div className='modal__wrapper modal__wrapper_repeat'>
                <div className='modal__close' onClick={closingModalWindow}></div>
                <h2 className='modal__title'>Билет {ticket} уже пройден</h2>
                <div className='modal__btns'>
                    <Link 
                        to={`/tickets/${ticket}`} 
                        className='modal__btn modal__btn_again'
                        onClick={deletingResolvedTicket}> Пройти заново
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

export default Tickets