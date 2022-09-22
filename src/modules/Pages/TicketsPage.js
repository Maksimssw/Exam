import Tickets from "../Tickets/Tickets";
import questions from '../../questions.json';
import { useEffect, useState } from "react";

const TicketsPage = () => {
    
    useEffect(() => {
        ticketNumber(questions);
    }, [])

    const [tickets, setTickets] = useState([]); 

    const ticketNumber = (data) =>{
        data.map(el => {
            tickets.push(el.ticket_number);

            // Удаление повторяющих элементов
            const ticket = tickets.filter(function(item, pos) {
                return tickets.indexOf(item) == pos;
            })

            // Получение всех Билетов
            setTickets(ticket);
        });
    }

    return(
        <Tickets tickets={tickets}/>
    )
}

export default TicketsPage;