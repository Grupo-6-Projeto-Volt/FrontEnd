import styles from './Sobre.module.css'
import React from "react";
import imgWhats from "../../utils/assets/icon/01_Glyph/01_Digital/02_SVG/Green/Digital_Glyph_Green.svg"
export const Sobre = () => {
    return (
        <div className={styles["container"]}>
            <div className={styles["texto"]}>
                <h1>Sobre Nós</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                <p>Standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
                <p>Rua do Balacobaco n°3
                    <br />Liberdade</p>
                <div className={styles['contato-div']}>
                    <button className={styles['contato-btn']}>Entre em contato conosco</button><img className={styles['img-whats']} alt="Imagem Whatsapp" src={imgWhats} />
                </div>
            </div>
            <iframe title='mapa' className={styles['mapa']} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.3477438524615!2d-46.638157289333954!3d-23.555951061304636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce597e7d05e211%3A0x5010639e25ff1aea!2sIchiban%20Cell!5e0!3m2!1spt-BR!2sbr!4v1723244904851!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

