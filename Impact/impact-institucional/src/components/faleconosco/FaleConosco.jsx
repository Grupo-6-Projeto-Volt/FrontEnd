import React from "react";
import styles from "./FaleConosco.module.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import logo from '../../utils/assets/img/logo.png'

const FaleConosco = () => {
  return (
    <div className={styles["container-contato"]}>
      <div className={styles["box-titulo"]}>
        <h1><b>Fale conosco</b></h1>
        <p>Favor informar os dados abaixo, caso queira nos contactar</p>
      </div>
      <div className={styles["form"]}>
        <div className="flex flex-column gap-2 w-full">
            <p>Nome</p>
          <label htmlFor="username" className="p-sr-only">
            Nome:
          </label>
          <InputText
            id="username"
            placeholder="Nome"
            className="p-invalid mr-2"
          />
          {/* <Message severity="error" text="Username is required" /> */}
        </div>
        <div className="flex flex-column gap-2 w-full">
        <p>Email</p>
          <label htmlFor="email" className="p-sr-only">
            Email:
          </label>
          <InputText
            id="email"
            placeholder="Email"
            className="p-invalid mr-2"
          />
          {/* <Message severity="error" /> */}
        </div>
        <div className="flex flex-column gap-2 w-full">
        <p className="">Mensagem</p>
          <label htmlFor="text" className="p-sr-only">
            Mensagem
          </label>
          <InputTextarea
            id="mensagem"
            placeholder="Insira sua mensagem aqui"
            className="p-invalid mr-2"
          />
          {/* <Message severity="error" /> */}
        </div>
        <Button className="button-submit" label="Enviar" />
      </div>
      <div>
        <img src={logo} alt="logo-impact" className={styles['logo']} />
      </div>
    </div>
  );
};

export default FaleConosco;
