import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';
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
                            className={location.pathname === '/carrinho' ? styles.active : ''} // Aplica a classe active
                            size={50}
                        />
                        <span className={location.pathname === '/carrinho' ? styles.active : ''}> {/* Aplica a classe active */}
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
                            className={location.pathname === '/favoritos' ? styles.active : ''} 
                            size={50}
                        />
                        <span className={location.pathname === '/favoritos' ? styles.active : ''}>
                            Favoritos
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}