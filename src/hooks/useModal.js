import { useState, useEffect } from "react";

const useModal = ({ticket, switchTic}) => {

    // Состояние модального окна
    const [modal, setModal] = useState('closed');

    // Скрытие модального окна 
    const closingModalWindow = () => setModal('hidden');

    // Открытие модального окна
    useEffect(() => {
        if(ticket || switchTic){
            setModal('active'); 
        }
    }, [switchTic])
    
    // Удаление решенного ответа
    const deletingResolvedTicket = () => {
        const local = localStorage.getItem('solvedTickets')
            .split('-')
            .filter(el => el !== ticket)
            .join('-');
        localStorage.removeItem('solvedTickets');
        localStorage.setItem('solvedTickets', local);
    } 

    return {closingModalWindow, modal, deletingResolvedTicket}
}

export default useModal;