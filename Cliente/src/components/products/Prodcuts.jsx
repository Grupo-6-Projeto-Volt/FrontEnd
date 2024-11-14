import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { listarProdutosMaisAcessados } from "../../model/DashDadosgraficos";

export function ProductsData() {
	const [dados, setDados] = useState([]);

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
		<table className={styles["Products"]}>
			{dados.map((product, index) => (
				<tr key={index} className={styles["product-item"]}>
					<td className={styles["image-area"]}>
						<img
							src={product.url}
							alt={product.nome}
							className={styles["product-image"]}
						/>
					</td>
					<td className={styles["title-area"]}>
						<span className={styles["product-name"]}>{product.nome}</span>
					</td>
					<td className={styles["quantity-area"]}>
						<div className={styles["product-quantity-div"]}>
							<span className={styles["product-quantity-title"]}>
								Quantidade
							</span>
							<span className={styles["product-quantity-value"]}>
								{product.quantidade}
							</span>
						</div>
					</td>
					<td className={styles["id-area"]}>
						<span className={styles["product-id"]}>#{index + 1}</span>
					</td>
				</tr>
			))}
		</table>
	);
}
