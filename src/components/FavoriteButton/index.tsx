import React, { useRef, useEffect } from 'react';
import styles from './styles.module.css';
import heartActive from '../../assets/icons/heart-active.png';
import heartActiveHovered from '../../assets/icons/heart-active-hovered.png';
import heartInactive from '../../assets/icons/heart-inactive.png';
import ImageLinkTransition from '../ImageLinkTransition';

interface FavoriteButtonProps {
    favorite: boolean;
    id?: string;
    onToggleFavorite?: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ favorite, onToggleFavorite, id }) => {
    const favoriteIconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const preloadImage = (src: string) => {
            const img = new Image();
            img.src = src;
        };

        preloadImage(heartActive);
        preloadImage(heartActiveHovered);
        preloadImage(heartInactive);
    }, []);

    const handleClick = () => {
        if (onToggleFavorite) {
            onToggleFavorite();
        }

        // Trigger heart animation
        if (favoriteIconRef.current) {
            favoriteIconRef.current.classList.add(styles.animate);
            setTimeout(() => {
                favoriteIconRef.current?.classList.remove(styles.animate);
            }, 150);
        }
    };

    return (
        <ImageLinkTransition
            firstImg={favorite ? heartActive : heartInactive}
            secondImg={favorite ? heartActive : heartActiveHovered}
            transitionOnlyIn={favorite}
            firstAlt="Favoritar"
            secondAlt="Desfavoritar"
            id={id}
            width={51}
            height={55}
            onClick={handleClick}
            ref={favoriteIconRef}
            style={{ cursor: 'pointer', transition: '0.15s ease-in-out' }}
        />
    );
};

export default FavoriteButton;