import "../src/styles/main.scss";
import "../src/styles/style.scss";
import "./authentication/App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PhAnalysis from "./pages/PhAnalysis";
import EcAnalysis from "./pages/EcAnalysis";
import TempAnalysis from "./pages/TempAnalysis";
import Summary from "./pages/Summary";
import Myaccount from "./pages/Myaccount";
import Landing from "./pages/Landing";
import NotFound from "./pages/Notfound";
import Login from "./authentication/Login"
import Signup from "./authentication/SignUp";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Landing />}></Route>
                    <Route path="/login" exact element={<Login />}></Route>
                    <Route path="/signup" exact element={<Signup />}></Route>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/phAnalysis" element={<PhAnalysis />} />
                    <Route path="/ecAnalysis" element={<EcAnalysis />} />
                    <Route path="/tempAnalysis" element={<TempAnalysis />} />
                    <Route path="/summary" element={<Summary />} />
                    <Route path="/myaccount" element={<Myaccount />} />
                    <Route path="*" element = {<NotFound/>}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
