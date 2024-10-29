import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
import ProdutoInfo from "../../components/produtoInfo/ProdutoInfo";
import { ProdutosData as Lancamentos } from "../../components/produtoslist/ProdutosList.jsx";

const ProductPage = ({ produtoExemplo }) => {
	return (
		<>
			<NavBarPadrao />
			<ProdutoInfo produtoExemplo={produtoExemplo}></ProdutoInfo>
			<Lancamentos
				className="lancamentos"
				secao="Lançamentos"
				nome="lancamentos"
				produtoExemplo={produtoExemplo}
			/>
			<Footer></Footer>
		</>
	);
};

export default ProductPage;
