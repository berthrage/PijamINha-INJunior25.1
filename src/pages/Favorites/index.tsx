import { useEffect } from 'react';
import usePajamasStore from '../../stores/PajamasStore';
import styles from './styles.module.css';
import ProductCardsCarousel from '../../components/ProductCardsCarousel';

export default function Favorites() {
    const { pajamas, fetchPajamas } = usePajamasStore();

    useEffect(() => {
        fetchPajamas();
    }, [fetchPajamas]);

    const favoritePajamas = pajamas.filter(pajama => pajama.favorite);

    return (
        <>
            <section className={styles.favoritesSection}>
                <div>
                    <ProductCardsCarousel pajamas={favoritePajamas}/>
                </div>
            </section>
        </>
    )
}