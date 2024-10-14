import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CrudCategorias.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import { useEffect, useState } from "react";
import { categoriasModel } from "../../model/categoriasModel";
import ExportButton from "../../components/exportButton/ExportButton";
import { toast } from "react-toastify";
import CrudTable from "../../components/crudlist/CrudTable";

function CrudCategorias() {
	let [categorias, setCategorias] = useState([]);
	let headersCategorias = ["Id", "Nome da Categoria", ""];

	function handleEdit(id, value) {
		let response = async () => {
			await categoriasModel
				.atualizarCategoria(id, value)
				.then((response) => {
					toast.success("Categoria alterada com sucesso!");
				})
				.catch((error) => {
					toast.error("Erro ao alterar a categoria: " + error);
				});
			getCategoryList();
		};
		response();
	}

	function handleDelete(id) {
		let response = async () => {
			await categoriasModel
				.deletarCategoria(id)
				.then((response) => {
					toast.success("Categoria deletada com sucesso!");
				})
				.catch((error) => {
					toast.error("Erro ao deletar categoria: " + error);
				});
			getCategoryList();
		};
		response();
	}

	useEffect(() => {
		getCategoryList();
	}, []);

	async function getCategoryList() {
		let lista = [];

		try {
			let response = await categoriasModel.listarCategorias();

			response.forEach((category) => {
				lista.push({
					id: category.id,
					nome: category.nome,
					onUpdate: (id, value) => handleEdit(id, value),
					onDelete: (id) => handleDelete(id),
				});
			});
		} catch (error) {
			console.error("Erro:", error);
		}

		setCategorias(lista);
	}

	function handleNewCategory(valor) {
		if (valor.trim() && valor.length > 3) {
			let response = async () => {
				await categoriasModel.inserirCategoria(valor);
				toast.success("Categoria adicionada com sucesso!");
				getCategoryList();
			};
			response();
		} else {
			toast.error("Categoria inválida. Deve ter pelo menos 4 caracteres");
		}
	}

	async function getCategoriasNames() {
		try {
			let response = await categoriasModel.listarCategorias();
			if (response !== undefined || response !== "") {
				categoriasModel.exportarCategoria(response);
			} else {
				toast.error("Não há categorias registradas");
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
								getCategoriasNames();
							}}
						></ExportButton>
					</div>
					<div className={styles["table-area"]}>
						<CrudTable
							headers={headersCategorias}
							values={categorias}
							limit={8}
							insertButtonText={"Adicionar Categoria"}
							onInsert={(e) => handleNewCategory(e)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrudCategorias;
