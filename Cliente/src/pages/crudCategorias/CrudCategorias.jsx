import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CrudCategorias.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import Table from "../../components/list/Table";
import { FaPencil, FaTrash } from "react-icons/fa6";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import { useState } from "react";

function CrudCategorias() {
	let [categorias, setCategorias] = useState([]);
	let headersTags = ["Id", "Nome da Categoria", ""];

	let data = [
		{
			id: "",
			nome: () => {
				return (
					<input
						type="text"
						className={styles["ipt-categoria"]}
						placeholder="Ex: Celular"
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
		{
			id: "1",
			nome: "Celular",
			botao: () => {
				return (
					<div className={styles["list-btn-area"]}>
						<FaPencil cursor={"pointer"} />
						<FaTrash cursor={"pointer"} />
					</div>
				);
			},
		},
		{
			id: "2",
			nome: "Tablet",
			botao: () => {
				return (
					<div className={styles["list-btn-area"]}>
						<FaPencil cursor={"pointer"} />
						<FaTrash cursor={"pointer"} />
					</div>
				);
			},
		},
		{
			id: "3",
			nome: "Computador",
			botao: () => {
				return (
					<div className={styles["list-btn-area"]}>
						<FaPencil cursor={"pointer"} />
						<FaTrash cursor={"pointer"} />
					</div>
				);
			},
		},
		{
			id: "4",
			nome: "Acessórios",
			botao: () => {
				return (
					<div className={styles["list-btn-area"]}>
						<FaPencil cursor={"pointer"} />
						<FaTrash cursor={"pointer"} />
					</div>
				);
			},
		},
		{
			id: "5",
			nome: "Outros",
			botao: () => {
				return (
					<div className={styles["list-btn-area"]}>
						<FaPencil cursor={"pointer"} />
						<FaTrash cursor={"pointer"} />
					</div>
				);
			},
		},
	];

	// async function getCategoryList() {
	// 	try {
	//         let response = await fetch("http://localhost:3000/categorias");
	//         let data = await response.json();
	//         setCategorias(data);
	//     } catch (error) {
	//         console.error(error);
	//     }
	// }

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
						<Table headers={headersTags} values={data} limit={8} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrudCategorias;
