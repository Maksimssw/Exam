
import Traffic from "../Traffic/Traffic";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Suspense } from "react";
import Themes from "../Themes/Themes";
import Topic from "../Topic/Topic";

const App = () => {
    return (
        <Suspense>
            <Router>
                <Routes>
                    <Route path="/" element={<Traffic/>}/>
                    <Route path="/themes" element={<Themes/>}/>
                    <Route path="/themes/:idTopic" element={<Topic/>}/>
                </Routes>
            </Router>
        </Suspense>
    )
}

export default App;