import React, { useEffect, useState } from 'react';
import { banner } from "../../model/bannerModel";
import FotoBanner from "../../utils/assets/img/banner2.png";
import styles from "./Banner.module.css";
const Banner = (img) => {
    let [bannerImg, setBannerImg] = useState([]);

    async function getBannerImg() {
        if (img.img === undefined) {
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
    }

    useEffect(() => {
        getBannerImg();
    }, []);

    if (img !== undefined && img.img !== undefined) {
        return (
            <div className={styles["container-banner"]}>
                <img src={img.img} alt="banner" className={styles["img-banner"]} />
            </div>
        );
    } else if (bannerImg.length > 0) {
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