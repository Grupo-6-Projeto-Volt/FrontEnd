import styles from "./ListagemProdutos.module.css";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Searchbar from "../../components/searchbar/Searchbar";
import Table from "../../components/list/Table";
import Sidebar from "../../components/sidebar/Sidebar";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import { produtosModel } from "../../model/produtosModel";
import { useEffect, useState } from "react";

function ListagemProdutos() {
	let navigate = useNavigate();

	let [produtos, setProdutos] = useState([]);

	let headersProdutos = [
		"",
		"Id",
		"Nome do Produto",
		"Categoria",
		"Estado",
		"Preço",
		"",
	];

	function handleNewProductPress() {
		navigate("/cadastro-produtos");
	}

	useEffect(() => {
		getProductsList();
	}, []);

	async function getProductsList() {
		try {
			let response = await produtosModel.listarProdutos();
			let lista = [];
			response.forEach((produto) => {
				lista.push({
					image: () => {
						return (
							<img
								className={styles["list-image"]}
								src="https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UF1000,1000_QL80_.jpg"
								alt="Iphone"
							/>
						);
					},
					id: produto.id,
					nome: produto.nome,
					categoria: produto.categoria,
					estado: produto.estadoGeral,
					preco: "R$" + Number(produto.preco).toFixed(2),
					acoes: () => {
						return (
							<div className={styles["list-btn-area"]}>
								<FaPencil
									cursor={"pointer"}
									onClick={() => navigate(`/editar-produtos/${produto.id}`)}
								/>
								<FaTrash cursor={"pointer"} />
							</div>
						);
					},
				});
			});
			setProdutos(lista);
		} catch (error) {
			console.error("Erro:", error);
		}
	}

	return (
		<div className={styles["ListagemProdutos"]}>
			<Navbar />
			<Sidebar />
			<div className={styles["content"]}>
				<div className={styles["container"]}>
					<div className={styles["page-header"]}>
						<h1 className={styles["title"]}>Listagem de Produtos</h1>
						<Searchbar
							width={"20rem"}
							onChange={() => {
								console.log("teste");
							}}
						/>
						<div className={styles["filter-group"]}>
							<span>Filtrar por: </span>
							<select
								onChange={(e) => {
									console.log("teste");
								}}
							>
								<option value="0">Nome Asc</option>
								<option value="1">Nome Desc</option>
								<option value="2">Preço Asc</option>
								<option value="3">Preço Desc</option>
								<option value="4">Categoria</option>
								<option value="5">Estado</option>
							</select>
						</div>
						<DefaultButton
							text={"Adicionar Produto"}
							onClick={handleNewProductPress}
						/>
					</div>
					<div className={styles["table-area"]}>
						<Table headers={headersProdutos} values={produtos} limit={5} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListagemProdutos;
