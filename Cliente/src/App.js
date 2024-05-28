import {Routes, Route} from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";

function App(){
    return(
        <>
           <Routes>
            <Route path="/" element = {<Home/>}></Route>
            <Route path="/login" element = {<Login/>}></Route>
            <Route path="/dashboard" element = {<Dashboard/>}></Route>
           </Routes>
        </>
    )
}

export default App;