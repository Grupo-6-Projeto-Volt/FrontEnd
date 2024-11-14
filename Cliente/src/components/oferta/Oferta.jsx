import React, { useCallback, useEffect, useState } from 'react';
import { propaganda } from "../../model/propagandaModel";
import Oferta from "../../utils/assets/img/ofertaEspecial.png";
import styles from "./Oferta.module.css";
import SpinningCircles from 'react-loading-icons/dist/esm/components/spinning-circles';
const Ofertas = (img) => {
    let [propagandaImg, setPropagandaImg] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getPropagandaImg = useCallback(async () => {
        if (img.img === undefined) {
            let response;
            response = [];
            try {
                response = await propaganda.getPropaganda();
                setPropagandaImg(response);
                // setIsLoading(false);
            } catch (e) {
                response = [];
                console.log(e);
            }
        }
    }, [img.img])


    useEffect(() => {
        getPropagandaImg();
        if(propagandaImg.length > 0 && isLoading){
            setIsLoading(false);
        } else {
            setTimeout(() => setIsLoading(false), 7000);
        }
    }, []);

    if (isLoading) {
        return (
            <div className={styles["container-carregamento"]}>
                <SpinningCircles stroke='#c0c0c0' fill='#d0d0d0' speed={.99} />
            </div>
        )
    } else {
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
    }
};

export default Ofertas;