import Avaliacoes from "../../components/avaliacoes/Avaliacoes.jsx";
import Banner from "../../components/banner/Banner.jsx";
import Categorias from "../../components/categorias/Categorias.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import NossosServicos from "../../components/nossosServicos/NossosServicos.jsx";
import Oferta from "../../components/oferta/Oferta.jsx";
import { ProdutosData as Lancamentos, ProdutosData as Ofertas } from "../../components/produtoslist/ProdutosList.jsx";
import { Sobre } from "../../components/sobre/Sobre.jsx";
import styles from "./Home.module.css";

const Home = (img) => {
	return (
		<>
		<div className={styles["temp"]}>
			<NavBarPadrao className={styles['nav']} />
			<div className={styles["container"]}>
				<Banner img={img.imgBanner?.url ?? undefined} />
				<Lancamentos
					className="lancamentos"
					secao="Lançamentos"
					nome="lancamentos"
				/>
				<Ofertas secao="Ofertas" nome="ofertas" />
				<Oferta img={img?.imgPropaganda?.url ?? undefined} />
				<Categorias />
				<Sobre className={styles['sobre']} />
				<NossosServicos />
				<Avaliacoes />
			</div>
			<Footer />
		</div>
		</>
	);
};

export default Home;
