import { useState, useRef } from 'react';
import TicketNumber from '../../TicketNumber/TicketNumber';
import Results from '../Results/Results';
import Additional from '../../Additional/Additional';
import useSlider from '../../../hooks/useSlider';

const Questions = (props) =>{

    const {wholTicket} = props;

    const width = useRef();

    const {widthTranslate, numberProcessing, translateX, ticket, allQuestionAnswered,
        rightAnswers, incorrectAnswers, right, wrong,
        addingAdditionalQuestion, resetQuestions, savingResponses, resetNum,
        saving, question, scrollNum} = useSlider(
        width,
        wholTicket
    );

    // Номер билета 
    const [ticketNumber, setTicketNumber] = useState(
        +ticket[0].ticket_number.replace(/\D/g, '')
    )

    const button = useRef(null);

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
                scrollNum={scrollNum}/>
            <div ref={width} className='questions'>
                <ul className='questions__wrapper' style={{
                    transform: `translateX(-${translateX}px)`,
                    width: `${widthTranslate}%`
                }}>
                    {question}
                    <Additional
                        wrong={wrong}
                        addingAdditionalQuestion={addingAdditionalQuestion}
                        answered={allQuestionAnswered}/>
                    <Results 
                        answered={allQuestionAnswered}
                        right={right}
                        wrong={wrong}
                        resetQuestions={resetQuestions}
                        ticket={ticketNumber}
                        savingResponses={savingResponses}/>
                </ul>
            </div>
        </>
    )
}


export default Questions