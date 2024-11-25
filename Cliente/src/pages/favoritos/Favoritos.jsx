import { useEffect } from 'react';
import styles from "./Favoritos.module.css"
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../../utils/global";
import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from '../../components/footer/Footer';
import {ListFav} from '../../components/produtoslist/ProdutosListFav';
const Favoritos = (idUser) => {
    let navigate = useNavigate();

    function validateAuthentication() {
        if (!validateAuth()) {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        validateAuthentication();
    })

    if (validateAuthentication()) {
        return (
            <>
                <NavBarPadrao />
                <div className={styles['container']}>
                    <h1>Favoritos</h1>
                    <ListFav className={styles['listFav']} />
                </div>
                <Footer className={styles['footer']} />
            </>
        )
    } else {
        return (
            <>
                <NavBarPadrao />
                <div className={styles['container']}>
                    <h1>Favoritos</h1>
                    <div className={styles['favoritos-deslogado']}>
                        <h2>Você precisa estar logado para ver seus produtos favoritos.</h2>
                        <button onClick={() => navigate("/login")}>Logue-se</button>
                        <h3>ou então</h3>
                        <h2 className={styles['cadastrar']} onClick={() => navigate("/cadastro")}>Crie sua conta</h2>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Favoritos;