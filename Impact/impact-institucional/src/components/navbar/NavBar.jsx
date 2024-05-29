import React from 'react';
import styles from './NavBar.module.css';
import { Menubar } from 'primereact/menubar';
import logo from '../../utils/assets/img/logo.png'
import { Button } from 'primereact/button';

const items = [
    {
        label: 'Home',
        className: 'ml-8'
    },
    {
        label: 'Serviços',
        className: 'ml-5'
    },
    {
        label: 'Competências',
        className: 'ml-5'
    },
    {
        label: 'Sobre',
        className: 'ml-5'
    },
    {
        label: 'Nosso Time',
        className: 'ml-5'
    }
];

const logoNav = <img src={logo} alt="logo-impact" className={styles['logo']} />;
const contato = <Button label="Contate-nos" className="p-button-rounded font-light bg-orange-400 border-none" />
const NavBar = () => {
    return (
        <div className={styles['card']}>
            <Menubar className={[styles['menu'], 'z-2 absolute']} start={logoNav} model={items} end={contato}>
            </Menubar>
        </div>);
}

export default NavBar;
