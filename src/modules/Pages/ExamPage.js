import Exam from "../ExamSection/Exam/Exam";
import questions from '../../questions.json'; 
import { useState, useEffect } from "react";

const ExamPage = () => {

    useEffect(() => {
        createExam(1,5);
        createExam(6,10);
        createExam(11,15);
        createExam(16,20);
    }, [])

    // Рандомный билет
    const randomTicket = () => {
        return Math.floor(Math.random() * (40 - 1)) + 1;
    }

    // Число вопроса
    const numQuestion = (el) => {
        return el.replace(/\D/g, '');
    }

   let arrs = []

    // Создание экзамена
    const createExam = (min, max) => {
        const num = randomTicket();

        const arr = questions.filter(el => {
            return numQuestion(el.ticket_number) == num;
        }).filter(el => {
            return numQuestion(el.title) >= min && numQuestion(el.title) <= max
        })

        arrs.push(...arr);
    }

    return (
        <div className="exam">
            <div className="container">
                <Exam data={arrs}/>
            </div>
        </div>
    )
}

export default ExamPage;