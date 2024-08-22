import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Chamados from "./pages/dashboard/chamados/Chamados";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx"
import Favoritos from "./pages/favoritos/Favoritos.jsx";
function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard-chamados" element={<Chamados />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/favoritos" element={<Favoritos />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;