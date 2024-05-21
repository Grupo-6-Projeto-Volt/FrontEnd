import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Pagina from "./pages/pagina/Pagina";
import Adicionar from "./pages/adicionar/Adicionar";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/pagina" element={<Pagina />} />
                <Route path="/adiconar" element={<Adicionar />} />
            </Routes>
        </>
    );
}

export default App;
