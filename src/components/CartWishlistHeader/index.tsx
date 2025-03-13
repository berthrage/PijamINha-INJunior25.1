import { useState } from 'react';
import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

export default function CartWishlistHeader() {
    const location = useLocation();
    const [isCartHovered, setIsCartHovered] = useState(false);
    const [isFavoritosHovered, setIsFavoritosHovered] = useState(false);

    return (
        <div className={styles.secondHeader}>
            <Link to='/cart'>
                <div 
                    className={styles.iconContainer}
                    onMouseEnter={() => setIsCartHovered(true)}
                    onMouseLeave={() => setIsCartHovered(false)}
                >
                    <div className={isCartHovered ? styles.hovered : styles.unhovered}>
                        <MdOutlineShoppingCart
                            className={location.pathname === '/cart' ? styles.active : ''} 
                            size={50}
                        />
                        <span className={location.pathname === '/cart' ? styles.active : ''}> 
                            Carrinho
                        </span>
                    </div>
                </div>
            </Link>
            <Link to='/wishlist'>
                <div 
                    className={styles.iconContainer}
                    onMouseEnter={() => setIsFavoritosHovered(true)}
                    onMouseLeave={() => setIsFavoritosHovered(false)}
                >
                    <div className={isFavoritosHovered ? styles.hovered : styles.unhovered}>
                        <FaHeart
                            className={location.pathname === '/wishlist' ? styles.active : ''} 
                            size={50}
                        />
                        <span className={location.pathname === '/wishlist' ? styles.active : ''}>
                            Favoritos
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}