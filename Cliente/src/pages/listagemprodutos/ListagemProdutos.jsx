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

	function handleDelete(
		editIconId,
		deleteIconId,
		confirmDeleteIconId,
		cancelDeleteIconId
	) {
		let iptDeleteIcon = document.getElementById(deleteIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptConfirmDeleteIcon = document.getElementById(confirmDeleteIconId);
		let iptCancelDeleteIcon = document.getElementById(cancelDeleteIconId);

		iptDeleteIcon.style.display = "none";
		iptEditIcon.style.display = "none";
		iptConfirmDeleteIcon.style.display = "inline-block";
		iptCancelDeleteIcon.style.display = "inline-block";
	}

	async function handleConfirmDelete(
		id,
		confirmDeleteIconId,
		cancelDeleteIconId,
		editIconId,
		deleteIconId
	) {
		let iptConfirmDeleteIcon = document.getElementById(confirmDeleteIconId);
		let iptCancelDeleteIcon = document.getElementById(cancelDeleteIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptDeleteIcon = document.getElementById(deleteIconId);

		await produtosModel
			.deletarProduto(id)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log("Houve um erro ao deletar o produto:", error);
			});

		iptConfirmDeleteIcon.style.display = "none";
		iptCancelDeleteIcon.style.display = "none";
		iptEditIcon.style.display = "inline-block";
		iptDeleteIcon.style.display = "inline-block";

		getProductsList();
	}

	function handleCancelDelete(
		confirmDeleteIconId,
		cancelDeleteIconId,
		editIconId,
		deleteIconId
	) {
		let iptConfirmDeleteIcon = document.getElementById(confirmDeleteIconId);
		let iptCancelDeleteIcon = document.getElementById(cancelDeleteIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptDeleteIcon = document.getElementById(deleteIconId);

		iptConfirmDeleteIcon.style.display = "none";
		iptCancelDeleteIcon.style.display = "none";
		iptEditIcon.style.display = "inline-block";
		iptDeleteIcon.style.display = "inline-block";
	}

	useEffect(() => {
		getProductsList();
	}, []);

	async function getProductsList() {
		try {
			let response = await produtosModel.listarProdutos();
			let lista = [];
			response.forEach((produto) => {
				let confirmDeleteIconId = `ipt_confirm_delete_icon_${produto.id}`;
				let cancelDeleteIconId = `ipt_cancel_delete_icon_${produto.id}`;

				let editIconId = `ipt_edit_icon_${produto.id}`;
				let deleteIconId = `ipt_delete_icon_${produto.id}`;

				lista.push({
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
							<div className={styles["list-btn-area"]}>
								<FaPencil
									id={editIconId}
									cursor={"pointer"}
									onClick={() => navigate(`/editar-produtos/${produto.id}`)}
								/>
								<FaTrash
									id={deleteIconId}
									cursor={"pointer"}
									onClick={() =>
										handleDelete(
											editIconId,
											deleteIconId,
											confirmDeleteIconId,
											cancelDeleteIconId
										)
									}
								/>
								<FaCheck
									id={confirmDeleteIconId}
									cursor={"pointer"}
									display={"none"}
									onClick={() =>
										handleConfirmDelete(
											produto.id,
											confirmDeleteIconId,
											cancelDeleteIconId,
											editIconId,
											deleteIconId
										)
									}
								/>
								<FaX
									id={cancelDeleteIconId}
									cursor={"pointer"}
									display={"none"}
									onClick={() =>
										handleCancelDelete(
											confirmDeleteIconId,
											cancelDeleteIconId,
											editIconId,
											deleteIconId
										)
									}
								/>
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
