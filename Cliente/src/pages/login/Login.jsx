import { useState } from 'react';
import styles from './Login.module.css'
import api from '../../api';
import { useNavigate } from "react-router-dom";

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
            navigate("/")
        }).catch(erro => {
            console.error("Houve um erro: " + erro);
            alert("Email ou senha inválidos!!")
        })
    }

    return(
        <div className={styles["Login"]}>
            <div className={styles["form"]}>
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
                </div>
                <button onClick={handleSubmit} className={styles["btn"]}>Entrar</button>
            </div>
        </div>
    )
}

export default Login;