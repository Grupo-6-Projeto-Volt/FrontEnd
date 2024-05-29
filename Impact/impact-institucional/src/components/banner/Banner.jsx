import React from 'react';
import styles from './Banner.module.css';
import bannerImg from '../../utils/assets/img/banner-institucional.png'
export const Banner = () => {
    return (
        <div className={[styles['divBanner'], 'z-1 absolute']}>
            <h1 className={styles['textoBanner']}>Bem-vindo, sua parceira em direção a um mundo mais sustentável e inclusivo.</h1>
            <img src={bannerImg} alt="banner impact" className={styles['banner']} />
        </div>
    );
}

export default Banner;