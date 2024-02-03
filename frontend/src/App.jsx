import "../src/styles/main.scss";
import "../src/styles/style.scss";
import "./authentication/App.css"
import { Routes, Route } from "react-router-dom";
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
import useAuth from "./authentication/auth";

function App() {

    const user = localStorage.getItem('email')
    const name = localStorage.getItem('name')
    const {emailState} = useAuth()

    return (
        <>
            <div className="App">
                <Routes>
                    {emailState ? (<Route path="/dashboard" element={<Dashboard name={name} title="Dashboard"/>} />) : (<Route path="/login" element={<Login />} />)}
                    {user && (<Route path="/phAnalysis" exact element={<PhAnalysis name={name}/>} />)}
                    {user && (<Route path="/ecAnalysis" element={<EcAnalysis name={name}/>} />)}
                    {user && (<Route path="/tempAnalysis" element={<TempAnalysis name={name}/>} />)}
                    {user && (<Route path="/summary" element={<Summary name={name}/>} />)}
                    {user && (<Route path="/myaccount" element={<Myaccount name={name}/>} />)}
                    <Route path="/" element={<Landing />}></Route>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/signup" exact element={<Signup />} />
                    <Route path="/*" element={<NotFound />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
