/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./ProdutosList.module.css"
import { produtos } from "../../model/ProdutosListModel"
import { Produto } from "../productcard/ProductCard";
import React, { useEffect, useState } from 'react';

export const itemWidth = 130;
export const padding = 16;
export const prev = document.getElementById('prev-btn');
export const next = document.getElementById('next-btn');
export function ProdutosData({ secao, nome }) {
    let [dadosProduto, setDadosProduto] = useState([]);

    function handleClick(btn) {
        const list = document.getElementById(`item-list-${nome}`);
        const itemWidth = 185
        const padding = 8
        if (btn === 'prev') {
            list.scrollLeft -= (itemWidth + padding)
        } else {
            list.scrollLeft += (itemWidth + padding)
        }
    }
    async function getProdutos() {
        let response;
        try {
            switch (secao) {
                case ("Ofertas"):
                    response = await produtos.listarOfertas();
                    break;
                default:
                    response = await produtos.listarProdutos()
                    break;
            }

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

    dadosProduto.map((produto) => (console.log(produto.imagensProduto.at(0))))

    return (
        <>
            <div className={styles['container']}>
                <h1>{secao}</h1>
                <div className={styles["linha-horizontal"]}></div>
                <div className={styles['carousel-view']}>
                    <button id={`prev-btn-${nome}`} onClick={handleClick.bind(this, 'prev')} className={styles['btn-prev']}> </button>
                    <div id={`item-list-${nome}`} className={styles['item-list']}>
                        {dadosProduto.map((produto) => (
                            <Produto className={styles['item']}
                                nome={produto.nome}
                                estado={produto.estadoGeral}
                                imgUrl={produto.imagensProduto.at(0).codigoImagem}
                                preco={produto.preco} />
                        ))}
                    </div>
                    <button id={`next-btn-${nome}`} onClick={handleClick.bind(this, 'next')} className={styles['btn-next']}> </button>
                </div>
            </div>
        </>
    )
}


