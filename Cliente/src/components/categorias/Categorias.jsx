import React from "react";
import styles from "./Categorias.module.css";
import notebookCategoria from "../../utils/assets/img/notebook-categoria.png";
import celularesCategoria from "../../utils/assets/img/celulares-categoria.png";
import acessoriosCategoria from "../../utils/assets/img/acessorios-categoria.png";
import { useNavigate } from "react-router-dom";

const Categorias = () => {
	let navigate = useNavigate();

	return (
		<div className={styles["container-categorias"]}>
			<div className={styles["categoria"]} 					
				onClick={() => {
						navigate("/pagina-produtos/Celulares/Celular");
					}}>
				<img
					src={celularesCategoria}
					alt="celulares"
					className={styles["img-categorias"]}
				/>
				<h4 className={styles["titulo-categorias"]}>Celulares</h4>
			</div>
			<div className={styles["categoria"]} 					
				onClick={() => {
						navigate("/pagina-produtos/Notebooks/Computador");
					}}>
				<img
					src={notebookCategoria}
					alt="notebookCategoria"
					className={styles["img-categorias"]}
				/>
				<h4 className={styles["titulo-categorias"]}>Notebooks</h4>
			</div>
			<div className={styles["categoria"]} 					
				onClick={() => {
						navigate("/pagina-produtos/Acessórios/Acessório");
					}}>
				<img
					src={acessoriosCategoria}
					alt="acessorios"
					className={styles["img-categorias"]}
				/>
				<h4 className={styles["titulo-categorias"]}>Acessórios</h4>
			</div>
		</div>
	);
};

export default Categorias;
