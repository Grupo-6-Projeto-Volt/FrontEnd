import React from "react";
import styles from "./Footer.module.css";
import logo from "../../utils/assets/img/logo-ichiban.png"


const Footer = () => {
    return (
        <div className={styles["container-footer"]}>
            <div className={styles["informacoes"]}>
              <div className={styles["horario"]}>
                  <p>Horário de atendimento</p>
                  <p>Segunda a Domingo das 08h às 21h00 - Exceto Feriados</p>
              </div>
              <div className={styles["telefone"]}>
                  <p>Telefone/ E-mail</p>
                  <p>1134732737 / 11969611247</p>
                  <p>ichiban@gmail.com</p>
              </div>
            </div>
            <div className={styles["logo"]}>
              <img src={logo} alt="logo ichiban" className={styles["img-logo"]} />
            </div>
        </div>
    );
};

export default Footer;


