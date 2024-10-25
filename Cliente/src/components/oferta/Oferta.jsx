import React, { useEffect, useState, useReducer } from 'react';
import styles from "./Oferta.module.css";
import Oferta from "../../utils/assets/img/ofertaEspecial.png"
import { propaganda } from "../../model/propagandaModel";
const Ofertas = () => {
    let [propagandaImg, setPropagandaImg] = useState([]);


    async function getPropagandaImg() {
        let response;
        response = [];
        try {
            response = await propaganda.getPropaganda();

            console.log(response)
            setPropagandaImg(response)
        } catch (e) {
            response = [];
            console.log(e);
            return <h1>
                Erro
            </h1>
        }
    }

    useEffect(() => {
        getPropagandaImg()
    }, []);
    
    if(propagandaImg.length > 0){
        return (
            <div className={styles["container-oferta"]}>
                <h1>Ofertas Especiais</h1>
                <div className={styles["linha-horizontal"]}></div>
                <img src={propagandaImg} alt="oferta" className={styles["img-oferta"]} />
            </div>
        );
    } else {
        return (
            <div className={styles["container-oferta"]}>
                <h1>Ofertas Especiais</h1>
                <div className={styles["linha-horizontal"]}></div>
                <img src={Oferta} alt="oferta" className={styles["img-oferta"]} />
            </div>
        );
    }
};

export default Ofertas;