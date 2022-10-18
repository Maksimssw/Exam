import { useState, useRef } from "react";
import TicketNumber from "../../TicketNumber/TicketNumber";
import useSlider from "../../../hooks/useSlider";
import Results from "../Results/Results";

const Topic = (props) => {
    const {data, num} = props;

    const width = useRef();

    // Получение одной темы
    const [topic, setTopic] = useState(data);

    const {widthTranslate, numberProcessing, translateX, ticket, allQuestionAnswered,
        rightAnswers, incorrectAnswers, right, wrong, setAnswerUser, searchNum,
        processingCorrectAnswer, handlingIncorrectResponse, nextQuestion,
        addingAdditionalQuestion, resetQuestions, savingResponses, resetNum,
        saving, question} = useSlider(
        width,
        topic
    );

    return(
        <>
            <TicketNumber
                ticket={ticket} 
                numberProcessing={numberProcessing}
                rightAnswers={rightAnswers}
                incorrectAnswers={incorrectAnswers}
                resetNum={resetNum}
                save={saving}
                answered={allQuestionAnswered}
                way={'/themes'}
            />
            <div ref={width} className='questions'>
                <ul className='questions__wrapper' style={{
                    transform: `translateX(-${translateX}px)`,
                    width: `${widthTranslate}%`
                }}>
                    {question}
                    <Results 
                        wrong={wrong} 
                        answered={allQuestionAnswered}
                        num={num}
                        />
                </ul>
            </div>
        </>
    )
}

export default Topic