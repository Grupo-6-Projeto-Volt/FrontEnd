import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Chamados from "./pages/dashboard/chamados/Chamados";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/cadastro" element={<Cadastro />} />
				<Route path="/dashboard-chamados" element={<Chamados />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
			</Routes>
		</>
	);
}

export default App;
