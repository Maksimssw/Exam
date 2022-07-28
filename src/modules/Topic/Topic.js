import { useParams } from "react-router-dom"

const Topic = () => {
    const aswh = useParams();
    const {idTopic}  = aswh;
    
    console.log(idTopic);
    return(
        <div> Hello</div>
    )
}

export default Topic;