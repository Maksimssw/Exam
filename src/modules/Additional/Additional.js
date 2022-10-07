import './additional.scss';
import questions from '../../questions.json';

import { useEffect, useState } from 'react';

/* Все вопросы в экзаменационном билете разделены на 4 тематических блока, 
    по пять в каждом. Тематический блок — это группировка вопросов по одной 
    из основных 4-х тем ПДД. Блоки в билете идут друг за другом в таком 
    порядке: первый блок (1-5 вопрос), второй блок (6-10 вопрос), третий 
    блок (11-15 вопрос), четвёртый блок (16-20 вопрос).*/

// Дополнительные вопросы
const Additional = (props) => {

    const {activeAdditional, wrong, addingAdditionalQuestion} = props;

    // Дополнительные вопросы
    const [additional, setAdditional] = useState(null);

    useEffect(() => {
        if(wrong > 3 || !activeAdditional){}else{
            createQuestion(wrong);
        }
    }, [activeAdditional])

    const createQuestion = (wrong) => {
        if(wrong === 1){
            //Рандомный билет
            const randomNumTicket = Math.floor(Math.random() * (40 - 1) + 1);

            // Первый тематический блок
            if(wrong < 6){
                const data = questions.filter(el => {
                    return el.ticket_number === `Билет ${randomNumTicket}`;
                }).filter(el => {
                    return el.title.replace(/\D/g, '') < 6;
                }).map(el => {
                    return {...el, title: `Вопрос ${+el.title.replace(/\D/g, '') + 20}`}
                })
                addingAdditionalQuestion(data);
            }
        }
    }
}

export default Additional;