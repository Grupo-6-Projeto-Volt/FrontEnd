import React from "react";
import styles from "./CategoriaProdutos.module.css";

import { useNavigate } from "react-router-dom";

const CategoriaProdutos = ({ tituloPagina, dadosProduto }) => {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		navigate("/");
	};

	return (
		<div className={styles["container"]}>
			<div className={styles["titulo-produtos"]}>
				<h1 className={styles["button-voltar"]} onClick={handleButtonClick}>
					Voltar
				</h1>
				<h1>{tituloPagina}</h1>
				<div className={styles["filtro"]}></div>
			</div>
			<div className={styles["produtos"]}>
				{dadosProduto &&
					dadosProduto.map((produto) => {
						return (
							<div
								className={styles["produto"]}
								onClick={() => navigate("/productpage")}
							>
								<h4>Estado: {produto.estadoGeral}</h4>
								<img
									src={produto.imagensProduto[0].codigoImagem}
									alt={produto.nome}
								/>
								<h4 className={styles["nomeProd"]}>{produto.nome}</h4>
								<h4 className={styles["precoProd"]}>
									R${Number(produto.preco).toFixed(2)}
								</h4>
							</div>
						);
					})}
				{!dadosProduto.length && (
					<div className={styles["no-content-div"]}>
						<h2>Nenhum produto encontrado.</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default CategoriaProdutos;
