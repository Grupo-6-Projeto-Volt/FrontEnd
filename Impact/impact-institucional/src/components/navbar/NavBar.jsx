import React from 'react';
import styles from './NavBar.module.css';
import { Menubar } from 'primereact/menubar';

const items = [
    { label: 'Home' },
    { label: 'Serviços' },
    { label: 'Competências' },
    { label: 'Sobre' },
    { label: 'Nosso Time' }
];

const NavBar = () => {
    return(
    <div className={styles['card']}>
        <Menubar model={items} />
    </div>);
}

export default NavBar;
