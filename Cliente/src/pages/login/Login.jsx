import { useState } from 'react';
import styles from './Login.module.css'
import api from '../../api';

function Login(){

    let [emailText, setEmailText] = useState("")
    let [passwordText, setPasswordText] = useState("")
    
    function handleSubmit(){
        api.post("http://localhost:8080/login",{
            email: emailText,
            senha: passwordText
        }).then(resultado => {
            console.log(resultado.data)
        }).catch(erro => {
            console.error("Houve um erro: " + erro.message);
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