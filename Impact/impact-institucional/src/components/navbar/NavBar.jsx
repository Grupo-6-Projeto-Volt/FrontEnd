import React from 'react';
import styles from './NavBar.module.css';
import { Menubar } from 'primereact/menubar';
import logo from '../../utils/assets/img/logo.png'
import { Button } from 'primereact/button';

const items = [
    { label: 'Home' },
    { label: 'Serviços' },
    { label: 'Competências' },
    { label: 'Sobre' },
    { label: 'Nosso Time' }
];

const logoNav = <img src={logo} alt="logo-impact" className={styles['logo']} />;
const contato =  <Button label="Contate-nos" className="p-button-rounded" />
const NavBar = () => {
    return(
    <div className={styles['card']}>
        <Menubar className={styles['menu']} start={logoNav} model={items} end={contato}>
        </Menubar>
    </div>);
}

export default NavBar;
