import styles from "./ListagemProdutos.module.css";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Searchbar from "../../components/searchbar/Searchbar";
import Table from "../../components/list/Table";
import Sidebar from "../../components/sidebar/Sidebar";
import { FaPencil, FaTrash } from "react-icons/fa6";

function ListagemProdutos() {
	let headersProdutos = [
		"Imagem",
		"Id",
		"Nome do Produto",
		"Categoria",
		"Estado",
		"Preço",
		"Ações",
	];

	let valoresProdutos = [
		{
			image: () => {
				return (
					<div
						className=""
						style={{ width: "5rem", height: "5rem", backgroundColor: "red" }}
					></div>
				);
			},
			id: "#456134",
			nomeProduto: "Iphone 13 Pro Max",
			categoria: "Celular",
			estado: "Outlet",
			preço: "R$5000,00",
			acoes: () => {
				return (
					<>
						<FaPencil />
						<FaTrash />
					</>
				);
			},
		},
		{
			image: () => {
				return (
					<div
						className=""
						style={{ width: "5rem", height: "5rem", backgroundColor: "red" }}
					></div>
				);
			},
			id: "#456134",
			nomeProduto: "Iphone 13 Pro Max",
			categoria: "Celular",
			estado: "Outlet",
			preço: "R$5000,00",
			acoes: () => {
				return (
					<>
						<FaPencil />
						<FaTrash />
					</>
				);
			},
		},
		{
			image: () => {
				return (
					<div
						className=""
						style={{ width: "5rem", height: "5rem", backgroundColor: "red" }}
					></div>
				);
			},
			id: "#456134",
			nomeProduto: "Iphone 13 Pro Max",
			categoria: "Celular",
			estado: "Outlet",
			preço: "R$5000,00",
			acoes: () => {
				return (
					<>
						<FaPencil />
						<FaTrash />
					</>
				);
			},
		},
		{
			image: () => {
				return (
					<div
						className=""
						style={{ width: "5rem", height: "5rem", backgroundColor: "red" }}
					></div>
				);
			},
			id: "#456134",
			nomeProduto: "Iphone 13 Pro Max",
			categoria: "Celular",
			estado: "Outlet",
			preço: "R$5000,00",
			acoes: () => {
				return (
					<>
						<FaPencil />
						<FaTrash />
					</>
				);
			},
		},
		{
			image: () => {
				return (
					<div
						className=""
						style={{ width: "5rem", height: "5rem", backgroundColor: "red" }}
					></div>
				);
			},
			id: "#456134",
			nomeProduto: "Iphone 13 Pro Max",
			categoria: "Celular",
			estado: "Outlet",
			preço: "R$5000,00",
			acoes: () => {
				return (
					<>
						<FaPencil />
						<FaTrash />
					</>
				);
			},
		},
		{
			image: () => {
				return (
					<div
						className=""
						style={{ width: "5rem", height: "5rem", backgroundColor: "red" }}
					></div>
				);
			},
			id: "#456134",
			nomeProduto: "Iphone 13 Pro Max",
			categoria: "Celular",
			estado: "Outlet",
			preço: "R$5000,00",
			acoes: () => {
				return (
					<>
						<FaPencil />
						<FaTrash />
					</>
				);
			},
		},
		{
			image: () => {
				return (
					<div
						className=""
						style={{ width: "5rem", height: "5rem", backgroundColor: "red" }}
					></div>
				);
			},
			id: "#456134",
			nomeProduto: "Iphone 13 Pro Max",
			categoria: "Celular",
			estado: "Outlet",
			preço: "R$5000,00",
			acoes: () => {
				return (
					<>
						<FaPencil />
						<FaTrash />
					</>
				);
			},
		},
		{
			image: () => {
				return (
					<div
						className=""
						style={{ width: "5rem", height: "5rem", backgroundColor: "red" }}
					></div>
				);
			},
			id: "#456134",
			nomeProduto: "Iphone 13 Pro Max",
			categoria: "Celular",
			estado: "Outlet",
			preço: "R$5000,00",
			acoes: () => {
				return (
					<>
						<FaPencil />
						<FaTrash />
					</>
				);
			},
		},
	];

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
					</div>
					<div className={styles["table-area"]}>
						<Table
							headers={headersProdutos}
							values={valoresProdutos}
							limit={7}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListagemProdutos;
