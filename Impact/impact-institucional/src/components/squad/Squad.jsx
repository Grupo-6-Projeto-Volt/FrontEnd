import React from 'react';
import styles from './Squad.module.css';
import styles2 from '../servicos/Servicos.module.css';
import felipeImg from '../../utils/assets/img/felipe.jpg';
import lariImg from '../../utils/assets/img/larissa.jpg';
import danImg from '../../utils/assets/img/daniel.jpg';
import caetanoImg from '../../utils/assets/img/caetano.png';
import daviImg from '../../utils/assets/img/davi.png';
import amandaImg from '../../utils/assets/img/amanda.png';

const Squad = () => {

    return (
        <div className={styles["container"]}>
            <div className={styles["centralizar"]}>
                <h1 className={styles2["titulo"]}>Nosso Time</h1>
            </div>
            <div className={styles["row"]}>
                <div className={styles["card"]}>
                    <img src={lariImg} />
                    <h3>Larissa Sonoda</h3>
                    <p>Scrum Master</p>
                </div>
                <div className={styles["card"]}>
                    <img src={danImg} />
                    <h3>Daniel Rodrigues</h3>
                    <p>Product Owner</p>
                </div>
                <div className={styles["card"]}>
                    <img src={daviImg} />
                    <h3>Davi Hilário</h3>
                    <p>Dev Fullstack</p>
                </div>
            </div>

            <div className={styles["row"]}>
                <div className={styles["card"]}>
                    <img src={amandaImg} />
                    <h3>Amanda Cupola</h3>
                    <p>Designer & Dev Frontend</p>
                </div>
                <div className={styles["card"]}>
                    <img src={felipeImg} />
                    <h3>Felipe Santos</h3>
                    <p>QA & Dev Backend</p>
                </div>
                <div className={styles["card"]}>
                    <img src={caetanoImg} />
                    <h3>Caetano Resende</h3>
                    <p>Designer & Analista de dados</p>
                </div>
            </div>


        </div>
    )

}

export default Squad;