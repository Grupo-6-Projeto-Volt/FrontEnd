import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Chamados from "./pages/dashboard/chamados/Chamados";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import ProductPage from "./pages/productpage/ProductPage.jsx";
import CrudTags from "./pages/crudTags/CrudTags.jsx";
import CrudCategorias from "./pages/crudCategorias/CrudCategorias.jsx";

function Rotas() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/tags" element={<CrudTags />} />
					<Route path="/categorias" element={<CrudCategorias />} />
					<Route path="/cadastro" element={<Cadastro />} />
					<Route path="/login" element={<Login />} />
					<Route path="/productpage" element={<ProductPage />} />
					<Route path="/dashboard" element={<Dashboard />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default Rotas;
