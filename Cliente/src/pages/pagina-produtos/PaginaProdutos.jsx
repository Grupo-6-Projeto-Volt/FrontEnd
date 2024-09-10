import { useEffect, useState } from "react";
import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
import CategoriaProdutos from "../../components/categoriaProdutos/CategoriaProdutos.jsx";
import { useParams } from "react-router-dom";
import { produtosModel } from "../../model/produtosModel.js";

const PaginaProdutos = () => {
	const { titulo, categoria } = useParams();
	let [produtos, setProdutos] = useState([]);

	async function getProdutos() {
		let response = await produtosModel.buscarProdutoPorCategoria(categoria);
		setProdutos(response);
	}

	useEffect(() => {
		getProdutos();
	}, [categoria, titulo]);

	return (
		<>
			<NavBarPadrao />
			<CategoriaProdutos tituloPagina={titulo} dadosProduto={produtos} />
			<Footer />
		</>
	);
};

export default PaginaProdutos;
