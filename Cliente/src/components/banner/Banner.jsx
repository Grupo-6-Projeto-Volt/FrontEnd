import React, { useEffect, useState } from 'react';
import { banner } from "../../model/bannerModel";
import FotoBanner from "../../utils/assets/img/banner2.png";
import styles from "./Banner.module.css";
import SpinningCircles from 'react-loading-icons/dist/esm/components/spinning-circles';
const Banner = (img) => {
    let [bannerImg, setBannerImg] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getBannerImg() {
        if (img.img === undefined) {
            let response;
            response = [];
            try {
                response = await banner.getBanner();

                setBannerImg(response);
                setIsLoading(false);
            } catch (e) {
                response = [];
                console.log(e);
                // setIsLoading(false);
                return <h1>
                    Erro
                </h1>
            }
        }
    }

    useEffect(() => {
        getBannerImg();
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
    }
};

export default Banner;