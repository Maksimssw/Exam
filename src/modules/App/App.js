import Traffic from "../Traffic/Traffic";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Suspense } from "react";
import { TicketsPage, TicketPage, ThemesPage } from "../Pages";

const App = () => {
    return (
        <Suspense>
            <Router>
                <Routes>
                    <Route path="/" element={<Traffic/>}/>
                    <Route path="/tickets" element={<TicketsPage/>}/>
                    <Route path="/tickets/:idTicket" element={<TicketPage/>}/>
                    <Route path="/themes" element={<ThemesPage/>} />
                </Routes>
            </Router>
        </Suspense>
    )
}

export default App;