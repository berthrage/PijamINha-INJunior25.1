import styles from './styles.module.css';
import WishListCarousel from '../../components/WishListCarousel';
import ProductCardStandard from '../../components/ProductCardStandard'; // Importe o componente ProductCardStandard
import imagetest from '../../assets/pajamas/example.jpg';

export default function WishList() {
    // Exemplo de produtos favoritados
    const favoriteProducts = [
        { id: 1, name: 'Produto 1', image: imagetest, favorite: true, price: 100, sale_percent: 10 },
        { id: 2, name: 'Produto 2', image: imagetest, favorite: true, price: 150, sale_percent: 0 },
        { id: 3, name: 'Produto 3', image: imagetest, favorite: true, price: 200, sale_percent: 20 },
        { id: 4, name: 'Produto 4', image: imagetest, favorite: true, price: 250, sale_percent: 0 },
    ];

    return (
        <>
            <div className={styles.wishlistSection}>
                <div id={styles.carouselSection}>
                    <WishListCarousel>
                        <div id={styles.productCardsSection}>
                            {favoriteProducts.map((product, index) => (
                                <ProductCardStandard
                                    key={product.id}
                                    pajama={product}
                                    fadeInTimeout={index * 150}
                                />
                            ))}
                        </div>
                    </WishListCarousel>
                </div>
            </div>
        </>
    );
}