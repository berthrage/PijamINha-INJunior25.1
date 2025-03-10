import styles from './styles.module.css';
import Pajama from '../../types/Pajama';
import ImageLink from '../ImageLink';
import PriceRealFormatted from '../PriceRealFormatted';

interface ProductCardStandardProps {
    pajama: Pajama,
}

export default function ProductCardStandard({pajama}: ProductCardStandardProps) {
    return (
        <>
            <div className={styles.productCard}>
                <ImageLink
                    img={pajama.image}
                    linkTo={`/`}
                    alt={pajama.name}
                    id={styles.productImg}
                    width={408}
                    height={642.13}>
                </ImageLink>

                <div className={styles.productInfo}>
                    <h3>{pajama.name}</h3>
                    <PriceRealFormatted className={styles.price} price={pajama.price}></PriceRealFormatted>
                </div>
            </div>
        </>
    )
}