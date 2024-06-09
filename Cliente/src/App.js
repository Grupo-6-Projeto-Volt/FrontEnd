import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Chamados from "./pages/dashboard/chamados/Chamados";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/cadastro" element={<Cadastro />} />
				<Route path="/dashboard-chamados" element={<Chamados />}></Route>
			</Routes>
		</>
	);
}

export default App;
