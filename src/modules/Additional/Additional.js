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


    // Создание тем
    const createThemes = (randomNumTicket, num) => {
        return questions.filter(el => {
            return el.ticket_number === `Билет ${randomNumTicket}`;
        }).map(el => {
            return {...el, title: `Вопрос ${element(el) + 20}`}
        })
    }

    // Сокращение 
    const element = (el) => {
        return +el.title.replace(/\D/g, '');
    }

    const createQuestion = (wrong) => {
        if(wrong === 1){
            let data;

            // Получение номера ошибки
            const numError = +document.querySelector('numbers__list wrong')

            //Рандомный билет
            const randomNumTicket = Math.floor(Math.random() * (40 - 1) + 1);

            console.log(numError);

            // Первый тематический блок
            if(5 < 6){
                data = createThemes(randomNumTicket).filter(el => {
                    return element(el) - 20 < 6
                })
            }
            // Второй тематический блок 
            else if(numError >= 6 && numError <= 10){
                data = createThemes(randomNumTicket).filter(el => {
                    return element(el) >= 6 && element(el) <= 10;
                })
            }
            addingAdditionalQuestion(data);
        }
    }
}

export default Additional;