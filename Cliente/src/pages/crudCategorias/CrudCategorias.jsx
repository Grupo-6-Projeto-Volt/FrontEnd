import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CrudCategorias.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import Table from "../../components/list/Table";
import { FaPencil, FaTrash } from "react-icons/fa6";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import { useEffect, useState } from "react";
import { categoriasModel } from "../../model/categoriasModel";

function CrudCategorias() {
	let [categorias, setCategorias] = useState([]);
	let headersTags = ["Id", "Nome da Categoria", ""];

	useEffect(() => {
		getCategoryList();
	}, []);

	async function getCategoryList() {
		try {
			let response = await categoriasModel.listarCategorias();
			let lista = [
				{
					id: "",
					nome: () => {
						return (
							<input
								id="ipt_new_category"
								type="text"
								className={styles["ipt-category"]}
								placeholder="Ex: Novo"
							/>
						);
					},
					botao: () => {
						return (
							<div className={styles["list-btn-area"]}>
								<DefaultButton text={"Adicionar Categoria"} />
							</div>
						);
					},
				},
			];

			let count = 0;
			response.forEach((category) => {
				lista.push({
					id: ++count,
					nome: category.nome,
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
			setCategorias(lista);
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
					</div>
					<div className={styles["table-area"]}>
						<Table headers={headersTags} values={categorias} limit={8} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrudCategorias;
