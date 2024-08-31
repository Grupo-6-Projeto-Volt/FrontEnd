import React from "react";
import styles from "./Categorias.module.css";
import notebookCategoria from "../../utils/assets/img/notebook-categoria.png"
import celularesCategoria from "../../utils/assets/img/celulares-categoria.png"
import acessoriosCategoria from "../../utils/assets/img/acessorios-categoria.png"

const Categorias = () => {
    return (
        <div className={styles["container-categorias"]}>
                <div className={styles["categoria"]}>
                    <h4 className={styles["titulo-categorias"]}>Celulares</h4>
                    <img src={celularesCategoria} alt="celulares" className={styles["img-categorias"]} />
                    <button className={styles["button-categorias"]}>Ver mais em Celulares</button>
                </div>
                <div className={styles["categoria"]}>
                    <h4 className={styles["titulo-categorias"]}>Notebooks</h4>
                    <img src={notebookCategoria} alt="notebookCategoria" className={styles["img-categorias"]} />
                    <button className={styles["button-categorias"]}>Ver mais em Notebooks</button>
                </div>
                <div className={styles["categoria"]}>
                    <h4 className={styles["titulo-categorias"]}>Acessórios</h4>
                    <img src={acessoriosCategoria} alt="acessorios" className={styles["img-categorias"]} />
                    <button className={styles["button-categorias"]}>Ver mais em Acessórios</button>
                </div>
        </div>
    );
};

export default Categorias;