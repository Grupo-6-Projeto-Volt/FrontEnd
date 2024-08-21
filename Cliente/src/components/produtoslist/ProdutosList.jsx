import styles from "./ProdutosList.module.css"
import { produtos } from "../../model/ProdutosListModel"
import { Produto } from "../productcard/ProductCard";
import React, { useEffect, useState } from 'react';
import { pesquisaProdutos } from "../../model/PesquisaModel";

export const list = document.getElementById('item-list');
export const itemWidth = 150;
export const padding = 16;
export const prev = document.getElementById('prev-btn');
export const next = document.getElementById('next-btn');
// import * as ProdutosList from './ProdutosList';
export function ProdutosData({ secao,nomeProduto }) {
    let [dadosProduto, setDadosProduto] = useState([]);

    async function getProdutos() {
        console.log(nomeProduto)
        let response;
        try {
            if (secao === "Ofertas") {
                response = await produtos.listarOfertas();
            }else if(nomeProduto !== null || nomeProduto !== ""){
                response = await pesquisaProdutos(nomeProduto)
            }else {
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

    // function onClick(btn){
    //     if(btn === 'prev'){
    useEffect(() => {
        if(prev){
            prev.addEventListener('click',()=>{
                list.scrollLeft -= (itemWidth + padding);
            })
        }
        if(next){
            next.addEventListener('click',()=>{
                list.scrollLeft += (itemWidth + padding)
            })
        }
    })
            
        // }else{
        // }
    // }
    
    return (
        // <div className={styles['listaProdutos']}>
        <div className={styles['container']}>
            <div className={styles['carousel-view']}>
                <button id="prev-btn" class="prev-btn"> </button>
                <div id="item-list" className={styles['item-list']}>
                    {dadosProduto.map((produto) => (
                        <Produto className={styles['item']}
                            nome={produto.nome}
                            estado={produto.estadoGeral}
                            imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrhiivQ-a9g_wMJYALyFjZIE9ylQuwprSM3A&s"
                            preco={produto.preco} />
                    ))}
                </div>

                <button id="next-btn" class="next-btn"> </button>
            </div>
        </div> 
    )
}



 