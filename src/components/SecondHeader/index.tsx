import React, { useState } from 'react'; // Importe o useState
import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';
import activecart from '../../assets/icons/cart-black.png';
import inactivecart from '../../assets/icons/cart-variant1.png';
import activefavoritos from '../../assets/icons/heart-active.png';
import inactivefavoritos from '../../assets/icons/heart-inactive.png';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";


export default function SecondHeader() {
    const location = useLocation();
    const [isCartHovered, setIsCartHovered] = useState(false);
    const [isFavoritosHovered, setIsFavoritosHovered] = useState(false);

    return (
        <div className={styles.secondHeader}>
            <Link to='/carrinho'>
                <div 
                    className={styles.iconContainer}
                    onMouseEnter={() => setIsCartHovered(true)}
                    onMouseLeave={() => setIsCartHovered(false)}
                >
                    <div className={isCartHovered ? styles.hovered : styles.unhovered}>
                        <MdOutlineShoppingCart
                            id={location.pathname === '/carrinho' ? styles.active : styles.inactive}
                            size={50}
                        />
                        <span>
                            Carrinho
                        </span>
                    </div>
                </div>
            </Link>
            <Link to='/favoritos'>
                <div 
                    className={styles.iconContainer}
                    onMouseEnter={() => setIsFavoritosHovered(true)}
                    onMouseLeave={() => setIsFavoritosHovered(false)}
                >
                    <div className={isFavoritosHovered ? styles.hovered : styles.unhovered}>
                    <FaHeart
                            id={location.pathname === '/favoritos' ? styles.active : styles.inactive}
                            size={50}
                        />
                        <span className={location.pathname === '/favoritos' ? styles.active : styles.inactive}>
                            Favoritos
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}