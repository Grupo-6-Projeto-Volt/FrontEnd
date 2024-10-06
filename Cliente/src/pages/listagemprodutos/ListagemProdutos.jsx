import styles from "./ListagemProdutos.module.css";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Searchbar from "../../components/searchbar/Searchbar";
import Table from "../../components/list/Table";
import Sidebar from "../../components/sidebar/Sidebar";
import { FaCheck, FaPencil, FaTrash, FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import { produtosModel } from "../../model/produtosModel";
import { useEffect, useState } from "react";

function ListagemProdutos() {
	const navigate = useNavigate();
	const [action, setAction] = useState("");
	const [enabledAction, setEnabledAction] = useState(false);
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

	function handleSubmit(action) {
		setAction(action);
	}

	function changeAction() {
		setEnabledAction(!enabledAction);
	}

	async function handleDelete(id) {
		await produtosModel
			.deletarProduto(id)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log("Houve um erro ao deletar o produto:", error);
			});
		getProductsList();
	}

	useEffect(() => {
		getProductsList();
	}, []);

	async function getProductsList() {
		try {
			let response = await produtosModel.listarProdutos();
			response.forEach((produto) => {
				setProdutos((produtos) => [
					...produtos,
					{
						image: () => {
							return (
								<img
									className={styles["list-image"]}
									src={produto.imagensProduto[0].codigoImagem}
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
										onClick={() => {
											handleSubmit("editar");
											navigate(`/editar-produtos/${produto.id}`);
										}}
									/>
									<FaTrash
										cursor={"pointer"}
										onClick={() => {
											handleSubmit("deletar");
											changeAction();
										}}
									/>
									<FaCheck
										cursor={"pointer"}
										display={!enabledAction ? "none" : "block"}
										onClick={() => {
											if (action === "deletar") {
												handleDelete(produto.id);
												getProductsList();
											}
											changeAction();
										}}
									/>
									<FaX
										cursor={"pointer"}
										display={!enabledAction ? "none" : "block"}
										onClick={changeAction}
									/>
								</div>
							);
						},
					},
				]);
			});
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
							onClick={() => {
								handleSubmit("criar");
								navigate("/cadastro-produtos");
							}}
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
