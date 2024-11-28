import styles from "./NavBar.module.css";
import logo from "../../utils/assets/img/logo-ichiban.png";
import { FaSearch, FaUserCircle, FaRegHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../../utils/global";

export const NavBarPadrao = () => {
    let navigate = useNavigate();
    const [busca, setBusca] = useState("");
    const [logado, setLogado] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);
    const [showSearchInput, setShowSearchInput] = useState(false); 
	const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 800);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

	useEffect(() => {
		setLogado(!!sessionStorage.getItem("TOKEN")); 
	  }, []);	  

    const handleInputChange = (event) => {
        setBusca(event.target.value);
    };

	const handleClickSearch = () => {
		if (showSearchInput && busca) {
			navigate(`/pagina-produtos/Busca/${busca}`);
		} else {
			setShowSearchInput(!showSearchInput);
			setIsMenuOpen(false); 
		}
	};	

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
		setShowSearchInput(false); 
	};	

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleClickSearch();
        }
    };

    function validateAuthentication() {
        if (!validateAuth()) {
            return (
                <FaUserCircle
                    className={styles["usuario"]}
                    onClick={() => {
                        navigate("/login");
                    }}
                    />
            );
        } else {
            if (sessionStorage.getItem('CATEGORIA') === '1') {
                return <a href="/dashboard">
                    <h2 className={styles['helloUser']}>Olá, {sessionStorage.getItem('NOME').split(' ').at(0)}</h2>
                </a>;
            } else {
                return <h2 className={styles['helloUser']}>Olá, {sessionStorage.getItem('NOME').split(' ').at(0)}</h2>;
            }
        }
    }

    function logout() {
        sessionStorage.clear();
        validateAuthentication();
        window.location.reload();
    }

    return (
        <nav className={styles["navbar"]}>
            {!isSmallScreen && (
                <div className={styles["container-navbar"]}>
                    <img
                        src={logo}
                        alt="logo ichiban"
                        className={styles["img-logo"]}
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                    <div className={styles["containerPesquisaUser"]}>
                        <div className={styles["pesquisa"]}>
                            <input
                                type="text"
                                id="busca-produto"
                                value={busca}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Pesquisar..."
                            />
                            <FaSearch
                                className={styles["search"]}
                                onClick={handleClickSearch}
                            />
                        </div>
                        <h3 className={styles['pipe']}>|</h3>
                        <div className={styles["usuarioDiv"]}>
                            {validateAuthentication()}
                            <FaRegHeart
                                className={styles["favoritos"]}
                                onClick={() => {
                                    navigate("/favoritos");
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className={styles["navBarBaixo"]}>
				<input
					className={styles["menu-hamburguer"]}
					id="menu-hamburguer"
					type="checkbox"
					checked={isMenuOpen}
					onChange={handleMenuToggle}
				/>                
				<label className={styles['label-menu']} htmlFor="menu-hamburguer">
                    <div className={styles['menu']}>
                        <span className={styles['hamburguer']}></span>
                    </div>
                </label>
                <ul className={styles['menu-hamburguer-elements']}>
                    <li>Ofertas</li>
                    <div className={styles["separator"]}></div>
                    <li onClick={() => navigate("/pagina-produtos/Celulares/Celular")}>
                        Celulares
                    </li>
                    <div className={styles["separator"]}></div>
                    <li onClick={() => navigate("/pagina-produtos/Notebooks/Computador")}>
                        Notebooks
                    </li>
                    <div className={styles["separator"]}></div>
                    <li onClick={() => navigate("/pagina-produtos/Acessórios/Acessório")}>
                        Acessórios
                    </li>
                    {sessionStorage.TOKEN ?
                        <>
                            <div className={styles['separator']}></div>
                            <li onClick={logout}><CiLogout className={styles['logout']} /></li>
                        </>
                        : null
                    }
                </ul>
                <div className={styles["pesquisa-responsive"]}>
                    <FaSearch
                        className={styles["search-responsive"]}
                        onClick={handleClickSearch}
                    />
                    {showSearchInput && ( 
                        <ul className={styles['menu-hamburguer-elements']}>
                            <li className={styles["search-input-container"]}>
                                <input
                                    type="text"
                                    id="busca-produto"
                                    value={busca}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Pesquisar..."
                                    className={styles["input-responsive"]}
                                />
                            </li>
                        </ul>
                    )}
                    <img
                        src={logo}
                        alt="logo ichiban"
                        className={styles["img-logo"]}
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                    <div   className={`${styles["usuarioDiv"]} ${
							logado ? styles["usuarioLogado"] : styles["usuarioDeslogado"]
						}`}>
                        {validateAuthentication()}
                        <FaRegHeart
                            className={styles["favoritos"]}
                            onClick={() => {
                                navigate("/favoritos");
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};
