import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Chamados from "./pages/dashboard/chamados/Chamados";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import CadastroProdutos from "./pages/cadastro-produtos/CadastroProdutos";
import Home from "./pages/home/Home.jsx";
import CrudTags from "./pages/crudTags/CrudTags.jsx";
import CrudCategorias from "./pages/crudCategorias/CrudCategorias.jsx";
import ProductPage from "./pages/productpage/ProductPage.jsx";
import Favoritos from "./pages/favoritos/Favoritos.jsx";
import ListagemProdutos from "./pages/listagemprodutos/ListagemProdutos.jsx";
import PaginaProdutos from "./pages/pagina-produtos/PaginaProdutos.jsx";
import BannersEPropagandas from "./pages/bannersepropagandas/BannersEPropagandas.jsx";

function Rotas() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/banners-e-propagandas"
						element={<BannersEPropagandas />}
					/>
					<Route path="/cadastro" element={<Cadastro />} />
					<Route path="/cadastro-produtos" element={<CadastroProdutos />} />
					<Route path="/categorias" element={<CrudCategorias />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard-chamados" element={<Chamados />} />
					<Route path="/editar-produtos/:id" element={<CadastroProdutos />} />
					<Route path="/favoritos" element={<Favoritos />} />
					<Route path="/listagem-produtos" element={<ListagemProdutos />} />
					<Route path="/login" element={<Login />} />
					<Route path="/pagina-produtos" element={<PaginaProdutos />} />
					<Route path="/productpage" element={<ProductPage />} />
					<Route path="/tags" element={<CrudTags />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default Rotas;
