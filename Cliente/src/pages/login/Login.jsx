import { useState } from 'react';
import styles from './Login.module.css'
import api from '../../api';
import { useNavigate } from "react-router-dom";
import logo from '../../utils/assets/logo-ichiban.png'

function Login(){

    let [emailText, setEmailText] = useState("")
    let [passwordText, setPasswordText] = useState("")
    const navigate = useNavigate()
    
    function handleSubmit(){
        api.post(null,{
            email: emailText,
            senha: passwordText
        }).then(resultado => {
            const Data = resultado.data;
            sessionStorage.TOKEN = Data.token;
            sessionStorage.ID = Data.userId;
            sessionStorage.EMAIL = Data.email;
            alert("Login feito com sucesso!!")
            navigate("/pagina")
        }).catch(erro => {
            console.error("Houve um erro: " + erro);
            alert("Email ou senha inválidos!!")
        })
    }

    return(
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
                <h1 className={styles["titulo"]}>Entrar</h1>
                <div className={styles["input-group"]}>
                    <div className={styles["input-box"]}>
                        <label>Email:</label>
                        <input onChange={(evento) => {
                            setEmailText(evento.target.value)
                        }} placeholder='Exemplo@gmail.com' type='email'></input>
                    </div>
                    <div className={styles["input-box"]}>
                        <label>Senha:</label>
                        <input onChange={(evento) => {
                            setPasswordText(evento.target.value)
                        }} placeholder='*******' type='password'></input>
                    </div>
                    <div className={styles["box-senha"]}>
                    <p className={styles["redefinir-senha"]}>Esqueceu a senha?</p>
                    </div>
                </div>
                <button onClick={handleSubmit} className={styles["btn"]}>Entrar</button>
                <p onClick={() => {
                    navigate("/cadastro")
                }}>Não possui conta ainda? Cadastre-se agora</p>
                </div>
                <div>
            </div>
        </div>
    )
}

export default Login;