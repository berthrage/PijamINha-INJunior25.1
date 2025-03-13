import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../../components/Button';
import NumericStepper from '../../components/NumericStepper';
import imagem from '../../assets/pajamas/example.jpg';
import { IoMdClose } from "react-icons/io";

export default function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Nome do Pijama',
            reference: 'Referência',
            size: 'M',
            price: 50000,
            quantity: 12,
            image: imagem,
        },
        {
            id: 2,
            name: 'Pijama Infantil',
            reference: 'Ref-1234',
            size: 'P',
            price: 30000,
            quantity: 8,
            image: imagem,
        },
        {
            id: 3,
            name: 'Pijama Luxo',
            reference: 'Ref-5678',
            size: 'G',
            price: 70000,
            quantity: 5,
            image: imagem,
        }
    ]);

    const removeItemFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

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
                        <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                <Button id={styles.buttonCart}>Compre Tudo</Button>
            </div>
        </div>
    );
}
