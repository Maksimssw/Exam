import './ticket.scss';
import Loading from '../../Loading/Loading';
import Questions from '../Questions/Questions';

const Ticket = (props) => {

    const {ticket} = props;

    // Компонент загрузки 
    const loading = ticket === undefined ? <Loading/> : null;

    // Компонент всех вопросов одного билета
    const questions = ticket === undefined ? null : <Questions wholTicket={ticket}/>

    return(
        <div className='ticket'>
            <div className='container'>
                <div className='ticket__numbers'>
                    {questions}
                    {loading}
                </div>
            </div>
        </div>
    )
}

export default Ticket;