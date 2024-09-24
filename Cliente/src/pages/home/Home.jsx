import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import { ProdutosData as Lancamentos } from "../../components/produtoslist/ProdutosList.jsx";
import { ProdutosData as Ofertas } from "../../components/produtoslist/ProdutosList.jsx";
import { Sobre } from "../../components/sobre/Sobre.jsx";
import styles from "./Home.module.css";
import Footer from "../../components/footer/Footer.jsx";
import NossosServicos from "../../components/nossosServicos/NossosServicos.jsx";
import Avaliacoes from "../../components/avaliacoes/Avaliacoes.jsx";
import Banner from "../../components/banner/Banner.jsx";
import Oferta from "../../components/oferta/Oferta.jsx";
import Categorias from "../../components/categorias/Categorias.jsx";

const Home = () => {
	return (
		<>
			<NavBarPadrao />
			<div className={styles["container"]}>
				<Banner />
				<Lancamentos
					className="lancamentos"
					secao="Lançamentos"
					nome="lancamentos"
				/>
				<Ofertas secao="Ofertas" nome="ofertas" />
				<Oferta />
				<Categorias />
				<Sobre />
				<NossosServicos />
				<Avaliacoes />
			</div>
			<Footer />
		</>
	);
};

export default Home;
