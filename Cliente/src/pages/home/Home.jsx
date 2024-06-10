import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../../utils/global";

const Home = () => {
	const navigate = useNavigate();
	let [isLogado, setLogado] = useState();

	useEffect(() => {
		setLogado(validateAuth());
	}, []);

	return (
		<div className={styles["Home"]}>
			{!isLogado && (
				<div className={styles["box-container"]}>
					<button
						className={styles["btn"]}
						onClick={() => {
							navigate("/login");
						}}
					>
						Logar
					</button>
				</div>
			)}
			{isLogado && (
				<div className={styles["box-container"]}>
					<h1>{sessionStorage.EMAIL}</h1>
					<button
						className={styles["btn"]}
						onClick={() => {
							sessionStorage.clear();
							setLogado(false);
						}}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default Home;
