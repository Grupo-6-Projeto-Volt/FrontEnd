import React from "react";
import styles from "./Competencias.module.css";
import alvo from '../../utils/assets/img/alvo.png'
import grafico from '../../utils/assets/img/grafico.png'
import ligacao from '../../utils/assets/img/ligacao.png'
import suporte from '../../utils/assets/img/suporte.png'
import personalizado from '../../utils/assets/img/personalizado.png'
import telefone from '../../utils/assets/img/telefone.png'

const Competências = () => {
  return (
    <div className={styles["container"]}>
        <div className={styles["titulo"]}>
            <h1>Confira nossas competências</h1>
        </div>
        <div className={styles["container-box"]}>
            <div className={styles["box-row"]}>
                <div className={styles["box"]}>
                <img src={personalizado} alt="alvo-impact" className={styles['icone']} />
                    <p>Software Personalizado</p>
                </div>
                <div className={styles["box"]}>
                <img src={telefone} alt="alvo-impact" className={styles['icone-tell']} />
                    <p>Aplicativos Intuitivos</p>
                </div>
                <div className={styles["box"]}>
                <img src={suporte} alt="alvo-impact" className={styles['icone']} />
                    <p>Suporte Contínuo</p>
                </div>
            </div>
            <div className={styles["box-row"]}>
                <div className={styles["box"]}>
                <img src={grafico} alt="alvo-impact" className={styles['icone']} />
                    <p>Soluções Inovadoras</p>
                </div>
                <div className={styles["box"]}>
                <img src={ligacao} alt="alvo-impact" className={styles['icone']} />
                    <p>Integração de Sistemas</p>
                </div>
                <div className={styles["box"]}>
                    <img src={alvo} alt="alvo-impact" className={styles['icone']} />
                    <p>Consultoria Estratégica</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Competências;
