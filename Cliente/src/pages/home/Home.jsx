import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import existeToken from "../../validarToken";
import logo from '../../utils/assets/logo-ichiban.png'

const Home = () => {

    const navigate = useNavigate()
    let [isLogado,setLogado] = useState() 

    useEffect(() => {
            setLogado(existeToken())
    },[])

    return (
        <div className={styles["Home"]}>
            <div className={styles["box-logo"]}>
                <img src={logo} className={styles["logo"]}></img>
            </div>
            {!isLogado && 
            <div className={styles["box-container"]}>
                <button className={styles["btn"]} onClick={() => {
                    navigate("/login")
                }}>Logar</button>
            </div>
            }
            {isLogado && 
            <div className={styles["box-container"]}>
                <h1>{sessionStorage.EMAIL}</h1>
                <button className={styles["btn"]} onClick={() => {
                        sessionStorage.clear()
                        setLogado(false)
                    }}>Logout</button>
            </div>
            }
        </div>
    )
};

export default Home;