import React, { useCallback, useEffect, useState } from 'react';
import { propaganda } from "../../model/propagandaModel";
import Oferta from "../../utils/assets/img/ofertaEspecial.png";
import styles from "./Oferta.module.css";
const Ofertas = (img) => {
    let [propagandaImg, setPropagandaImg] = useState([]);


    const getPropagandaImg = useCallback(async () => {
        if (img.img === undefined) {
            console.log("teste")
            let response;
            response = [];
            try {
                response = await propaganda.getPropaganda();

                setPropagandaImg(response)
            } catch (e) {
                response = [];
                console.log(e);
            }
        }
    }, [img.img])


    useEffect(() => {
        getPropagandaImg();
    }, [getPropagandaImg]);

    if (img !== undefined && img.img !== undefined) {
        return (
            <div className={styles["container-oferta"]}>
                <h1>Ofertas Especiais</h1>
                <div className={styles["linha-horizontal"]}></div>
                <img src={img.img} alt="oferta" className={styles["img-oferta"]} />
            </div>
        );
    } else if (propagandaImg.length > 0) {
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