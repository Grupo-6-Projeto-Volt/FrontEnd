import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CrudTags.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import Table from "../../components/list/Table";
import { FaPencil, FaTrash } from "react-icons/fa6";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import { useEffect, useState } from "react";
import { tagsModel } from "../../model/tagsModel";

function CrudTags() {
	let [tags, setTags] = useState([]);
	let headersTags = ["Id", "Nome da Tag", ""];

	useEffect(() => {
		getTagsList();
	}, []);

	async function getTagsList() {
		try {
			let response = await tagsModel.listarTags();
			let lista = [
				{
					id: "",
					nome: () => {
						return (
							<input
								id="ipt_new_tag"
								type="text"
								className={styles["ipt-tag"]}
								placeholder="Ex: Celular"
							/>
						);
					},
					botao: () => {
						return (
							<div className={styles["list-btn-area"]}>
								<DefaultButton
									text={"Adicionar Categoria"}
									onClick={handleNewTag}
								/>
							</div>
						);
					},
				},
			];

			let count = 0;
			response.arr.forEach((tag) => {
				lista.push({
					id: ++count,
					nome: tag.tag,
					botao: () => {
						return (
							<div className={styles["list-btn-area"]}>
								<FaPencil cursor={"pointer"} />
								<FaTrash cursor={"pointer"} />
							</div>
						);
					},
				});
			});
			setTags(lista);
		} catch (error) {
			console.error("Erro:", error);
		}
	}

	function handleNewTag() {
		let valor = document.getElementById("ipt_new_tag").value;

		if (valor.trim() && valor.length > 3) {
			tagsModel.inserirTag(valor);
		} else {
			alert("Tag inválida. Deve ter pelo menos 4 caracteres");
		}

		getTagsList();
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
							<select
								onChange={(e) => {
									console.log("teste");
								}}
							>
								<option value="0">Nome Asc</option>
								<option value="1">Nome Desc</option>
							</select>
						</div>
					</div>
					<div className={styles["table-area"]}>
						<Table headers={headersTags} values={tags} limit={8} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrudTags;
