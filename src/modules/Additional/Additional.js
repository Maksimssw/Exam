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

    useEffect(() => {
        if(answered === 20){
            createQuestion(wrong);
        }
    }, [answered])


    // Создание тем
    const createThemes = (randomNumTicket, from, to) => {
        return questions.filter(el => {
            return el.ticket_number === `Билет ${randomNumTicket}`;
        }).filter(el => {
            return element(el) >= from && element(el) <= to;
        }).map((el, i = 1) => {
            return {...el, title: `Вопрос ${i + 21}`}
        })
    }

    // Сокращение 
    const element = (el) => {
        return +el.title.replace(/\D/g, '');
    }

    const createQuestion = (wrong) => {
        const numWrapp = document.querySelector('.numbers');
        if(wrong === 1){
            // Получение номера ошибки
            const wrong = +numWrapp.querySelector('.wrong').innerText;

            //Рандомный билет
            const randomNumTicket = Math.floor(Math.random() * (40 - 1) + 1);
            console.log(4);
            // Первый тематический блок
            if(wrong < 6){
                const data = createThemes(randomNumTicket, 0, 5)
                console.log(data);
                addingAdditionalQuestion(data);
            }
            // Второй тематический блок 
            else if(wrong >= 6 && wrong <= 10){
                const  data = createThemes(randomNumTicket, 6, 10)
                addingAdditionalQuestion(data);
            }
            // Третий тематический блок 
            else if(wrong >= 11 && wrong <= 15){
                const  data = createThemes(randomNumTicket, 11, 15)
                console.log(data);
                addingAdditionalQuestion(data);
            }
            // Четвертый тематический блок 
            else if(wrong >= 16 && wrong <= 20){
                const  data = createThemes(randomNumTicket, 16, 20)
                addingAdditionalQuestion(data);
            }
        }else if(wrong === 2){
            
        }
    }
}

export default Additional;