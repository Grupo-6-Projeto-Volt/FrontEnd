import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
import ProdutoInfo from "../../components/produtoInfo/ProdutoInfo"

const ProductPage = () => {
	return (
		<>
			<NavBarPadrao />
            <ProdutoInfo></ProdutoInfo>
			<Footer />
		</>
	)
}

export default ProductPage;