import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePajamasStore from '../../stores/PajamasStore';
import useCartStore from '../../stores/CartStore'; 
import Pajama from '../../types/Pajama';
import PriceRealFormatted from '../../components/PriceRealFormatted';
import FavoriteButton from '../../components/FavoriteButton';
import Button from '../../components/Button';
import NumericStepper from '../../components/NumericStepper';
import styles from './styles.module.css';
import ImageLink from '../../components/ImageLink';
import inverno from '../../assets/icons/winter-grouped.png';
import verao from '../../assets/icons/summer-grouped.png';
import unissex from '../../assets/icons/unisex-grouped.png';
import feminino from '../../assets/icons/female-sign-grouped.png';
import masculino from '../../assets/icons/male-sign-grouped.png';
import adulto from '../../assets/icons/foradults-grouped.png';
import infantil from '../../assets/icons/forkids-grouped.png';
import familia from '../../assets/icons/family-grouped.png';

export default function SinglePajamaPage() {
    const [isVisible, setIsVisible] = useState(false);
    const { pajamaName } = useParams<{ pajamaName: string }>();
    const decodedPajamaName = decodeURIComponent(pajamaName || '');
    const { pajamas, fetchPajamas, errorCode } = usePajamasStore();
    const [pajama, setPajama] = useState<Pajama>();
    const scrollRef = useRef<HTMLDivElement>(null);
    const pajamaContainerRef = useRef<HTMLDivElement>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore(); // Use o hook do carrinho

    useEffect(() => {
        fetchPajamas();
    }, [fetchPajamas]);

    // Observer para o efeito de fade-in
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 50);
                    observer.disconnect();
                }
            }, { threshold: 0.1 }
        );

        if (pajamaContainerRef.current) {
            observer.observe(pajamaContainerRef.current);
        }
        return () => observer.disconnect();
    }, [pajama]);

    useEffect(() => {
        if (pajamas.length > 0) {
            const foundPajama = pajamas.find(pajama => pajama.name === decodedPajamaName);
            if (foundPajama) {
                setPajama(foundPajama);
            }
        }
    }, [pajamas, decodedPajamaName]);

    // Scroll para a altura do containerIndividualPajama ao carregar
    useLayoutEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => {
                if (scrollRef.current) {
                    window.scrollTo(0, scrollRef.current.offsetTop - 50 || 0);
                }
            }, 0);
        }
    }, [pajama]);

    const [selectedSize, setSelectedSize] = useState<string | number>(pajama?.sizes[0]?.size || '');

    useEffect(() => {
        if (pajama && pajama.sizes.length > 0) {
            setSelectedSize(pajama.sizes[0].size);
        }
    }, [pajama]);

    const [selectedSizeStockQtt, setSelectedSizeStockQtt] = useState<number>(pajama?.sizes.find((size) => size.size === selectedSize)?.stock_quantity || 0);

    useEffect(() => {
        setSelectedSizeStockQtt(pajama?.sizes.find((size) => size.size === selectedSize)?.stock_quantity || 0);
    }, [selectedSize, pajama]);

    // Função de callback para atualizar a quantidade
    const updateQuantity = (newQuantity: number) => {
        console.log("Quantidade atualizada:", newQuantity);
        setQuantity(newQuantity);
    };

    // Função para lidar com mudança de tamanho
    const handleSizeChange = (size: string | number) => {
        if (size !== selectedSize) {
            setSelectedSize(size);
            setQuantity(1); // Reset da quantidade para 1 quando muda o tamanho
            console.log(`Tamanho alterado para ${size}, quantidade resetada para 1`);
        }
    };

    // Função para adicionar o pijama ao carrinho
    const handleAddToCart = () => {
        if (pajama) {
            const cartProduct: Pajama = {
                ...pajama,
                sizes: pajama.sizes.filter(size => size.size === selectedSize), // Filtra apenas o tamanho selecionado
            };
            addToCart(cartProduct); // Adiciona ao carrinho
            alert(`${pajama.name} (Tamanho: ${selectedSize}) foi adicionado ao carrinho!`);
        }
    };

    const genderImage = () => {
        if (pajama?.gender === 'Unissex' || pajama?.gender === 'Infantil' || pajama?.gender === 'Família') {
            return unissex;
        } else if (pajama?.gender === 'Feminino') {
            return feminino;
        } else if (pajama?.gender === 'Masculino') {
            return masculino;
        }
        return '';
    };

    const forAdultsKidsImage = () => {
        if (pajama?.gender === 'Infantil') {
            return infantil;
        } else if (pajama?.gender === 'Família') {
            return familia;
        }
        return adulto;
    };

    const seasonImage = () => {
        if (pajama?.season === 'Inverno' || pajama?.season === 'Outono') {
            return inverno;
        }
        return verao;
    };

    // Função para calcular o valor da parcela
    const calculateInstallment = (price: number, installments: number = 6): string => {
        const installmentValue = price / installments;
        return installmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Função para calcular o preço com desconto PIX
    const calculatePixPrice = (price: number): string => {
        const pixPrice = price * 0.85; // Aplica 15% de desconto
        return pixPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Calcula o preço final (com desconto, se houver)
    const finalPrice = pajama?.sale_percent && pajama.sale_percent > 0
        ? pajama.price - (pajama.price * (pajama.sale_percent / 100))
        : pajama?.price || 0;

    return (
        <>
            <div className={styles.singlePajamaSection}>
                {pajamas.length === 0 ? (
                    <h1>{errorCode ? `Erro ${errorCode} ao carregar pijama` : 'Carregando pijamas...'}</h1>
                ) : pajama ? (
                    <>
                        <div className={`${styles.pajamaContainer} ${isVisible ? styles.fadeIn : ""}`} ref={pajamaContainerRef}>
                            <div className={styles.pajamaMainSection}>
                                <ImageLink
                                    img={pajama.image}
                                    width={550}
                                    id={styles.pajamaImage}
                                />
                                <div className={styles.containerInformation}>
                                    <div className={styles.titleInformation}>
                                        <h1>{pajama.name}</h1>
                                        <p>Ref: #{pajama.id}</p>
                                    </div>
                                    <div className={styles.priceInformation} ref={scrollRef}>
                                        <div className={styles.descountsectionInformation}>
                                            {pajama.sale_percent && pajama.sale_percent > 0 ? (
                                                <>
                                                    <p className={styles.descountInformation}>- {pajama.sale_percent}%</p>
                                                    <span className={styles.originalPrice}>
                                                        <strong id={styles.originalPriceLabel}>De:</strong>
                                                        <span className={styles.strikethrough}>
                                                            <PriceRealFormatted price={pajama.price} />
                                                        </span>
                                                    </span>
                                                    <h3>
                                                        <PriceRealFormatted price={finalPrice} />
                                                    </h3>
                                                </>
                                            ) : (
                                                <h3>
                                                    <PriceRealFormatted price={pajama.price} />
                                                </h3>
                                            )}
                                            <p>Ou por apenas <strong>{calculatePixPrice(finalPrice)}</strong> no PIX!</p>
                                        </div>
                                        <p>
                                            Parcele em até <strong>6x</strong> de <strong>{calculateInstallment(finalPrice)}</strong>
                                        </p>
                                    </div>
                                    <div className={styles.sizeInformation}>
                                        <p>Tamanhos:</p>
                                        <div className={styles.buttonInformation}>
                                            {pajama?.sizes?.length > 0 && pajama.sizes.every(size => size.stock_quantity === 0) ? (
                                                <strong>Estoque indisponível.</strong>
                                            ) : (
                                                pajama?.sizes?.map(size => {
                                                    const isOutOfStock = size.stock_quantity === 0;
                                                    return (
                                                        <button
                                                            key={size.size}
                                                            type="button"
                                                            onClick={() => {
                                                                if (!isOutOfStock) {
                                                                    handleSizeChange(size.size);
                                                                }
                                                            }}
                                                            className={`
                                                                ${size.size === selectedSize ? styles.sizeButtonActive : styles.sizeButtonInactive}
                                                                ${isOutOfStock ? styles.sizeButtonOutOfStock : ''}
                                                            `}
                                                            disabled={isOutOfStock}
                                                        >
                                                            {size.size}
                                                        </button>
                                                    );
                                                })
                                            )}
                                        </div>
                                        {selectedSizeStockQtt > 0 && (
                                            <span>
                                                Ainda temos <span>{selectedSizeStockQtt} peças</span> do tamanho escolhido em nosso estoque!
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.quantityInformation}>
                                        <p>Quantidade:</p>
                                        {selectedSizeStockQtt > 0 && (
                                            <NumericStepper
                                                quantity={quantity}
                                                onQuantityChange={updateQuantity}
                                                maxQuantity={selectedSizeStockQtt}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.addcartandwishlistInformation}>
                                        <Button id={styles.buttonIndividualPajama} onClick={handleAddToCart}>
                                            Adicionar ao Carrinho
                                        </Button>
                                        <FavoriteButton
                                            pajama={pajama}
                                            id={styles.favoriteIcon}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.featuresSection}>
                                <ul className={styles.featuresList}>
                                    <li>
                                        <ImageLink
                                            img={seasonImage()}
                                            naturalDimensions={true}
                                            id={styles.featureIcon}
                                        />
                                    </li>
                                    <li>
                                        <ImageLink
                                            img={genderImage()}
                                            naturalDimensions={true}
                                            id={styles.featureIcon}
                                        />
                                    </li>
                                    <li>
                                        <ImageLink
                                            img={forAdultsKidsImage()}
                                            id={styles.featureIcon}
                                            naturalDimensions={true}
                                            occupyFullWidth={true}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.aboutSection}>
                            <div className={styles.titleaboutSection}>
                                <h1>SOBRE NOSSO PIJAMA</h1>
                                <p>{pajama.description}</p>
                                <div className={styles.informationaboutSection}>
                                    <h4>Contém:</h4>
                                    <ul>
                                        <li>Uma blusa de mangas longas na cor azul petróleo com estampa poá branca</li>
                                        <li>Uma calça na cor azul petróleo com estampa poá branca</li>
                                    </ul>
                                    <h4>Composição:</h4>
                                    <ul>
                                        <li>100% algodão</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <h1>404 Pijama não encontrado</h1>
                )}
            </div>
        </>
    );
}