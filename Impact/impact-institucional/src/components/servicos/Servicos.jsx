import React from 'react';
import styles from './Servicos.module.css'
import servicosImg from '../../utils/assets/img/servicosImg.png'
import { Button } from 'primereact/button';
        
export const Servicos = () => {
    return (
        <div className={[styles['container']]}>
            <div className="texto">
                <h1 className={styles['titulo']}>Nossos Serviços</h1>
                <p className={styles['textoSobre']}>Desenvolvemos software personalizado, criamos aplicativos intuitivos para Android e iOS, oferecemos consultoria tecnológica estratégica, suporte contínuo e integração de sistemas, garantindo operações eficientes e soluções inovadoras.</p>
                <Button label="Saiba Mais" className={styles['botao']} rounded />
            </div>
            <img src={servicosImg} alt="celular na mão" />
        </div>
    );
}