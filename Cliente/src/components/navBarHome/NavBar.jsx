import styles from "./NavBar.module.css"
import logo from "../../utils/assets/img/logo-ichiban.png"
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../../utils/global";
import { useEffect } from 'react';
import userPadrao from "../../utils/assets/img/user_padrao.png"


export const NavBarPadrao = ({onSearch}) => {
    let navigate = useNavigate();
    const [busca,setBusca ] = useState("");
    const handleInputChange = (event) => {
        setBusca(event.target.value);
    };
    const handleClickSearch = ()=>{
        onSearch(busca);
    }
    const handleKeyDown = (event) =>{
        if(event.key === "Enter"){
            handleClickSearch()
        }
    }

    function validateAuthentication() {
        if (!validateAuth()) {
            return <img src={userPadrao} alt="" className={styles["usuario"]} onClick={() => {
                navigate("/login");
            }} />
        } else {
            return <h2>Olá, user</h2>
        }
    }
    return (
        <nav className={styles["navbar"]}>
            <div className={styles["container-navbar"]}>
                <img src={logo} alt="logo ichiban" className={styles["img-logo"]}/>
                <div className={styles["containerPesquisaUser"]}>
                    <div className={styles["pesquisa"]}>
                        <input type="text" id="busca-produto"  value={busca} onChange={handleInputChange} onKeyDown={handleKeyDown}
                            placeholder="Pesquisar..." />
                        <FaSearch className={styles['search']} onClick={handleClickSearch}/>
                    </div>
                    <h3>|</h3>
                    <div className={styles["usuarioDiv"]}>
                        {validateAuthentication()}
                        <FaRegHeart className={styles["favoritos"]} onClick={() => { navigate("/favoritos")}} />
                    </div>
                </div>
            </div>
            <div className={styles["navBarBaixo"]}>
                <ul>
                    <li>Mais Comprados</li>
                    <li>Comprar Novamente</li>
                    <li>Ofertas</li>
                    <li onClick={() => navigate("/pagina-produtos")}>Celulares</li>
                    <li>Notebooks</li>
                    <li>Acessórios</li>
                </ul>
            </div>
        </nav>
    )
}
