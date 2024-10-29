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
import { toast } from "react-toastify";
import { validateAuth } from "../../utils/global";

function ListagemProdutos() {
	const navigate = useNavigate();
	const [produtos, setProdutos] = useState([]);
	const [filter, setFilter] = useState(0);
	const [search, setSearch] = useState("");
	const headersProdutos = [
		"",
		"Id",
		"Nome do Produto",
		"Categoria",
		"Estado",
		"Preço",
		"",
	];

	function validateAuthentication() {
		if (!validateAuth() || sessionStorage.CATEGORIA !== "1") {
			navigate("/login");
		}
	}

	function handleDelete(id) {
		let response = async () => {
			await produtosModel
				.deletarProduto(id)
				.then((response) => {
					toast.success("Produto deletado!");
				})
				.catch((error) => {
					toast.error("Houve um erro ao deletar o produto:", error);
				});
			getProductsList();
		};
		response();
	}

	function handleEdit(id) {
		navigate(`/editar-produtos/${id}`);
	}

	function filterProducts() {
		switch (filter) {
			case 0:
				getProductsList();
				break;
			case 1:
				setProdutos((produtos) => [
					...produtos.sort((a, b) => a.nome.localeCompare(b.nome)),
				]);
				break;
			case 2:
				setProdutos((produtos) => [
					...produtos.sort((a, b) => b.nome.localeCompare(a.nome)),
				]);
				break;
			case 3:
				setProdutos((produtos) => [
					...produtos.sort(
						(a, b) =>
							Number(a.preco.replace("R$", "")) -
							Number(b.preco.replace("R$", ""))
					),
				]);
				break;

			case 4:
				setProdutos((produtos) => [
					...produtos.sort(
						(a, b) =>
							Number(b.preco.replace("R$", "")) -
							Number(a.preco.replace("R$", ""))
					),
				]);
				break;
			case 5:
				setProdutos((produtos) => [
					...produtos.sort((a, b) => a.categoria.localeCompare(b.categoria)),
				]);
				break;
			case 6:
				setProdutos((produtos) => [
					...produtos.sort((a, b) => a.estado.localeCompare(b.estado)),
				]);
				break;
			default:
				getProductsList();
		}
	}

	useEffect(() => {
		validateAuthentication();
		getProductsList();
	}, []);

	useEffect(() => {
		filterProducts();
	}, [filter, setFilter]);

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
					nome: produto.nome,
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
							onChange={(e) => setSearch(e)}
							onClick={async () => {
								await getProductsList();

								if (
									produtos.filter((a) =>
										a.nome.toLowerCase().includes(search.toLowerCase())
									).length !== 0
								) {
									setProdutos((categorias) => [
										...categorias.filter((a) =>
											a.nome.toLowerCase().includes(search.toLowerCase())
										),
									]);
								}
							}}
						/>
						<div className={styles["filter-group"]}>
							<span>Filtrar por: </span>
							<select onChange={(e) => setFilter(Number(e.target.value))}>
								<option value="0">Sem Filtros</option>
								<option value="1">Nome Asc</option>
								<option value="2">Nome Desc</option>
								<option value="3">Preço Asc</option>
								<option value="4">Preço Desc</option>
								<option value="5">Categoria</option>
								<option value="6">Estado</option>
							</select>
						</div>
						<DefaultButton
							text={"Adicionar Produto"}
							onClick={() => {
								navigate("/cadastro-produtos");
							}}
						/>
						<ExportButton page={"produtos"}></ExportButton>
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
