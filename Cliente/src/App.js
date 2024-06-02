import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Chamados from "./pages/dashboard/chamados/Chamados";

function App() {
	return (
		<>
			<Routes>
				{/* <Route path="/" element={<Home />}></Route> */}
				{/* <Route path="/login" element={<Login />}></Route> */}
				<Route path="/" element={<Chamados />}></Route>
			</Routes>
		</>
	);
}

export default App;
