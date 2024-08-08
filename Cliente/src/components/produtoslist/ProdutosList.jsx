import styles from "./ProdutosList.module.css"
import { produtos } from "../../model/ProdutosListModel"
import { Produto } from "../productcard/ProductCard";
import React, { useEffect, useState } from 'react';
export function ProdutosData({secao}) {
    let [dadosProduto, setDadosProduto] = useState([]);

    async function getProdutos() {
        let response;
        try {
            if (secao === "Ofertas") {
                response = await produtos.listarOfertas();
            } else { 
                response = await produtos.listarProdutos() 
            };
            setDadosProduto(response);
        } catch (e) {
            console.log(e);
            return <h1>
                Erro
            </h1>
        }
    }

    useEffect(() => {
        getProdutos()
    }, [])

    return (
        <div className={styles['listaProdutos']}>
            {dadosProduto.map((produto) => (
                <Produto
                    nome={produto.nome}
                    estado={produto.estadoGeral}
                    imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrhiivQ-a9g_wMJYALyFjZIE9ylQuwprSM3A&s"
                    preco={produto.preco} />
            ))}
        </div>
    )
}