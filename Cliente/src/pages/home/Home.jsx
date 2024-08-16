import React from "react";
import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import { ProdutosData } from "../../components/produtoslist/ProdutosList.jsx";
const Home = () => {
	return (
		<>
			<NavBarPadrao />
			<ProdutosData
			secao = 'Ofertas' />
		</>
	)
}
// const Home = () => {
// 	const navigate = useNavigate();
// 	let [isLogado, setLogado] = useState();

// 	useEffect(() => {
// 		setLogado(validateAuth());
// 	}, []);

// 	return (
// 		<div className={styles["Home"]}>
// 			{!isLogado && (
// 				<div className={styles["box-container"]}>
// 					<button
// 						className={styles["btn"]}
// 						onClick={() => {
// 							navigate("/login");
// 						}}
// 					>
// 						Logar
// 					</button>
// 				</div>
// 			)}
// 			{isLogado && (
// 				<div className={styles["box-container"]}>
// 					<h1>{sessionStorage.EMAIL}</h1>
// 					<button
// 						className={styles["btn"]}
// 						onClick={() => {
// 							sessionStorage.clear();
// 							setLogado(false);
// 						}}
// 					>
// 						Logout
// 					</button>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

export default Home;