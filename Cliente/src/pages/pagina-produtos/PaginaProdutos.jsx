import { useEffect, useState } from "react";
import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";
import CategoriaProdutos from "../../components/categoriaProdutos/CategoriaProdutos.jsx";
import { useParams } from "react-router-dom";
import { produtosModel } from "../../model/produtosModel.js";

const PaginaProdutos = () => {
	const { titulo, busca } = useParams();
	let [produtos, setProdutos] = useState([]);

	async function getProdutos() {
		let response;
		if (titulo !== "Busca") {
			response = await produtosModel.buscarProdutoPorCategoria(busca);
		} else {
			response = await produtosModel.pesquisaProdutos(busca);
		}
		setProdutos(response);
	}

	useEffect(() => {
		getProdutos();
	}, [busca, titulo]);

	return (
		<>
			<NavBarPadrao />
			<CategoriaProdutos
				tituloPagina={
					titulo !== "Busca" ? titulo : `Pesquisa de Produto: "${busca}"`
				}
				dadosProduto={produtos}
			/>
			<Footer />
		</>
	);
};

export default PaginaProdutos;
