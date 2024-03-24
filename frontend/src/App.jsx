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
import Logs from "./pages/Logs";
import About from "./pages/About";
import LiveStream from "./pages/LiveStream";

function App() {

    const user = localStorage.getItem('email')
    const name = localStorage.getItem('name')
    const {emailState} = useAuth()
    const baseURL = "https://smarthydro-auth-api.onrender.com"

    return (
        <>
            <div className="App">
                <Routes>
                    {emailState ? (<Route path="/dashboard" element={<Dashboard name={name} title="Dashboard" baseURL={baseURL}/>} />) : (<Route path="/" element={<Landing />} />)}
                    {user && (<Route path="/phAnalysis" exact element={<PhAnalysis name={name} baseURL={baseURL} />} />)}
                    {user && (<Route path="/ecAnalysis" element={<EcAnalysis name={name} baseURL={baseURL} />} />)}
                    {user && (<Route path="/tempAnalysis" element={<TempAnalysis name={name} baseURL={baseURL} />} />)}
                    {user && (<Route path="/summary" element={<Summary name={name} baseURL={baseURL} />} />)}
                    {user && (<Route path="/myaccount" element={<Myaccount name={name} baseURL={baseURL} />} />)}
                    {user && (<Route path="/logs" element={<Logs name={name} baseURL={baseURL} />} />)}
                    {user && (<Route path="/about" element={<About name={name} baseURL={baseURL} />} />)}
                    {user && (<Route path="/liveStream" element={<LiveStream name={name} baseURL={baseURL} />} />)}
                    <Route path="/" element={<Landing />}></Route>
                    <Route path="/login" exact element={<Login baseURL={baseURL} />} />
                    <Route path="/signup" exact element={<Signup baseURL={baseURL} />} />
                    <Route path="/*" element={<NotFound />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
