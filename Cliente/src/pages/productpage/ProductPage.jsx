import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
import ProdutoInfo from "../../components/produtoInfo/ProdutoInfo"
import { ProdutosData as Recomendados } from "../../components/produtoslist/ProdutosList.jsx";

const ProductPage = () => {
	return (
		<>
			<NavBarPadrao />
			<ProdutoInfo></ProdutoInfo>
			<Recomendados
				className="recomendados"
				secao="Recomendados"
				nome="recomendados"
			/>
			<Footer></Footer>
		</>
	)
}

export default ProductPage;