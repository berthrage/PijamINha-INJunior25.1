import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../../components/Button';
import NumericStepper from '../../components/NumericStepper';
import imagem from '../../assets/pajamas/example.jpg';
import { IoMdClose } from "react-icons/io";

export default function Cart() {
    // Estado para armazenar os itens no carrinho
    const [cartItems, setCartItems] = useState([
        {
            id: 1, // ID único para cada item
            name: 'Nome do Pijama',
            reference: 'Referência',
            size: 'M',
            price: 0,
            quantity: 12,
            image: imagem
        }
        // Adicione mais itens aqui se necessário
    ]);

    // Função para remover um item do carrinho
    const removeItemFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    return (
        <div className={styles.cartSection}>
            {cartItems.map(item => (
                <div key={item.id} className={styles.containerCart}>
                    <img src={item.image} alt="" />
                    <div className={styles.interncontainerCart}>
                        <div className={styles.titleCart}>
                            <div>
                                <h1>{item.name}</h1>
                                <p>{item.reference}</p>
                            </div>
                            <div className={styles.sizeCart}>
                                <button>{item.size}</button>
                            </div>
                        </div>
                        <div className={styles.containerquantityCart}>
                            <p>Quantidade:</p>
                            <NumericStepper />
                            <span>Não perca sua oportunidade!</span>
                            <span>Há apenas mais <span>{item.quantity}</span> peças disponíveis</span>
                        </div>
                    </div>
                    <div className={styles.productpriceCart}>
                        <p>R$ {item.price}</p>
                    </div>
                    <div className={styles.icon} onClick={() => removeItemFromCart(item.id)}>
                        <IoMdClose size={50} />
                    </div>
                </div>
            ))}
            <div className={styles.buySection}>
                <div className={styles.totalCart}>
                    <p>Total</p>
                    <div>
                        <span>R$ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                    </div>
                </div>
                <Button id={styles.buttonCart}>Compre Tudo</Button>
            </div>
        </div>
    );
}