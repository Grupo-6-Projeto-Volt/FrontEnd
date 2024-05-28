import Table from "../../../components/list/Table";
import Navbar from "../../../components/navbar/dashboard/Navbar";
import Searchbar from "../../../components/searchbar/Searchbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./Chamados.module.css";

function Chamados() {
	let headers_chamados = [
		"Id",
		"Nome Completo",
		"Número Telefone",
		"Email",
		"Data Compra",
		"Compra Realizada",
	];

	let values_chamados = [
		{
			id: "#29393",
			nome: "João Silva",
			telefone: "(11) 98765-4321",
			email: "joaosilva@email.com",
			dataCompra: "13/05/2024",
			compraRealizada: () => (
				<div className={styles["table-btn-area"]}>
					<button className={styles["table-btn-red"]}>Não</button>
					<button className={styles["table-btn-green"]}>Sim</button>
				</div>
			),
		},
		{
			id: "#02934",
			nome: "Maria Santos",
			telefone: "(21) 12345-6789",
			email: "mariasantos@email.com",
			dataCompra: "13/05/2024",
			compraRealizada: () => (
				<div className={styles["table-btn-area"]}>
					<button className={styles["table-btn-red"]}>Não</button>
					<button className={styles["table-btn-green"]}>Sim</button>
				</div>
			),
		},
		{
			id: "#92484",
			nome: "Pedro Oliveira",
			telefone: "(31) 45678-9012",
			email: "pedrooliveira@email.com",
			dataCompra: "13/05/2024",
			compraRealizada: () => (
				<div className={styles["table-btn-area"]}>
					<button className={styles["table-btn-red"]}>Não</button>
					<button className={styles["table-btn-green"]}>Sim</button>
				</div>
			),
		},
		{
			id: "#92484",
			nome: "Pedro Oliveira",
			telefone: "(31) 45678-9012",
			email: "pedrooliveira@email.com",
			dataCompra: "13/05/2024",
			compraRealizada: () => (
				<div className={styles["table-btn-area"]}>
					<button className={styles["table-btn-red"]}>Não</button>
					<button className={styles["table-btn-green"]}>Sim</button>
				</div>
			),
		},
	];

	let headers_clientes = ["Nome Completo", "Número Telefone", "Data", "Email"];

	let values_clientes = [
		{
			nome: "João Silva",
			telefone: "(11) 98765-4321",
			dataCompra: "13/05/2024",
			email: "joaosilva@email.com",
		},
		{
			nome: "Maria Santos",
			telefone: "(21) 12345-6789",
			dataCompra: "13/05/2024",
			email: "mariasantos@email.com",
		},
		{
			nome: "Pedro Oliveira",
			telefone: "(31) 45678-9012",
			dataCompra: "13/05/2024",
			email: "pedrooliveira@email.com",
		},
		{
			nome: "Ana Pereira",
			telefone: "(41) 98765-1234",
			dataCompra: "13/05/2024",
			email: "anapereira@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
		{
			nome: "Felipe Santos",
			telefone: "(11) 97525-4321",
			dataCompra: "13/05/2024",
			email: "felipe@email.com",
		},
	];

	return (
		<div className={styles["Chamados"]}>
			<Navbar />
			<Sidebar />
			<div className={styles["content"]}>
				<div className={styles["container"]}>
					<section>
						<div className={styles["container"]}>
							<div className={styles["section-header"]}>
								<div className={styles["section-title"]}>
									<h2>Chamados de Compra</h2>
									<h4>Solicitaram produto pelo whatsapp</h4>
								</div>
								<div className={styles["input-group"]}>
									<Searchbar />
									<div className={styles["filter-group"]}>
										<span>Filtrar por: </span>
										<select>
											<option value="0">Sim</option>
											<option value="1">Não</option>
											<option value="2">Talvez</option>
										</select>
									</div>
								</div>
							</div>
							<div className={styles["purchase-request-list"]}>
								<Table
									headers={headers_chamados}
									values={values_chamados}
									limit={4}
								/>
							</div>
						</div>
					</section>
					<section>
						<div className={styles["container"]}>
							<div className={styles["section-header"]}>
								<div className={styles["section-title"]}>
									<h2>Potenciais Clientes</h2>
									<h4>Cadastrados</h4>
								</div>
								<div
									className={styles["input-group"]}
									style={{ justifyContent: "right" }}
								>
									<Searchbar />
								</div>
							</div>
							<div className={styles["purchase-request-list"]}>
								<Table
									headers={headers_clientes}
									values={values_clientes}
									limit={4}
								/>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default Chamados;
