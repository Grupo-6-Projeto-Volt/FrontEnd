import React from "react";
import styles from "./Oferta.module.css";
import Oferta from "../../utils/assets/img/ofertaEspecial.png"

const Ofertas = () => {
    return (
        <div className={styles["container-oferta"]}>
            <h1>Ofertas Especiais</h1>
            <div className={styles["linha-horizontal"]}></div>
            <img src={Oferta} alt="oferta" className={styles["img-oferta"]} />
        </div>
    );
};

export default Ofertas;