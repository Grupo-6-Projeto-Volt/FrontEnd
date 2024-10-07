import styles from "./ProdutosListFav.module.css"
import {ProdutoFav} from "../productcard/ProductCardFav"
import React, { useEffect, useState, useReducer } from 'react';
import { favoritos } from "../../model/favoritosModel.js"
import { FaHeart } from "react-icons/fa";

export function ListFav(){
    let [favoritosDados, setFavoritosDados] = useState([]);
    async function getFavoritos(){
        let response;
        response = [];
        console.log(favoritosDados);
        try {
            response = await favoritos.listarFavoritos();
            console.log(response)
            setFavoritosDados(response)
        } catch (e) {
            response = [];
                console.log(e);
                return <h1>
                    Erro
                </h1>
        }
    }

    
    useEffect(() => {
        if(favoritosDados){
            getFavoritos();
        }
    }, [])
    

    const render = () => {getFavoritos()}
    const [favAtualizar, forceRender] = useReducer(render, []);

    
    return(
        <>
            <div className={styles["container"]}>
            {
                favoritosDados.length > 0 ? favoritosDados.map((favorito) => (
                    <div className={styles["item"]}>
                         <div className={styles["produto"]}>
                            <FaHeart onClick={() => { favoritos.desfavoritar(favorito.id); getFavoritos(); favoritosDados.splice(favoritosDados.findIndex(fav => fav.id === favorito.id), 1); forceRender(favoritosDados) }} className={styles["heart"]}/>
                            <img src={favorito.produto.imagensProduto.at(0).codigoImagem } alt={favorito.produto.preco} />
                            <h4 className={styles["nomeProd"]}>{favorito.produto.nome}</h4>
                            <h4 className={styles["precoProd"]}>R$ {favorito.produto.preco.toFixed(2).replace('.', ',')}</h4>
                        </div> 
                    </div>
                )) : <div className={styles['noContent']}><h2>Você ainda não tem produtos favoritados</h2></div>
                    
                
            }
            </div>
        </>
    );
}