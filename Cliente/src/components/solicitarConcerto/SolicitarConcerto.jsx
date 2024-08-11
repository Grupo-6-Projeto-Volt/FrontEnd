import React from "react";
import styles from "./SolicitarConcerto.module.css";
import logo from "../../utils/assets/img/logo-ichiban.png"


const SolicitarConcerto = () => {
    return (
        <div className={styles["container-solicitarConcerto"]}>
          <div className={styles["container-pergunta"]}>
            <h2>Deseja solicitar agendamento <br></br>para conserto?</h2>
          </div>
          <div className={styles["container-texto"]}>
            <div>
                <p>Caso você queira consertar seu aparelho, <br></br>entre em contato conosco!</p>
            </div>
            <div className={styles["container-botao"]}>
                <button>Quero consertar</button>
            </div>
          </div>
        </div>
    );
};

export default SolicitarConcerto;
