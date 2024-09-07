import styles from "./NavBar.module.css"
import logo from "../../utils/assets/img/logo-ichiban.png"
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import userExample from "../../utils/assets/img/usuario-exemplo.jpg"
import { useState } from "react";
export const NavBarPadrao = ({onSearch}) => {
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
