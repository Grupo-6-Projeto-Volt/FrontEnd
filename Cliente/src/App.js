import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Chamados from "./pages/dashboard/chamados/Chamados";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import CadastroProdutos from "./pages/cadastro-produtos/CadastroProdutos";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/cadastro" element={<Cadastro />} />
				<Route path="/cadastro-produtos" element={<CadastroProdutos />}></Route>
				<Route path="/dashboard-chamados" element={<Chamados />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
			</Routes>
		</>
	);
}

export default App;
