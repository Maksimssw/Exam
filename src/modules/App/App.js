import { lazy } from "react";
import Traffic from "../Traffic/Traffic";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Suspense } from "react";
import '../Style/modal.scss';

const TicketsPage = lazy(() => import('../Pages/TicketsPage'));
const TicketPage = lazy(() => import('../Pages/TicketPage'));
const ThemesPage = lazy(() => import('../Pages/ThemesPage'));
const TopicPage = lazy(() => import('../Pages/TopicPage'));
const ExamPage = lazy(() => import('../Pages/ExamPage'));
const MistakesPage = lazy(() => import('../Pages/MistakesPage'));

const App = () => {
    return (
        <Suspense>
            <Router>
                <Routes>
                    <Route path="/" element={<Traffic/>}/>
                    <Route path="/tickets" element={<TicketsPage/>}/>
                    <Route path="/tickets/:idTicket" element={<TicketPage/>}/>
                    <Route path="/themes" element={<ThemesPage/>} />
                    <Route path="/themes/:idTopic" element={<TopicPage/>}/>
                    <Route path="/exam" element={<ExamPage/>}/>
                    <Route path="/mistakes" element={<MistakesPage/>}/>
                </Routes>
            </Router>
        </Suspense>
    )
}

export default App;