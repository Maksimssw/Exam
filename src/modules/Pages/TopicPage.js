import { useState } from "react" 
import { useParams } from "react-router"
import Topic from "../ThemesSection/Topic/Topic";
import questions from '../../questions.json'

const TopicPage = () => {
    // Получение темы
    const nswr = useParams();
    const {idTopic} = nswr

    const [topic, setTopic] = useState(idTopic);

    const questionsTopic = questions.filter(el => {
        return el.topic === topic
    }).map((el, i) => {
        return {...el, title: `Вопрос ${i + 1}`}
    })

    return(
        <section>
            <div className="container">
                <Topic data={questionsTopic}/>
            </div>
        </section>
    )
}

export default TopicPage