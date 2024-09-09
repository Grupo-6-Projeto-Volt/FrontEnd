import styles from "../productsearch/ProductSearch.module.css"
import { Produto } from "../productcard/ProductCard";
import React, { useEffect, useState } from 'react';
import { pesquisaProdutos } from "../../model/PesquisaModel";
import { useNavigate } from "react-router-dom";

export const list = document.getElementById('item-list');
export const itemWidth = 150;
export const padding = 16;


export function ProdutosBuscados({ pesquisa }) {
    let navigate = useNavigate();
    let [dadosProduto, setDadosProduto] = useState([]);
    async function getProdutos() {
        let response;
        try {
            if(pesquisa !== "" && pesquisa.length > 0){
                console.log(pesquisa)
                response = await pesquisaProdutos(pesquisa.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
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
    }, [pesquisa])
    
    if(dadosProduto.length > 0){
        return (
            <div className={styles['container']} onClick={() => navigate("/productpage")}>
                <div className={styles['products-view']}>
                    <div id="item-list" className={styles['item-list']}>
                    {dadosProduto.map((produto, index) => (
                        <React.Fragment key={index}>
                            <Produto 
                                className={styles['item']}
                                nome={produto.nome}
                                estado={produto.estadoGeral}
                                imgUrl={produto.imagensProduto.at(0).codigoImagem}
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



 