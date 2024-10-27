import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CrudCategorias.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import { useEffect, useState } from "react";
import { categoriasModel } from "../../model/categoriasModel";
import ExportButton from "../../components/exportButton/ExportButton";
import { toast } from "react-toastify";
import CrudTable from "../../components/crudlist/CrudTable";
import { validateAuth } from "../../utils/global";
import { useNavigate } from "react-router-dom";

function CrudCategorias() {
	const navigate = useNavigate();
	const [categorias, setCategorias] = useState([]);
	const [filter, setFilter] = useState(0);
	const [search, setSearch] = useState("");
	const headersCategorias = ["Id", "Nome da Categoria", ""];

	function validateAuthentication() {
		if (!validateAuth() || sessionStorage.CATEGORIA !== "1") {
			navigate("/login");
		}
	}

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
			filterCategories();
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

	function filterCategories() {
		switch (filter) {
			case 0:
				getCategoryList();
				break;
			case 1:
				setCategorias((categorias) => [
					...categorias.sort((a, b) => a.nome.localeCompare(b.nome)),
				]);
				break;
			case 2:
				setCategorias((categorias) => [
					...categorias.sort((a, b) => b.nome.localeCompare(a.nome)),
				]);
				break;
			default:
				getCategoryList();
		}
	}

	useEffect(() => {
		validateAuthentication();
		getCategoryList();
	}, []);

	useEffect(() => {
		filterCategories();
	}, [filter, setFilter]);

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
							onChange={(e) => setSearch(e)}
							onClick={async () => {
								await getCategoryList();

								if (
									categorias.filter((a) =>
										a.nome.toLowerCase().includes(search.toLowerCase())
									).length !== 0
								) {
									setCategorias((categorias) => [
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
							limit={7}
							insertButtonText={"Adicionar Categoria"}
							onInsert={(e) => handleNewCategory(e)}
							placeholder={"Notebook"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrudCategorias;
