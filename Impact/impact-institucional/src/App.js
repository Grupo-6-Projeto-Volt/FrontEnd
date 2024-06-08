import "./App.css";
import NavBar from "./components/navbar/NavBar";
import Banner from "./components/banner/Banner";
import { Servicos } from "./components/servicos/Servicos";
import Squad from "./components/squad/Squad";
import FaleConosco from "./components/faleconosco/FaleConosco";
import Competencias from "./components/competencias/Competencias";
import Footer from "./components/footer/Footer";
import SobreNos from "./components/sobrenos/Sobrenos";

function App() {
	return (
		<>
			<div className="header">
				<Banner />
				<NavBar />
			</div>
			<Servicos />
			<Competencias />
			<SobreNos />
			<Squad />
			<FaleConosco />
			<Footer />
		</>
	);
}

export default App;
