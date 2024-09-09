import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { listarProdutosMaisAcessados } from "../../model/DashDadosgraficos";

export function ProductsData() {
	let [dados, setDados] = useState([]);

	async function obterProdutosAcessadas() {
		try {
			var resposta = await listarProdutosMaisAcessados();
			setDados(resposta);
		} catch (e) {
			console.log(e);
			return <h1>Erro</h1>;
		}
	}

	useEffect(() => {
		obterProdutosAcessadas();
	}, []);

	return (
		<ul>
			{dados.map((product, index) => (
				<li key={index} className={styles["productItem"]}>
					<img
						src={product.url}
						alt={product.nome}
						className={styles["productImage"]}
					/>
					<div className={styles["productDetails"]}>
						<span className={styles["productName"]}>{product.nome}</span>
						<span className={styles["productQuantity"]}>
							Quantidade: {product.quantidade}
						</span>
						<span className={styles["productId"]}>#{product.id}</span>
					</div>
				</li>
			))}
		</ul>
	);
}
