/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./ProdutosList.module.css"
import { produtos } from "../../model/ProdutosListModel"
import { Produto } from "../productcard/ProductCard";
import React, { useEffect, useState } from 'react';

export const itemWidth = 130;
export const padding = 16;
export const prev = document.getElementById('prev-btn');
export const next = document.getElementById('next-btn');
// import * as ProdutosList from './ProdutosList';
export const list = document.getElementById('item-list');
export function ProdutosData({ secao }) {
    let [dadosProduto, setDadosProduto] = useState([]);

    async function getProdutos() {
        let response;
        try {
            if (secao === "Ofertas") {
                console.log("TESTE")
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
        <div className={styles['container']}>
            <h1>{secao}</h1>
            <div className={styles['carousel-view']}>
                {/* <button id="prev-btn" class="prev-btn"> </button> */}
                <div id="item-list" className={styles['item-list']}>
                    {dadosProduto.map((produto) => (
                        <Produto className={styles['item']}
                            nome={produto.nome}
                            estado={produto.estadoGeral}
                            imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrhiivQ-a9g_wMJYALyFjZIE9ylQuwprSM3A&s"
                            preco={produto.preco} />
                    ))}
                </div>
                {/* <button id="next-btn" className={styles['next-btn']}> </button> */}
            </div>
        </div> 
    )
}



 