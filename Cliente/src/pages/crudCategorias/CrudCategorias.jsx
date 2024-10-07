import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CrudCategorias.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import Table from "../../components/list/Table";
import { FaCheck, FaPencil, FaTrash, FaX } from "react-icons/fa6";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import { useEffect, useState } from "react";
import { categoriasModel } from "../../model/categoriasModel";
import ExportButton from "../../components/exportButton/ExportButton"


function CrudCategorias() {
	let [categorias, setCategorias] = useState([]);
	let headersCategorias = ["Id", "Nome da Categoria", ""];

	function handleEdit(
		categoriaId,
		editIconId,
		deleteIconId,
		confirmEditIconId,
		cancelEditIconId
	) {
		let iptCategoria = document.getElementById(categoriaId);

		let iptDeleteIcon = document.getElementById(deleteIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptConfirmEditIcon = document.getElementById(confirmEditIconId);
		let iptCancelEditIcon = document.getElementById(cancelEditIconId);

		iptCategoria.disabled = false;
		iptCategoria.className = styles["ipt-categoria"];
		iptCategoria.focus();

		iptDeleteIcon.style.display = "none";
		iptEditIcon.style.display = "none";
		iptConfirmEditIcon.style.display = "inline-block";
		iptCancelEditIcon.style.display = "inline-block";
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

	async function handleConfirmEdit(
		id,
		categoriaId,
		confirmEditIconId,
		cancelEditIconId,
		editIconId,
		deleteIconId
	) {
		let iptCategoria = document.getElementById(categoriaId);
		let iptConfirmEditIcon = document.getElementById(confirmEditIconId);
		let iptCancelEditIcon = document.getElementById(cancelEditIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptDeleteIcon = document.getElementById(deleteIconId);

		iptCategoria.disabled = true;
		iptCategoria.placeholder = iptCategoria.value;

		await categoriasModel
			.atualizarCategoria(id, iptCategoria.value)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log("Houve um erro ao alterar a categoria: " + error);
			});

		iptCategoria.value = "";
		iptCategoria.className = styles["ipt-editable-category"];

		iptConfirmEditIcon.style.display = "none";
		iptCancelEditIcon.style.display = "none";
		iptEditIcon.style.display = "inline-block";
		iptDeleteIcon.style.display = "inline-block";

		getCategoryList();
	}

	function handleCancelEdit(
		categoriaId,
		confirmEditIconId,
		cancelEditIconId,
		editIconId,
		deleteIconId
	) {
		let iptCategoria = document.getElementById(categoriaId);
		let iptConfirmEditIcon = document.getElementById(confirmEditIconId);
		let iptCancelEditIcon = document.getElementById(cancelEditIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptDeleteIcon = document.getElementById(deleteIconId);

		iptCategoria.disabled = true;
		iptCategoria.value = "";
		iptCategoria.className = styles["ipt-editable-category"];

		iptConfirmEditIcon.style.display = "none";
		iptCancelEditIcon.style.display = "none";
		iptEditIcon.style.display = "inline-block";
		iptDeleteIcon.style.display = "inline-block";
	}

	async function handleConfirmDelete(
		id,
		categoriaId,
		confirmDeleteIconId,
		cancelDeleteIconId,
		editIconId,
		deleteIconId
	) {
		let iptCategoria = document.getElementById(categoriaId);
		let iptConfirmDeleteIcon = document.getElementById(confirmDeleteIconId);
		let iptCancelDeleteIcon = document.getElementById(cancelDeleteIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptDeleteIcon = document.getElementById(deleteIconId);

		iptCategoria.className = styles["ipt-editable-category"];

		await categoriasModel
			.deletarCategoria(id)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log("Houve um erro ao deletar a categoria:", error);
			});

		iptConfirmDeleteIcon.style.display = "none";
		iptCancelDeleteIcon.style.display = "none";
		iptEditIcon.style.display = "inline-block";
		iptDeleteIcon.style.display = "inline-block";

		getCategoryList();
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
		getCategoryList();
	}, []);

	async function getCategoryList() {
		let firstItem = {
			id: "",
			nome: () => {
				return (
					<input
						id="ipt_new_category"
						type="text"
						className={styles["ipt-category"]}
						placeholder="Ex: Notebook"
					/>
				);
			},
			botao: () => {
				return (
					<div className={styles["list-btn-area"]}>
						<DefaultButton
							text={"Adicionar Categoria"}
							onClick={() => {
								handleNewCategory();
								getCategoryList();
							}}
						/>
					</div>
				);
			},
		};

		let lista = [firstItem];

		try {
			let response = await categoriasModel.listarCategorias();

			response.forEach((category) => {
				let categoryId = `ipt_category_${category.id}`;

				let editIconId = `ipt_edit_icon_${category.id}`;
				let deleteIconId = `ipt_delete_icon_${category.id}`;

				let confirmDeleteIconId = `ipt_confirm_delete_icon_${category.id}`;
				let cancelDeleteIconId = `ipt_cancel_delete_icon_${category.id}`;

				let confirmEditIconId = `ipt_confirm_edit_icon_${category.id}`;
				let cancelEditIconId = `ipt_cancel_edit_icon_${category.id}`;

				lista.push({
					id: category.id,
					nome: () => {
						return (
							<input
								id={categoryId}
								placeholder={category.nome}
								disabled={true}
								type="text"
								className={styles["ipt-editable-category"]}
							/>
						);
					},
					botao: () => {
						return (
							<div className={styles["list-btn-area"]}>
								<FaPencil
									id={editIconId}
									cursor={"pointer"}
									onClick={() =>
										handleEdit(
											categoryId,
											editIconId,
											deleteIconId,
											confirmEditIconId,
											cancelEditIconId
										)
									}
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
									id={confirmEditIconId}
									cursor={"pointer"}
									display={"none"}
									onClick={() =>
										handleConfirmEdit(
											category.id,
											categoryId,
											confirmEditIconId,
											cancelEditIconId,
											editIconId,
											deleteIconId
										)
									}
								/>
								<FaX
									id={cancelEditIconId}
									cursor={"pointer"}
									display={"none"}
									onClick={() =>
										handleCancelEdit(
											categoryId,
											confirmEditIconId,
											cancelEditIconId,
											editIconId,
											deleteIconId
										)
									}
								/>
								<FaCheck
									id={confirmDeleteIconId}
									cursor={"pointer"}
									display={"none"}
									onClick={() =>
										handleConfirmDelete(
											category.id,
											categoryId,
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
		} catch (error) {
			console.error("Erro:", error);
		}

		setCategorias(lista);
	}

	function handleNewCategory() {
		let valor = document.getElementById("ipt_new_category").value;

		if (valor.trim() && valor.length > 3) {
			categoriasModel.inserirCategoria(valor);
		} else {
			alert("Categoria inválida. Deve ter pelo menos 4 caracteres");
		}

		getCategoryList();
	}

	async function getCategoriasNames(){	
		try{
			let response = await categoriasModel.listarCategorias();
			if(response !== undefined || response !== ''){
				categoriasModel.exportarCategoria(response)
			}else{
				alert("Não há categorias registradas")
			}
		} catch (error) {
			console.error("Erro:", error);
		}
	}

	return (
		<div className={styles["CrudCategorias"]}>
			<Sidebar />
			<Navbar />
			<div className={styles["content"]}>
				<div className={styles["container"]}>
					<div className={styles["page-header"]}>
						<h1 className={styles["title"]}>Listagem de Categorias</h1>
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
							</select>
						</div>
						<ExportButton
						onClick={() => {
							getCategoriasNames()
						}}
						></ExportButton>
					</div>
					<div className={styles["table-area"]}>
						<Table headers={headersCategorias} values={categorias} limit={8} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrudCategorias;
