import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Chamados from "./pages/dashboard/chamados/Chamados";
import Login from "./pages/login/Login";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/cadastro" element={<Cadastro />} />
				<Route path="/dashboard-chamados" element={<Chamados />}></Route>
			</Routes>
		</>
	);
}

export default App;
