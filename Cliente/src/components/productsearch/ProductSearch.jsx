import styles from "../productsearch/ProductSearch.module.css"
import { Produto } from "../productcard/ProductCard";
import React, { useEffect, useState } from 'react';
import { pesquisaProdutos } from "../../model/PesquisaModel";

export const list = document.getElementById('item-list');
export const itemWidth = 150;
export const padding = 16;
export function ProdutosBuscados({ pesquisa }) {
    let [dadosProduto, setDadosProduto] = useState([]);
    async function getProdutos() {
        let response;
        console.log(pesquisa)
        try {
            if(pesquisa !== "" && pesquisa.length > 0){
                console.log(pesquisa)
                response = await pesquisaProdutos(pesquisa.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            }
            console.log("response", response)
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
    }, [pesquisa])
    
    if(dadosProduto.length > 0){
        return (
            <div className={styles['container']}>
                <div className={styles['products-view']}>
                    <div id="item-list" className={styles['item-list']}>
                    {dadosProduto.map((produto, index) => (
                        <React.Fragment key={index}>
                            <Produto 
                                className={styles['item']}
                                nome={produto.nome}
                                estado={produto.estadoGeral}
                                imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrhiivQ-a9g_wMJYALyFjZIE9ylQuwprSM3A&s"
                                preco={produto.preco} 
                            />
                            {(index) % 4 === 0 && <br />}
                        </React.Fragment>
                    ))}
                    </div>    
                </div>
            </div> 
        )
    }
}



 