import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import api from "../../api";

const Home = () => {

    let [emailText, setEmailText] = useState("");
    let [passwordText, setPasswordText] = useState("");

    useEffect(() => {
        if(sessionStorage.length === 0 || sessionStorage.TOKEN === "") {
            window.alert("Deslogado");
        }
    }, [])

    let logar = () => {
        api.post("http://localhost:8080/login", {
            email: emailText,
            senha: passwordText
        }).then((resposta) => {
            console.log(resposta);
            sessionStorage.TOKEN = resposta.data.token;
            window.location.reload();
        }).catch((error) => {
            console.log("erro >>> " + error);
        })
    }

    let deslogar = () => {
        if (sessionStorage.TOKEN !== "") {
            sessionStorage.TOKEN = "";
        }
    }
 
    return (
        <>
            <div className="login-form">
                <label>Email</label>
                <input type="text" onChange={(e) => setEmailText(e.target.value)}/>

                <label>Senha</label>
                <input type="password" onChange={(e) => setPasswordText(e.target.value)}/>

                <button onClick={logar}>Logar</button>
                <button onClick={deslogar}>Deslogar</button>
            </div>
        </>
    );
};

export default Home;