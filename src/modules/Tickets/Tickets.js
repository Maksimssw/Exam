import './tickets.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Tickets = (props) => {

    const {tickets} = props;

    const ticketsList = tickets.map(el => {

        // Получение цифры билета
        const num = +el.replace(/\D/g, '');
        
        // Создание карточки билета
        return(
            <Link key={num} to={`/tickets/${num}`} id={`ticket-${num}`} className='tickets__list'>
                <h2 className='tickets__number'>{el}</h2>
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
        if(ticketsList.length === 40 && solvedTickets){
            const arr = ticket.split('-');
        
            // Удаление повторяющих номеров билетов и пробелов
            const arrFil =  arr.filter((item, index) => {
                return arr.indexOf(item) === index
            }).filter(item => item !== '');

            arrFil.forEach(el => {
                const ticketList = document.getElementById(`ticket-${el}`);

                ticketList.classList.add('decided');
            })
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
                            width: '0%'
                        }}>
                        </div>
                    </div>
                    <div className='tickets__wrapper'>
                        {ticketsList}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tickets