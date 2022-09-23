import './ticket.scss';
import Loading from '../Loading/Loading';

const Ticket = (props) => {

    const {ticket} = props;

    const numbers = ticket === undefined ? null : ticket.map(el => {

        // Получение номера вопроса
        const num = el.title.replace(/\D/g, '');

        // Создание номера
        return (
            <li key={num} className='numbers__list'>
                {num}
            </li>
        )
    });
    

    // В случае если данные еще не пришли, то номера выставлятся не будут
    const ticketNumber = ticket === undefined ? null : <TicketNumber numbers={numbers}/>

    // Компонент загрузки 
    const loading = ticket === undefined ? <Loading/> : null;

    return(
        <div className='ticket'>
            <div className='container'>
                <div className='ticket__numbers'>
                    {ticketNumber}
                    {loading}
                </div>
            </div>
        </div>
    )
}

const TicketNumber = (props) =>{

    // Номера всех вопросов
    const {numbers} = props

    return(
        <ul className='numbers'>
            {numbers}
        </ul>
    )
}

export default Ticket;