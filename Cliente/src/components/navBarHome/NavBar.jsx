import styles from "./NavBar.module.css"
import logo from "../../utils/assets/img/logo-ichiban.png"
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { validateAuth } from "../../utils/global";
import userPadrao from "../../utils/assets/img/user_padrao.png"
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
export const NavBarPadrao = () => {
    let navigate = useNavigate();

    function validateAuthentication() {
        if (!validateAuth()) {
            return <img src={userPadrao} alt="" className={styles["usuario"]} onClick={() => {
                navigate("/login");
            }} />
        } else {
            return <h2>Olá, user</h2>
        }
    }

    useEffect(() => {
        validateAuthentication();
    })
    return (
        <nav className={styles["navbar"]}>
            <div className={styles["container-navbar"]}>
                <img onClick={() => navigate("/")} src={logo} alt="logo ichiban" className={styles["img-logo"]} />
                <div className={styles["containerPesquisaUser"]}>
                    <div className={styles["pesquisa"]}>
                        <input type="text" />
                        <FaSearch />
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
