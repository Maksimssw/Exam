import { useRef } from "react"
import useSlider from "../../../hooks/useSlider"
import TicketNumber from '../../TicketNumber/TicketNumber'
import Results from '../Result/Result';
import './mistakes.scss';

const Mistakes = (props) => {
    const {data} = props 

    const width = useRef();

    const res = [...new Set(data)];


    const {widthTranslate, numberProcessing, translateX, ticket, allQuestionAnswered,
        rightAnswers, incorrectAnswers, right, wrong,
        resetQuestions, savingResponses, resetNum,
        saving, question} = useSlider(
        width,
        res,
    );

    const noMistakes = data.length === 0 ? 
    <div className="mistakes_null">
        <h2>Ошибок нет!</h2>
    </div>: null

    return(
        <div ref={width} className='questions'>
            <TicketNumber 
                ticket={ticket} 
                numberProcessing={numberProcessing}
                rightAnswers={rightAnswers}
                incorrectAnswers={incorrectAnswers}
                resetNum={resetNum}
                save={saving}
                answered={allQuestionAnswered}
                way={`/`}
                text={'пунктам'}
                exam={true}/>
                <ul className='questions__wrapper' style={{
                    transform: `translateX(-${translateX}px)`,
                    width: `${widthTranslate}%`
                }}>
                    {question}
                    {noMistakes}
                    <Results 
                        answered={allQuestionAnswered}
                        quantity={ticket.length}
                        noMistakes={noMistakes}/>
                </ul>
        </div>  
    )
}

export default Mistakes;