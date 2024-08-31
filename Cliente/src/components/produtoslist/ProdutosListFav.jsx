import styles from "./ProdutosListFav.module.css"
import {ProdutoFav} from "../productcard/ProductCardFav"
import React, { useEffect, useState } from 'react';
import { favoritos } from "../../model/favoritosModel.js"


export function ListFav(){
    let [favoritosDados, setFavoritosDados] = useState([]);

    async function getFavoritos(){
        let response;
        try {
            response = await favoritos.listarFavoritos();
            formatarFavoritos(response)
        } catch (e) {
            response = [];
            console.log(e);
            return <h1>
                Erro
            </h1>
        }
    }
    // console.log(getFavoritos())
    function formatarFavoritos(favoritos){
        let favoritosFormatados = [];
        if(favoritos){
            favoritos.forEach((favorito) => {
                favoritosFormatados.push({
                    preco: favorito.produto.preco,
					nome: favorito.produto.nome,
					imagemProduto: favorito.produto.imagensProduto.at(0).codigoImagem
				});
			});
        }
        setFavoritosDados(favoritosFormatados)
    }

    useEffect(() => {
        getFavoritos();
    }, [])

    console.log(favoritosDados)
    return(
        <>
            <div className={styles["container"]}>
                {
                    favoritosDados.map((produto) => (
                        <ProdutoFav className={styles['item']}
                        nome = {produto.nome}
                        imgUrl = {produto.imagemProduto}
                        preco = {produto.preco} />
                    ))
                }
            </div>
        </>
    );
}