import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../../utils/global";
import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import { ProdutosData } from "../../components/produtoslist/ProdutosList.jsx";
import Footer from "../../components/footer/Footer.jsx";
import NossosServicos from "../../components/nossosServicos/NossosServicos.jsx";
import SolicitarConcerto from "../../components/solicitarConcerto/SolicitarConcerto.jsx";
import Avaliacoes from "../../components/avaliacoes/Avaliacoes.jsx";

const Home = () => {
	return (
		<>
			<NavBarPadrao />
			<ProdutosData
			secao = 'Ofertas' />
			<NossosServicos />
			<SolicitarConcerto />
			<Avaliacoes />
			<Footer />
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