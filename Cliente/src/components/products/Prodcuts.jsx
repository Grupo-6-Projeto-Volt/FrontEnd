import React from 'react';
import styles from './Products.module.css';

const MostAccessedProducts = ({ products }) => {
    return (
        <div className={styles['container']}>
            <ul className={styles['productList']}>
                {products.map((product, index) => (
                    <li key={index} className={styles['productItem']}>
                        <img src={product.image} alt={product.name} className={styles['productImage']} />
                        <div className={styles['productDetails']}>
                            <span className={styles['productName']}>{product.name}</span>
                            <span className={styles['productQuantity']}>Quantidade: {product.quantity}</span>
                            <span className={styles['productId']}>#{product.id}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostAccessedProducts;
