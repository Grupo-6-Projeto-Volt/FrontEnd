import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CrudTags.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import { useEffect, useState } from "react";
import { tagsModel } from "../../model/tagsModel";
import ExportButton from "../../components/exportButton/ExportButton";
import CrudTable from "../../components/crudlist/CrudTable";
import { toast } from "react-toastify";

function CrudTags() {
	const [tags, setTags] = useState([]);
	const [filter, setFilter] = useState(0);
	const headersTags = ["Id", "Nome da Tag", ""];

	function handleEdit(id, value) {
		let response = async () => {
			await tagsModel
				.atualizarTag(id, value)
				.then((response) => {
					toast.success("Tag alterada com sucesso!");
				})
				.catch((error) => {
					toast.error("Erro ao alterar a tag: " + error);
				});
			filterTags();
		};
		response();
	}

	function handleDelete(id) {
		let response = async () => {
			await tagsModel
				.deletarTag(id)
				.then((response) => {
					toast.success("Tag deletada com sucesso!");
				})
				.catch((error) => {
					toast.error("Erro ao deletar tag: " + error);
				});
			getTagsList();
		};
		response();
	}

	function filterTags() {
		let list;

		switch (filter) {
			case 0:
				getTagsList();
				break;
			case 1:
				setTags((tags) => [
					...tags.sort((a, b) => a.nome.localeCompare(b.nome)),
				]);
				break;
			case 2:
				setTags((tags) => [
					...tags.sort((a, b) => b.nome.localeCompare(a.nome)),
				]);
				break;
			default:
				getTagsList();
		}
	}

	useEffect(() => {
		getTagsList();
	}, []);

	useEffect(() => {
		filterTags();
	}, [filter, setFilter]);

	async function getTagsList() {
		let lista = [];
		try {
			let response = await tagsModel.listarTags();
			response.arr.forEach((tag) => {
				lista.push({
					id: tag.id,
					nome: tag.tag,
					onUpdate: (id, value) => handleEdit(id, value),
					onDelete: (id) => handleDelete(id),
				});
			});
		} catch (error) {
			console.error("Erro:", error);
		}

		setTags(lista);
	}

	function handleNewTag(valor) {
		if (valor.trim() && valor.length > 3) {
			let response = async () => {
				await tagsModel.inserirTag(valor);
				toast.success("Tag adicionada com sucesso!");
				getTagsList();
			};
			response();
		} else {
			toast.error("Tag inválida. Deve ter pelo menos 4 caracteres");
		}
	}

	async function getTagsNames() {
		try {
			let response = await tagsModel.listarTags();
			if (response !== undefined || response !== "") {
				tagsModel.exportarTag(response.arr);
			} else {
				alert("Não há tags registradas");
			}
		} catch (error) {
			console.error("Erro:", error);
		}
	}

	return (
		<div className={styles["CrudTags"]}>
			<Sidebar />
			<Navbar />
			<div className={styles["content"]}>
				<div className={styles["container"]}>
					<div className={styles["page-header"]}>
						<h1 className={styles["title"]}>Listagem de Tags</h1>
						<Searchbar
							width={"20rem"}
							onChange={() => {
								console.log("teste");
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
								getTagsNames();
							}}
						></ExportButton>
					</div>
					<div className={styles["table-area"]}>
						<CrudTable
							headers={headersTags}
							values={tags}
							limit={7}
							insertButtonText={"Adicionar Tag"}
							onInsert={(e) => handleNewTag(e)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrudTags;
