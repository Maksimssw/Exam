import { useState, useEffect } from "react";

const useModal = ({num, switchTic}) => {

    // Состояние модального окна
    const [modal, setModal] = useState('closed');

    // Скрытие модального окна 
    const closingModalWindow = () => setModal('hidden');

    // Открытие модального окна
    useEffect(() => {
        if(num || switchTic){
            setModal('active'); 
        }
    }, [switchTic])
    
    // Удаление решенного ответа
    const deletingResolvedTicket = (name) => {
        const local = localStorage.getItem(name)
            .split('-')
            .filter(el => el !== num)
            .join('-');
        localStorage.removeItem(name);
        localStorage.setItem(name, local);
    } 

    return {closingModalWindow, modal, deletingResolvedTicket}
}

export default useModal;