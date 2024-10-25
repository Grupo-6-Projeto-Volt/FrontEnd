import React, { useEffect, useState, useReducer } from 'react';
import styles from "./Banner.module.css";
import FotoBanner from "../../utils/assets/img/banner2.png"
import { banner } from "../../model/bannerModel";
const Banner = () => {
    let [bannerImg, setBannerImg] = useState([]);


    async function getBannerImg() {
        let response;
        response = [];
        try {
            response = await banner.getBanner();

            console.log(response)
            setBannerImg(response)
        } catch (e) {
            response = [];
            console.log(e);
            return <h1>
                Erro
            </h1>
        }
    }

    useEffect(() => {
        getBannerImg()
    }, []);

    if(bannerImg.length > 0){
        return (
            <div className={styles["container-banner"]}>
                <img src={bannerImg} alt="banner" className={styles["img-banner"]} />
            </div>
        );
    } else {
        return (
            <div className={styles["container-banner"]}>
                <img src={FotoBanner} alt="banner" className={styles["img-banner"]} />
            </div>
        );
    }
};

export default Banner;