import React from "react";
import styles from "./CardPagina.module.css";
import capaImg from "../../utils/assets/capa.png";

const CardMusica = ({
    genero, artista, nomeMusica, anoLancamento, imagemSrc,
}) => {
    return (
        <div className={styles["card-musica"]}>
            <div className={styles["imagem-container"]}>
                <img src={imagemSrc ? imagemSrc : capaImg} alt="Imagem"
                    className={styles["imagem"]} />
            </div>
            <div className={styles["textos"]}>
                <h1>{nomeMusica || "N/A"}</h1>
                <p><span>Modelo:</span> {artista || "N/A"} </p>
                <p><span>Valor</span>: {genero || "N/A"} </p>
                <p><span>Ano de Lançamento</span>: {anoLancamento || "N/A"} </p>
            </div>
        </div>
    );
};
export default CardMusica;