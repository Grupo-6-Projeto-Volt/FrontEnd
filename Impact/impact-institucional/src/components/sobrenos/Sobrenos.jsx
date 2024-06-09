import React from "react";
import styles from "./SobreNos.module.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import logo from '../../utils/assets/img/logo.png'
import logos_sobreNos from '../../utils/assets/img/logosSobrenos.png'


const SobreNos = () => {
    return (
      <div className={styles["container-sobreNos"]}>
       <div className={styles["box-titulo"]}>
            <h1>Sobre nós</h1>
       </div>
       <div className={styles["box-img"]}>
            <img src={logos_sobreNos} alt="logo-impact" className={styles['logosSobrenos']} />
       </div>
       <div className={styles["box-valores"]}>
        <div className={styles["valores"]}>
            <h1>Missão</h1>
            <p>Inovar com soluções tecnológicas que transformam negócios.</p>
        </div>
        <div className={styles["valores"]}>
            <h1>Visão</h1>
            <p>Ser líder em desenvolvimento de software junto aos nossos clientes.</p>
        </div>
        <div className={styles["valores"]}>
            <h1>Valores</h1>
            <p>Inovação, qualidade, integridade, e colaboração.</p>
        </div>
       </div>
      </div>
    );
  };
  
  export default SobreNos;