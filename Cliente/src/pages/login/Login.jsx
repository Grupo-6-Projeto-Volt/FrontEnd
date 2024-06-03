import { useState } from "react";
import styles from "./Login.module.css";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import logo from "../../utils/assets/logo-ichiban.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  let [emailText, setEmailText] = useState("");
  let [passwordText, setPasswordText] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    api
      .post("/login", {
        email: emailText,
        senha: passwordText,
      })
      .then((resultado) => {
        const Data = resultado.data;
        sessionStorage.TOKEN = Data.token;
        sessionStorage.ID = Data.userId;
        sessionStorage.EMAIL = Data.email;
        toast.success('Login realizado com sucesso!!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate("/pagina");
      })
      .catch((erro) => {
        console.error("Houve um erro: " + erro);
        toast.error("Email ou senha inválidos!!");
      });
  }

  return (
    <>
      <ToastContainer />
    <div className={styles["Login"]}>
      <div className={styles["box-logo"]}>
        <img src={logo} className={styles["logo"]}></img>
      </div>
      <div className={styles["form"]}>
        <div className={styles["voltar"]}>
          <p
            onClick={() => {
              navigate("/pagina");
            }}
          >
            Voltar
          </p>
        </div>
        <h1 className={styles["titulo"]}>
          <b>Entrar</b>
        </h1>
        <div className={styles["input-group"]}>
          <div className={styles["input-box"]}>
            <label>Email:</label>
            <input
              onChange={(evento) => {
                setEmailText(evento.target.value);
              }}
              placeholder="Exemplo@gmail.com"
              type="email"
            ></input>
          </div>
          <div className={styles["input-box"]}>
            <label>Senha:</label>
            <input
              onChange={(evento) => {
                setPasswordText(evento.target.value);
              }}
              placeholder="*******"
              type="password"
            ></input>
            <p className={styles["redefinir-senha"]}>Esqueceu a senha?</p>
          </div>
          <button onClick={handleSubmit} className={styles["btn"]}>
            Entrar
          </button>
        </div>
        <div className={styles["box-cadastar"]}>
          <div>
            <p>Não possui conta ainda?</p>
          </div>
          <div>
            <a
              className="link"
              onClick={() => {
                navigate("/cadastro");
              }}
            >
              Cadastre-se agora
            </a>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    </>
  );
}

export default Login;
