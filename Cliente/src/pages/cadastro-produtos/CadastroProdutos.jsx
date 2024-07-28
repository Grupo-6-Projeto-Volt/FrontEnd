import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CadastroProdutos";

function CadastroProdutos() {
	return (
		<div className={styles["CadastroProdutos"]}>
			<Navbar />
			<Sidebar />
		</div>
	);
}

export default CadastroProdutos;
