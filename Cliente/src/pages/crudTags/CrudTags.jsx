import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CrudTags.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import Table from "../../components/list/Table";
import { FaPencil, FaTrash } from "react-icons/fa6";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";

function CrudTags() {
	let headersTags = ["Id", "Nome da Tag", ""];

	let data = [
		{
			id: "",
			nome: () => {
				return (
					<input
						type="text"
						className={styles["ipt-tag"]}
						placeholder="Ex: Lançamento"
					/>
				);
			},
			botao: () => {
				return (
					<div className={styles["list-btn-area"]}>
						<DefaultButton text={"Listagem de Tags"} />
					</div>
				);
			},
		},
		{
			id: "1",
			nome: "Lançamento",
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
			nome: "Novidade",
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
			nome: "Promoção",
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
			nome: "Especial",
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
			nome: "Oferta",
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
			id: "6",
			nome: "Outra Tag",
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
			id: "7",
			nome: "Outra Tag",
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
						<Table headers={headersTags} values={data} limit={8} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrudTags;
