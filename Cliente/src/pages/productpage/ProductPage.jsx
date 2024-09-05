import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
import ProdutoInfo from "../../components/produtoInfo/ProdutoInfo"
import { ProdutosData as Ofertas } from "../../components/produtoslist/ProdutosList.jsx";

const ProductPage = () => {
	return (
		<>
			<NavBarPadrao />
            <ProdutoInfo></ProdutoInfo>
			<Ofertas
					secao='Ofertas'
					nome = 'ofertas' />
			<Footer />
		</>
	)
}

export default ProductPage;