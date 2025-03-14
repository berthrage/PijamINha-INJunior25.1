import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.css';
import heartActive from '../../assets/icons/heart-active.png';
import heartActiveHovered from '../../assets/icons/heart-active-hovered.png';
import heartInactive from '../../assets/icons/heart-inactive.png';
import ImageLinkTransition from '../ImageLinkTransition';
import Pajama from '../../types/Pajama';
import usePajamasStore from '../../stores/PajamasStore';

interface FavoriteButtonProps {
    pajama: Pajama,
    id?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ pajama, id }) => {
    const favoriteIconRef = useRef<HTMLDivElement>(null);
    const [favoriteState, setFavoriteState] = useState(pajama.favorite);
    const { setFavorite } = usePajamasStore();

    useEffect(() => {
        const preloadImage = (src: string) => {
            const img = new Image();
            img.src = src;
        };

        preloadImage(heartActive);
        preloadImage(heartActiveHovered);
        preloadImage(heartInactive);
    }, []);

    const toggleFavorite = () => {
        setFavoriteState(!favoriteState);
        if (pajama) {
            setFavorite(pajama.id, !favoriteState); // PUT Request to API
        } 
        console.log(pajama);
    };

    const handleClick = () => {
        toggleFavorite();

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
            firstImg={pajama.favorite ? heartActive : heartInactive}
            secondImg={pajama.favorite ? heartActive : heartActiveHovered}
            transitionOnlyIn={pajama.favorite}
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