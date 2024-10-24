import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
import ProdutoInfo from "../../components/produtoInfo/ProdutoInfo"
import { ProdutosData as Lancamentos } from "../../components/produtoslist/ProdutosList.jsx";

const ProductPage = () => {
	return (
		<>
			<NavBarPadrao />
            <ProdutoInfo></ProdutoInfo>
			<Lancamentos
					className="lancamentos"
					secao="Lançamentos"
					nome="lancamentos"
				/>\
			<Footer></Footer>
		</>
	)
}

export default ProductPage;