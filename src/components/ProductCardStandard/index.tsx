import styles from './styles.module.css';
import Pajama from '../../types/Pajama';
import ImageLink from '../ImageLink';
import PriceRealFormatted from '../PriceRealFormatted';
import discountIcon from '../../assets/icons/discount.png';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';
import usePajamasStore from '../../stores/PajamasStore';

interface ProductCardStandardProps {
    pajama: Pajama,
    fadeInTimeout?: number,
    fadeInThreshold?: number
    itemsPerRow?: number,
    id?: string,
    scale?: number,
    linkTo?: string,
}

export default function ProductCardStandard({ pajama, fadeInTimeout, fadeInThreshold, itemsPerRow, id, scale, linkTo }: ProductCardStandardProps) {
    const [favoriteState, setFavoriteState] = useState(pajama.favorite);
    const { fetchPajamas, setFavorite } = usePajamasStore();
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const PricePart = () => (
        pajama.sale_percent ? (
            <div className={styles.pricePartBox}>
                <PriceRealFormatted
                    className={styles.realPrice}
                    price={pajama.price}
                />
                <PriceRealFormatted
                    className={styles.discountPrice}
                    price={pajama.price - (pajama.price * (pajama.sale_percent / 100))}
                />
            </div>
        ) : (
            <div className={styles.pricePartBox}>
                <PriceRealFormatted
                    className={styles.price}
                    price={pajama.price}
                />
            </div>
        )
    );

    // Observer for Fade-in Effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, fadeInTimeout ? fadeInTimeout : 0);
                    observer.disconnect();
                }
            }, { threshold: fadeInThreshold ? fadeInThreshold : 0.1 } // Trigger when 10% of the card is visible
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        return () => observer.disconnect();
    }, [fadeInTimeout, itemsPerRow]);

    const toggleFavorite = () => {
        setFavoriteState(!favoriteState);
        if (pajama) {
            setFavorite(pajama.id, !favoriteState);
        } 
        console.log(pajama);
    };

    return (
        <div
            className={`${styles.productCard} ${isVisible ? styles.fadeIn : ""}`}
            id={id}
            ref={cardRef}
            style={{ transform: `scale(${scale ? scale : 1})` }}
        >
            <FavoriteButton 
                favorite={favoriteState} 
                onToggleFavorite={toggleFavorite} 
                id={styles.favoriteIcon}>
            </FavoriteButton>

            <Link to={linkTo || '#'}>
                <div className={styles.imgSection}>
                    <ImageLink
                        img={pajama.image}
                        alt={pajama.name}
                        id={styles.productImg}
                        width={408}
                        height={642.13}
                    />
                    {pajama.sale_percent && (
                        <ImageLink
                            img={discountIcon}
                            alt="Desconto"
                            id={styles.discountIcon}
                            width={80}
                            height={80}
                        />
                    )}
                </div>

                <div className={styles.productInfo} style={pajama.sale_percent ? { gap: `15px` } : { gap: `31px` }}>
                    <div className={styles.productInfoHeader}>
                        <h1
                            style={pajama.name.length > 38 ? { fontSize: `1.3rem` } : { fontSize: `1.5rem` }}
                        >
                            {pajama.name}
                        </h1>
                    </div>

                    <div className={styles.priceSection}>
                        <PricePart />
                        <div className={styles.installments}>
                            <span>6x de </span>
                            <PriceRealFormatted
                                className={styles.installmentPrice}
                                price={
                                    pajama.sale_percent ?
                                        (pajama.price - (pajama.price * (pajama.sale_percent / 100))) / 6
                                        : pajama.price / 6
                                }
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}