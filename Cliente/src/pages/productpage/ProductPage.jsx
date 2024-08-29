import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
import ProdutInfo from "../../components/produtoInfo/ProdutoInfo"
import { ProdutosData as Lancamentos } from "../../components/produtoslist/ProdutosList.jsx";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
	return (
		<>
			<NavBarPadrao />
			<ProdutInfo></ProdutInfo>
			{/* <div className={styles["container"]}>
				<Lancamentos className="lancamentos"
					secao='Lançamentos'
					nome = 'lancamentos' />				
			</div> */}
			<Footer />
		</>
	)
}

export default ProductPage;