import styles from "./NavBar.module.css"
import logo from "../../utils/assets/img/logo-ichiban.png"
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import userExample from "../../utils/assets/img/usuario-exemplo.jpg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pesquisa from "../../pages/pesquisa/Pesquisa";
export const NavBarPadrao = () => {
    const [inputValue, setInputValue] = useState("");
    let navigate = useNavigate();

    const buscarProduto = () => {
        // console.log(window.location.href.includes('pesquisa'))
        // if(window.location.href.includes('pesquisa')){
        //     Pesquisa.setState({valor: inputValue});
        // }else{
            navigate('/pesquisa', { state: { valor: inputValue } })
        // }
        console.log(inputValue)
    };

    return (
        <nav className={styles["navbar"]}>
            <div className={styles["container-navbar"]}>
                <img src={logo} alt="logo ichiban" className={styles["img-logo"]} />
                <div className={styles["containerPesquisaUser"]}>
                    <div className={styles["pesquisa"]}>
                        <input type="text" id="busca-produto" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        <FaSearch className={styles['search']} onClick={buscarProduto} />
                    </div>
                    <h3>|</h3>
                    <div className={styles["usuarioDiv"]}>
                        <img src={userExample} alt="" className={styles["usuario"]} />
                        <FaRegHeart className={styles["favoritos"]} />
                    </div>
                </div>
            </div>
            <div className={styles["navBarBaixo"]}>
                <ul>
                    <li>Mais Comprados</li>
                    <li>Comprar Novamente</li>
                    <li>Ofertas</li>
                    <li>Celulares</li>
                    <li>Notebooks</li>
                    <li>Acessórios</li>
                </ul>
            </div>
        </nav>
    )
}
