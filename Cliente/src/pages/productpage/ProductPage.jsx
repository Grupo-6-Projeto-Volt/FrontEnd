import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
import ProdutoInfo from "../../components/produtoInfo/ProdutoInfo";
import { ProdutosData as Recomendados } from "../../components/produtoslist/ProdutosList.jsx";

const ProductPage = ({ produtoExemplo }) => {
	return (
		<>
			<NavBarPadrao />
			<ProdutoInfo produtoExemplo={produtoExemplo}></ProdutoInfo>
			<Recomendados
				className="recomendados"
				secao="Recomendados"
				nome="recomendados"
				produtoExemplo={produtoExemplo}
			/>
			<Footer></Footer>
		</>
	);
};

export default ProductPage;
