import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles["container-footer"]}>
        <div className={styles["horario"]}>
            <p>Horário de atendimento</p>
            <p>Segunda a Sexta das 08h às 16h30 - Exceto Feriados</p>
        </div>
        <div className={styles["telefone"]}>
            <p>Telefone/ E-mail</p>
            <p>1134732737/ 11969611247</p>
            <p>impact@gmail.com</p>
        </div>
    </div>
  );
};

export default Footer;
