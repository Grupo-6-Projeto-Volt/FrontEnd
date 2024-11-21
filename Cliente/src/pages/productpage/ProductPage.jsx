import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
<<<<<<< HEAD
import ProdutoInfo from "../../components/produtoInfo/ProdutoInfo"
import { ProdutosData as Lancamentos } from "../../components/produtoslist/ProdutosList.jsx";
=======
import ProdutoInfo from "../../components/produtoInfo/ProdutoInfo";
import { ProdutosData as Recomendados } from "../../components/produtoslist/ProdutosList.jsx";
>>>>>>> 6792e210445cc1d47f33f63374e3c44db7fbd13d

const ProductPage = ({ produtoExemplo }) => {
	return (
		<>
			<NavBarPadrao />
<<<<<<< HEAD
            <ProdutoInfo></ProdutoInfo>
			<Lancamentos
					className="lancamentos"
					secao="Lançamentos"
					nome="lancamentos"
				/>\
=======
			<ProdutoInfo produtoExemplo={produtoExemplo}></ProdutoInfo>
			<Recomendados
				className="recomendados"
				secao="Recomendados"
				nome="recomendados"
				produtoExemplo={produtoExemplo}
			/>
>>>>>>> 6792e210445cc1d47f33f63374e3c44db7fbd13d
			<Footer></Footer>
		</>
	);
};

export default ProductPage;
