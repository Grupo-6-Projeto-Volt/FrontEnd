import React, { useEffect, useState, useReducer } from 'react';
import styles from "./Banner.module.css";
// import FotoBanner from "../../utils/assets/img/banner2.png"
import { banner } from "../../model/bannerModel";
const Banner = () => {
    let [teste, setTeste] = useState([]);
    const reader = new FileReader();
    

   
async function getFavoritos() {
    let response;
    response = [];
    // console.log(teste);
    try {
        response = await banner.getBanner();
        
        console.log(response)
        setTeste(response)
    } catch (e) {
        response = [];
        console.log(e);
        return <h1>
            Erro
        </h1>
    }
}

useEffect(() => {
    getFavoritos()
}, [])
return (
    <div className={styles["container-banner"]}>
        <img src={teste} alt="banner" className={styles["img-banner"]} />
    </div>
);
};

export default Banner;