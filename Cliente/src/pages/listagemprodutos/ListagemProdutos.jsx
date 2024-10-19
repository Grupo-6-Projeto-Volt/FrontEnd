import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import ConfirmCancelActionButton from "../../components/confirmcancelactionbutton/ConfirmCancelActionButton";
import ExportButton from "../../components/exportButton/ExportButton";
import Table from "../../components/list/Table";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Searchbar from "../../components/searchbar/Searchbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { produtosModel } from "../../model/produtosModel";
import styles from "./ListagemProdutos.module.css";

function ListagemProdutos() {
	const navigate = useNavigate();

	const [produtos, setProdutos] = useState([]);
	const headersProdutos = [
		"",
		"Id",
		"Nome do Produto",
		"Categoria",
		"Estado",
		"Preço",
		"",
	];

	function handleDelete(id) {
		let response = async () => {
			await produtosModel
				.deletarProduto(id)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log("Houve um erro ao deletar o produto:", error);
				});
			getProductsList();
		};
		response();
	}

	function handleEdit(id) {
		navigate(`/editar-produtos/${id}`);
	}

	useEffect(() => {
		getProductsList();
	}, []);

	async function getProductsList() {
		try {
			let response = await produtosModel.listarProdutos();
			let produtos = [];

			response.forEach((produto) => {
				produtos.push({
					image: () => {
						return (
							<img
								className={styles["list-image"]}
								src={
									produto.imagensProduto[0] !== undefined
										? produto.imagensProduto[0].codigoImagem
										: "https://ircsan.com/wp-content/uploads/2024/03/placeholder-image.png"
								}
								alt="Iphone"
							/>
						);
					},
					id: produto.id,
					nome: () => {
						return <div className={styles["nome-prod"]}>{produto.nome}</div>;
					},
					categoria: produto.categoria,
					estado: produto.estadoGeral,
					preco: "R$" + Number(produto.preco).toFixed(2),
					acoes: () => {
						return (
							<ConfirmCancelActionButton
								onEdit={() => handleEdit(produto.id)}
								onDelete={() => handleDelete(produto.id)}
							/>
						);
					},
				});
			});
			setProdutos(produtos);
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
				<h1 className={styles["title"]}>Listagem de Produtos</h1>
					<div className={styles["page-header"]}>
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
							onClick={() => {
								navigate("/cadastro-produtos");
							}}
						/>
						<ExportButton></ExportButton>
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
