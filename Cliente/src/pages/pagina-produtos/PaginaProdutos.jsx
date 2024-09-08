import React, { useEffect } from "react";
import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import styles from "./PaginaProdutos.module.css";
import Footer from "../../components/footer/Footer.jsx";
import CategoriaProdutos from "../../components/categoriaProdutos/CategoriaProdutos.jsx";

const PaginaProdutos = () => {
	return (
		<>
			<NavBarPadrao />
            <CategoriaProdutos></CategoriaProdutos>
			<Footer />
		</>
	)
}

export default PaginaProdutos;