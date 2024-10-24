import styles from "./NavBar.module.css";
import logo from "../../utils/assets/img/logo-ichiban.png";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../../utils/global";

export const NavBarPadrao = () => {
	let navigate = useNavigate();
	const [busca, setBusca] = useState("");
	const handleInputChange = (event) => {
		setBusca(event.target.value);
	};
	const handleClickSearch = () => {
		navigate(`/pagina-produtos/Busca/${busca}`);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleClickSearch();
		}
	};

	function validateAuthentication() {
		if (!validateAuth()) {
			return (
				<FaUserCircle
					className={styles["usuario"]}
					onClick={() => {
						navigate("/login");
					}}
				/>
			);
		} else {
			if (sessionStorage.getItem('CATEGORIA') === '0') {
				return <a href="/dashboard">
					<h2 className={styles['helloUser']}>Olá, {sessionStorage.getItem('NOME')}
					</h2></a>;
			} else {
				return <h2 className={styles['helloUser']}>Olá, {sessionStorage.getItem('NOME')}
				</h2>
			}
		}
	}

	return (
		<nav className={styles["navbar"]}>
			<div className={styles["container-navbar"]}>
				<img
					src={logo}
					alt="logo ichiban"
					className={styles["img-logo"]}
					onClick={() => {
						navigate("/");
					}}
				/>
				<div className={styles["containerPesquisaUser"]}>
					<div className={styles["pesquisa"]}>
						<input
							type="text"
							id="busca-produto"
							value={busca}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							placeholder="Pesquisar..."
						/>
						<FaSearch
							className={styles["search"]}
							onClick={handleClickSearch}
						/>
					</div>
					<h3 className={styles['pipe']}>|</h3>
					<div className={styles["usuarioDiv"]}>
						{validateAuthentication()}
						<FaRegHeart
							className={styles["favoritos"]}
							onClick={() => {
								navigate("/favoritos");
							}}
						/>
					</div>
				</div>
			</div>
			<div className={styles["navBarBaixo"]}>
				<input className={styles["menu-hamburguer"]} id="menu-hamburguer" type="checkbox" />
				<label className={styles['label-menu']} for="menu-hamburguer">
					<div className={styles['menu']}>
						<span className={styles['hamburguer']}></span>
					</div>
				</label>
				<ul className={styles['menu-hamburguer-elements']}>
					<li>Ofertas</li>
					<div className={styles["separator"]}></div>
					<li onClick={() => navigate("/pagina-produtos/Celulares/Celular")}>
						Celulares
					</li>
					<div className={styles["separator"]}></div>
					<li onClick={() => navigate("/pagina-produtos/Notebooks/Computador")}>
						Notebooks
					</li>
					<div className={styles["separator"]}></div>
					<li onClick={() => navigate("/pagina-produtos/Acessórios/Acessório")}>
						Acessórios
					</li>
				</ul>
				<div className={styles["pesquisa-responsive"]}>
					<input
						type="text"
						id="busca-produto"
						value={busca}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder="Pesquisar..."
					/>
					<FaSearch
						className={styles["search-responsive"]}
						onClick={handleClickSearch}
					/>
				</div>
			</div>
		</nav>
	);
};
