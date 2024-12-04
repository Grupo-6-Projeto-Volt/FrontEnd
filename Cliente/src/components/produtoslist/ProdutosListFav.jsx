import React, { useEffect, useReducer, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { favoritos } from "../../model/favoritosModel.js";
import styles from "./ProdutosListFav.module.css";
import { FORMATTER } from '../../utils/global.js';
import Padrao from '../../utils/assets/img/img-padrao.png'

export function ListFav() {
    let [favoritosDados, setFavoritosDados] = useState([]);
    async function getFavoritos() {
        let response;
        response = [];
        try {
            response = await favoritos.listarFavoritos();
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
        if (favoritosDados) {
            getFavoritos();
        }
    }, [])


    const render = () => { getFavoritos() }
    const [favAtualizar, forceRender] = useReducer(render, []);


    return (
        <>
            <div className={styles["container"]}>
                {
                    favoritosDados.length > 0 ? favoritosDados.map((favorito) => (
                        // <div className={styles["item"]}>
                        <>
                            {favorito.produto.desconto ?
                                <div className={styles["produto"]}>
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                        <span style={{ backgroundColor: '#d41f1f85', padding: '2%', borderRadius: '3px', color: '#fff', fontWeight: 'bold' }}>{favorito.produto.desconto}%</span>
                                        <FaHeart onClick={() => { favoritos.desfavoritar(favorito.id); }} className={styles["heart"]} />
                                    </div>
                                    { favorito.produto.imagensProduto.at(0) !== undefined ? <img src={favorito.produto.imagensProduto.at(0).codigoImagem} alt={favorito.produto.imagensProduto.at(0).nome} /> :<img src={Padrao} alt="imagem padrão" /> }                                    <h4 className={styles["nomeProd"]}>{favorito.produto.nome}</h4>
                                    <h5 className={styles['precoSemDesconto']}>R$ {FORMATTER.format(favorito.produto.preco)}</h5>
                                    <h4 className={styles["precoProd"]} style={{ color: '#d41f1f' }}>R$ {FORMATTER.format(((100 - favorito.produto.desconto) / 100) * favorito.produto.preco)}</h4>
                                </div> :
                                <div className={styles["produto"]}>
                                    <FaHeart onClick={() => { favoritos.desfavoritar(favorito.id); getFavoritos(); favoritosDados.splice(favoritosDados.findIndex(fav => fav.id === favorito.id), 1); forceRender(favoritosDados) }} className={styles["heart"]} />
                                    { favorito.produto.imagensProduto.at(0) !== undefined ? <img src={favorito.produto.imagensProduto.at(0).codigoImagem} alt={favorito.produto.imagensProduto.at(0).nome} /> :<img src={Padrao} alt="imagem padrão" /> }
                                    <h4 className={styles["nomeProd"]}>{favorito.produto.nome}</h4>
                                    <h4 className={styles["precoProd"]}>R$ {FORMATTER.format(favorito.produto.preco)}</h4>
                                </div>
                            }
                        </>
                        // </div>
                    )) : <div className={styles['noContent']}><h2>Você ainda não tem produtos favoritados</h2></div>


                }
            </div>
        </>
    );
}