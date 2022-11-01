import { useRef } from "react"
import useSlider from "../../../hooks/useSlider";
import TicketNumber from "../../TicketNumber/TicketNumber";
import Additional from "../../Additional/Additional";
import Results from "../Result/Result";
import './exam.scss';

const Exam  = (props) => {

    const {data} = props

    const width = useRef();

    const {widthTranslate, numberProcessing, translateX, ticket, allQuestionAnswered,
        rightAnswers, incorrectAnswers, right, wrong,
        addingAdditionalQuestion, resetQuestions, savingResponses, resetNum,
        saving, question} = useSlider(
        width,
        data,
        true
    );

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
                    <Additional
                        wrong={wrong}
                        addingAdditionalQuestion={addingAdditionalQuestion}
                        answered={allQuestionAnswered}/>
                    <Results 
                        answered={allQuestionAnswered}
                        right={right}
                        ticket={false}
                        wrong={wrong}
                        resetQuestions={resetQuestions}
                        savingResponses={savingResponses}/>
                </ul>
        </div>  
    )
} 

export default Exam