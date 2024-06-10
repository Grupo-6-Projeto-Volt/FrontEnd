import React from 'react';
import { useEffect } from 'react';
import styles from './Products.module.css';
import { listarProdutosMaisAcessados } from '../../model/DashDadosgraficos';

export function ProductsData(){

    useEffect(() => {
        async function obterProdutosAcessadas(){
          try {
            let resposta = await listarProdutosMaisAcessados();
            ProdutosMaisAcessados(resposta)
          } catch (e) {
            console.log(e);
          }
        }
        obterProdutosAcessadas()    
      }, []);

      function ProdutosMaisAcessados (products){
        console.log(products)
        return (
            <div className={styles['container']}>
                <ul className={styles['productList']}>
                    {products.map((product, index) => (
                        <li key={index} className={styles['productItem']}>
                            <img src={product.url} alt={product.nome} className={styles['productImage']} />
                            <div className={styles['productDetails']}>
                                <span className={styles['productName']}>{product.nome}</span>
                                <span className={styles['productQuantity']}>Quantidade: {product.quantidade}</span>
                                <span className={styles['productId']}>#{product.id}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

}



