import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className={styles["Home"]}>
            <button onClick={() => {
                navigate("/login")
            }}>Logar</button>
        </div>
    )
};

export default Home;