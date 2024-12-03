import React from "react";
import styles from "./CategoriaProdutos.module.css";

import { useNavigate } from "react-router-dom";
import { Produto } from "../productcard/ProductCard";

const CategoriaProdutos = ({ tituloPagina, dadosProduto }) => {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		navigate("/");
	};

	return (
		<div className={styles["container"]}>
			<div className={styles["titulo-produtos"]}>
				<h5 className={styles["button-voltar"]} onClick={handleButtonClick}>
					Voltar
				</h5>
				<h2>{tituloPagina}</h2>
				<div className={styles["filtro"]}></div>
			</div>
			<div className={styles["produtos"]}>
				{
					dadosProduto?.length > 0 ? dadosProduto?.map((produto) => {
						return (
							<Produto
								className={styles["item"]}
								id={produto.id}
								nome={produto.nome}
								estado={produto.estadoGeral}
								imgUrl={
									produto.imagensProduto[0]
										? typeof produto.imagensProduto.at(0).codigoImagem !== 'string' ? URL.createObjectURL(
											produto.imagensProduto.at(0).codigoImagem
										) : produto.imagensProduto.at(0).codigoImagem
										: undefined
								}
								preco={produto.preco}
								desconto={produto.desconto}></Produto>
						)
					}) : (<div className={styles["no-content-div"]}>
						<h2>Nenhum produto encontrado.</h2>
					</div>)
				}
			</div>
		</div>
	);
};

export default CategoriaProdutos;
