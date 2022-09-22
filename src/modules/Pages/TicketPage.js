import Ticket from "../Ticket/Ticket";
import { useParams } from 'react-router';
import questions from '../../questions.json';
import { useEffect, useState } from "react";

const TicketPage = () => {

    const nswr = useParams();

    // Получение номера билета
    const {idTicket} = nswr;

    const [ticket, setTicket] = useState();

    useEffect(() => {
        getTicket();
    }, [])

    const getTicket = () => {
        // Фильтрация Билетов
        const res = questions.filter(el => {

            // Получение номера билета
            const num = el.ticket_number.replace(/\D/g, '');
            
            // В случае если номера билетов одинаковые 
            // Возвращение вопроса 
            if(num == idTicket){
                return el;
            };
        })

        setTicket(res);
    }

    return(
        <Ticket ticket={ticket}/>
    )
}

export default TicketPage;