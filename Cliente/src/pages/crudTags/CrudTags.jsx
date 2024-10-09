import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CrudTags.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import Table from "../../components/list/Table";
import { FaCheck, FaPencil, FaTrash, FaX } from "react-icons/fa6";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import { useEffect, useState } from "react";
import { tagsModel } from "../../model/tagsModel";
import ExportButton from "../../components/exportButton/ExportButton"

function CrudTags() {
	let [tags, setTags] = useState([]);
	let headersTags = ["Id", "Nome da Tag", ""];

	function handleEdit(
		tagId,
		editIconId,
		deleteIconId,
		confirmEditIconId,
		cancelEditIconId
	) {
		let iptTag = document.getElementById(tagId);

		let iptDeleteIcon = document.getElementById(deleteIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptConfirmEditIcon = document.getElementById(confirmEditIconId);
		let iptCancelEditIcon = document.getElementById(cancelEditIconId);

		iptTag.disabled = false;
		iptTag.className = styles["ipt-tag"];
		iptTag.focus();

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
		tagId,
		confirmEditIconId,
		cancelEditIconId,
		editIconId,
		deleteIconId
	) {
		let iptTag = document.getElementById(tagId);
		let iptConfirmEditIcon = document.getElementById(confirmEditIconId);
		let iptCancelEditIcon = document.getElementById(cancelEditIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptDeleteIcon = document.getElementById(deleteIconId);

		iptTag.disabled = true;
		iptTag.placeholder = iptTag.value;

		await tagsModel
			.atualizarTag(id, iptTag.value)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log("Houve um erro ao alterar a tag: " + error);
			});

		iptTag.value = "";
		iptTag.className = styles["ipt-editable-tag"];

		iptConfirmEditIcon.style.display = "none";
		iptCancelEditIcon.style.display = "none";
		iptEditIcon.style.display = "inline-block";
		iptDeleteIcon.style.display = "inline-block";

		getTagsList();
	}

	function handleCancelEdit(
		tagId,
		confirmEditIconId,
		cancelEditIconId,
		editIconId,
		deleteIconId
	) {
		let iptTag = document.getElementById(tagId);
		let iptConfirmEditIcon = document.getElementById(confirmEditIconId);
		let iptCancelEditIcon = document.getElementById(cancelEditIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptDeleteIcon = document.getElementById(deleteIconId);

		iptTag.disabled = true;
		iptTag.value = "";
		iptTag.className = styles["ipt-editable-tag"];

		iptConfirmEditIcon.style.display = "none";
		iptCancelEditIcon.style.display = "none";
		iptEditIcon.style.display = "inline-block";
		iptDeleteIcon.style.display = "inline-block";
	}

	async function handleConfirmDelete(
		id,
		tagId,
		confirmDeleteIconId,
		cancelDeleteIconId,
		editIconId,
		deleteIconId
	) {
		let iptTag = document.getElementById(tagId);
		let iptConfirmDeleteIcon = document.getElementById(confirmDeleteIconId);
		let iptCancelDeleteIcon = document.getElementById(cancelDeleteIconId);
		let iptEditIcon = document.getElementById(editIconId);
		let iptDeleteIcon = document.getElementById(deleteIconId);

		iptTag.className = styles["ipt-editable-tag"];

		await tagsModel
			.deletarTag(id)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log("Houve um erro ao deletar a tag:", error);
			});

		iptConfirmDeleteIcon.style.display = "none";
		iptCancelDeleteIcon.style.display = "none";
		iptEditIcon.style.display = "inline-block";
		iptDeleteIcon.style.display = "inline-block";

		getTagsList();
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
		getTagsList();
	}, []);

	async function getTagsList() {
		let firstRow = {
			id: "",
			nome: () => {
				return (
					<input
						id="ipt_new_tag"
						type="text"
						className={styles["ipt-tag"]}
						placeholder="Ex: Multi-Colorido"
					/>
				);
			},
			botao: () => {
				return (
					<div className={styles["list-btn-area"]}>
						<DefaultButton
							text={"Adicionar Tag"}
							onClick={() => {
								handleNewTag();
								getTagsList();
							}}
						/>
					</div>
				);
			},
		};

		let lista = [firstRow];

		try {
			let response = await tagsModel.listarTags();
			response.arr.forEach((tag) => {
				let tagId = `ipt_tag_${tag.id}`;

				let editIconId = `ipt_edit_icon_${tag.id}`;
				let deleteIconId = `ipt_delete_icon_${tag.id}`;

				let confirmDeleteIconId = `ipt_confirm_delete_icon_${tag.id}`;
				let cancelDeleteIconId = `ipt_cancel_delete_icon_${tag.id}`;

				let confirmEditIconId = `ipt_confirm_edit_icon_${tag.id}`;
				let cancelEditIconId = `ipt_cancel_edit_icon_${tag.id}`;

				lista.push({
					id: tag.id,
					nome: () => {
						return (
							<input
								id={tagId}
								placeholder={tag.tag}
								disabled={true}
								type="text"
								className={styles["ipt-editable-tag"]}
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
											tagId,
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
											tag.id,
											tagId,
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
											tagId,
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
											tag.id,
											tagId,
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

		setTags(lista);
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

	async function getTagsNames(){
		try{
			let response = await tagsModel.listarTags();
			if(response !== undefined || response !== ''){
				tagsModel.exportarTag(response.arr)
			}else{
				alert("Não há tags registradas")
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
						getTagsNames()
						}}
						></ExportButton>
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
