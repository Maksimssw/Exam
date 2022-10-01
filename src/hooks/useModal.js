import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const useModal = (ticket, switchTic) => {

    // Состояние модального окна
    const [modal, setModal] = useState('closed');

    // Скрытие модального окна 
    const closingModalWindow = () => setModal('hidden');

    // Открытие модального окна
    useEffect(() => {
        if(ticket){
            setModal('active'); 
        }
    }, [switchTic])

    return {closingModalWindow, modal}
}

export default useModal;