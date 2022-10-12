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

    const {wrong, addingAdditionalQuestion, answered} = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        if(answered === 20){
            createQuestion(wrong);
        }
    }, [answered])

    let arrs = []

    // Создание тем
    const createThemes = (randomNumTicket, from, to) => {
        // 1 Блок
        const arr =  questions.filter(el => {
            return el.ticket_number === `Билет ${randomNumTicket}`;
        }).filter(el => {
            return element(el) >= from && element(el) <= to;
        }).map((el, i = 1) => {
            return {...el, title: `Вопрос ${i + 21}`}
        });


        // 2 Блока
        arrs.push([...arr]);
        if(arrs.length === 2){
            const question =  [...arrs[0], ...arrs[1]]
            return question.map((el, i) => {
                return {...el, title: `Вопрос ${i + 21}`}
            })
        }
        return arr;
    }

    // Сокращение 
    const element = (el) => {
        return +el.title.replace(/\D/g, '');
    }

    // Блоки по созданию 
    const questionCreationBlocks = (wrong, ticket) => {
        console.log(wrong);
        let data = []

        // Первый тематический блок
        if(wrong < 6){
            data = createThemes(ticket, 0, 5)
        }
        // Второй тематический блок 
        else if(wrong >= 6 && wrong <= 10){
            data = createThemes(ticket, 6, 10)
        }
        // Третий тематический блок 
        else if(wrong >= 11 && wrong <= 15){
            data = createThemes(ticket, 11, 15)
        }
        // Четвертый тематический блок 
        else if(wrong >= 16 && wrong <= 20){
            data = createThemes(ticket, 16, 20)
        }

        addingAdditionalQuestion(data);
    }

    const createQuestion = (wrong) => {
        const numWrapp = document.querySelector('.numbers');
        if(wrong === 1){
            // Получение номера ошибки
            const wrong = +numWrapp.querySelector('.wrong').innerText;

            //Рандомный билет
            const randomNumTicket = Math.floor(Math.random() * (40 - 1) + 1);

            questionCreationBlocks(wrong, randomNumTicket);
        }else if(wrong === 2){
            // Получитить номера ошибок
            const mistakes = numWrapp.querySelectorAll('.wrong');

            // Обработка дополнительных вопросов для каждой ошибки
            mistakes.forEach(el => {
                //Рандомный билет
                const randomNumTicket = Math.floor(Math.random() * (40 - 1) + 1);

                questionCreationBlocks(+el.innerText, randomNumTicket);
            })
        }
    }
}

export default Additional;