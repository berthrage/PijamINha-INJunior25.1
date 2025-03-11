import styles from './styles.module.css';
import Pajama from '../../types/Pajama';
import ImageLink from '../ImageLink';
import PriceRealFormatted from '../PriceRealFormatted';
import heartActive from '../../assets/icons/heart-active.png';
import heartActiveHovered from '../../assets/icons/heart-active-hovered.png';
import heartInactive from '../../assets/icons/heart-inactive.png';
import discountIcon from '../../assets/icons/discount.png';
import { useEffect, useRef, useState } from 'react';
import ImageLinkTransition from '../ImageLinkTransition';

interface ProductCardStandardProps {
    pajama: Pajama,
}

export default function ProductCardStandard({pajama}: ProductCardStandardProps) {
    const [ favorite, setFavorite ] = useState(pajama.favorite);
    const favoriteIconRef = useRef<HTMLDivElement>(null);

    // Preload Hearts
    useEffect(() => {
        const preloadImage = (src: string) => {
            const img = new Image();
            img.src = src;
        };

        preloadImage(heartActive);
        preloadImage(heartActiveHovered);
        preloadImage(heartInactive);
    }, []);

    const PricePart = () => (
        pajama.sale_percent ? (
            <>
                <div className={styles.pricePartBox}>
                    <PriceRealFormatted
                        className={styles.realPrice}
                        price={pajama.price}>
                    </PriceRealFormatted>
                    <PriceRealFormatted
                        className={styles.discountPrice}
                        price={pajama.price - (pajama.price * (pajama.sale_percent / 100))}>
                    </PriceRealFormatted>
                </div>
            </>
        ) : (
            <>
                <div className={styles.pricePartBox}>
                    <PriceRealFormatted 
                        className={styles.price} 
                        price={pajama.price}>
                    </PriceRealFormatted>
                </div>
            </>
        )
    );

    const toggleFavorite = () => {
       setFavorite(!favorite);
       pajama.favorite = !pajama.favorite;
       console.log(pajama);

       // Trigger animation
       if (favoriteIconRef.current) {
        favoriteIconRef.current.classList.add(styles.animate);
        setTimeout(() => {
            favoriteIconRef.current?.classList.remove(styles.animate);
        }, 150); 
    }
    }

    return (
        <>
            <div className={styles.productCard}>
                <div className={styles.imgSection}>
                    <ImageLink
                        img={pajama.image}
                        alt={pajama.name}
                        id={styles.productImg}
                        width={408}
                        height={642.13}>
                    </ImageLink>
                    <ImageLinkTransition
                        firstImg={favorite ? heartActive : heartInactive}
                        secondImg={favorite ? heartActive : heartActiveHovered}
                        transitionOnlyIn={favorite}
                        firstAlt="Favoritar"
                        secondAlt='Desfavoritar'
                        id={styles.favoriteIcon}
                        width={51}
                        height={55}
                        onClick={toggleFavorite}
                        ref={favoriteIconRef}>
                    </ImageLinkTransition>
                    {pajama.sale_percent ? (
                        <>
                            <ImageLink
                                img={discountIcon}
                                alt="Desconto"
                                id={styles.discountIcon}
                                width={80}
                                height={80}>
                            </ImageLink>
                        </>
                    ) : ('')}
                </div>
                

                <div className={styles.productInfo} style={pajama.sale_percent ?  {gap:`15px`} : {gap:`31px`}}>
                    <div className={styles.productInfoHeader}>
                        <h1>{pajama.name}</h1>
                    </div>

                    <div className={styles.priceSection}>

                        <PricePart></PricePart>

                        <div className={styles.installments}>
                            <span>6x de </span>
                            <PriceRealFormatted 
                                className={styles.installmentPrice}
                                price={
                                    pajama.sale_percent ? 
                                    (pajama.price - (pajama.price * (pajama.sale_percent / 100))) / 6 
                                    : pajama.price / 6}>
                            </PriceRealFormatted>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}