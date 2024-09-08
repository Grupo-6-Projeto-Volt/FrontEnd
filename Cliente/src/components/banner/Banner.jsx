import React from "react";
import styles from "./Banner.module.css";
import FotoBanner from "../../utils/assets/img/banner.png"

const Banner = () => {
    return (
        <div className={styles["container-banner"]}>
            <img src={FotoBanner} alt="banner" className={styles["img-banner"]} />
        </div>
    );
};

export default Banner;