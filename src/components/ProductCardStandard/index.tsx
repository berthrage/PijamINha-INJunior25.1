import styles from './styles.module.css';
import Pajama from '../../types/Pajama';
import ImageLink from '../ImageLink';
import PriceRealFormatted from '../PriceRealFormatted';
import heartActive from '../../assets/icons/heart-active.png';
import heartInactive from '../../assets/icons/heart-inactive.png';
import discountIcon from '../../assets/icons/discount.png';
import { useState } from 'react';

interface ProductCardStandardProps {
    pajama: Pajama,
}

export default function ProductCardStandard({pajama}: ProductCardStandardProps) {
    const [ favorite, setFavorite ] = useState(pajama.favorite);

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
                    <ImageLink
                        img={favorite ? heartActive : heartInactive}
                        alt="Favoritar"
                        id={styles.favoriteIcon}
                        width={51}
                        height={55}
                        onClick={toggleFavorite}>
                    </ImageLink>
                    {pajama.sale_percent ? (
                        <>
                            <ImageLink
                                img={discountIcon}
                                alt="Desconto"
                                id={styles.discountIcon}
                                width={67}
                                height={67}>
                            </ImageLink>
                        </>
                    ) : ('')}
                </div>
                

                <div className={styles.productInfo}>
                    <div className={styles.productInfoHeader}>
                        <h1>{pajama.name}</h1>
                    </div>

                    <div className={styles.priceSection}>

                        <PricePart></PricePart>

                        <div className={styles.installments}>
                            <span>6x de </span>
                            <PriceRealFormatted 
                                className={styles.installmentPrice}
                                price={pajama.price / 6}>
                            </PriceRealFormatted>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}