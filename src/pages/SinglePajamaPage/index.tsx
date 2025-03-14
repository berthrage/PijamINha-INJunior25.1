import Button from '../../components/Button'
import NumericStepper from '../../components/NumericStepper'
import styles from './styles.module.css'
import { FaHeart } from 'react-icons/fa'
import ImageLink from '../../components/ImageLink'
import inverno from '../../assets/icons/winter-grouped.png'
import verao from '../../assets/icons/summer-grouped.png'
import unissex from '../../assets/icons/unisex-grouped.png'
import feminino from '../../assets/icons/female-sign-grouped.png';
import masculino from '../../assets/icons/male-sign-grouped.png';
import adulto from '../../assets/icons/foradults-grouped.png'
import infantil from '../../assets/icons/forkids-grouped.png'
import familia from '../../assets/icons/family-grouped.png'
import { useParams } from 'react-router-dom'
import usePajamasStore from '../../stores/PajamasStore'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Pajama from '../../types/Pajama'
import PriceRealFormatted from '../../components/PriceRealFormatted'
// import useMediaQuery from '../../hooks/useMediaQueries'

export default function SinglePajamaPage() {
    // const isWideEnough = useMediaQuery('(min-width: 440px)');
    const [isVisible, setIsVisible] = useState(false);
    const { pajamaName } = useParams<{ pajamaName: string }>();
    const decodedPajamaName = decodeURIComponent(pajamaName || '');
    const { pajamas, fetchPajamas, errorCode } = usePajamasStore();
    const [ pajama, setPajama ] = useState<Pajama>();
    const scrollRef = useRef<HTMLDivElement>(null);
    const pajamaContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchPajamas();
    }, [fetchPajamas]);

    // Observer for Fade-in Effect
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

    // Scroll to the height of the containerIndividualPajama div on load
    useLayoutEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => {
                if (scrollRef.current) {
                    window.scrollTo(0, scrollRef.current.offsetTop - 50 || 0);
                }
            }, 0);
        }
    }, [pajama]);

    const [ selectedSize, setSelectedSize ] = useState<string | number>(pajama?.sizes[0]?.size || '');
    const allSizesHaveStock = pajama?.sizes.every(size => size.stock_quantity > 0);

    useEffect(() => {
        if (pajama && pajama.sizes.length > 0) {
            setSelectedSize(pajama.sizes[0].size);
        }
    } , [pajama]);

    const [ selectedSizeStock, setSelectedSizeStock ] = useState<number>(pajama?.sizes.find((size) => size.size === selectedSize)?.stock_quantity || 0);

    useEffect(() => {
        setSelectedSizeStock(pajama?.sizes.find((size) => size.size === selectedSize)?.stock_quantity || 0);
    } , [selectedSize, pajama]);

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
    }

    const seasonImage = () => {
        if (pajama?.season === 'Inverno' || pajama?.season === 'Outono') {
            return inverno;
        }
        return verao;
    }

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
                                    id={styles.pajamaImage}>
                                </ImageLink>

                                <div className={styles.containerInformation}>

                                    <div className={styles.titleInformation}>
                                        <h1>{pajama.name}</h1>
                                        <p>Ref: #123456</p>
                                    </div>

                                    <div className={styles.priceInformation} ref={scrollRef}>
                                        <div>
                                            <h3>{<PriceRealFormatted price={pajama.price}></PriceRealFormatted>}</h3>
                                            <p>Pix</p>
                                        </div>
                                        <p>Parcelamento</p>
                                    </div>

                                    <div className={styles.sizeInformation}>
                                        <p>Tamanhos:</p>
                                        <div className={styles.buttonInformation}>
                                            {pajama.sizes.length > 0 && allSizesHaveStock ? pajama.sizes.map(size => (
                                                <button
                                                    key={size.size}
                                                    onClick={() => {
                                                        setSelectedSize(size.size);
                                                        console.log(size.size);
                                                    }}
                                                    className={size.size === selectedSize ? styles.sizeButtonActive :
                                                        styles.sizeButtonInactive
                                                    }>
                                                    {size.size}
                                                </button>
                                            )) : (
                                                <p>Estoque indisponível.</p>
                                            )}
                                        </div>
                                        <span>
                                            {pajama.sizes.find((size) => size.size === selectedSize)?.stock_quantity === 0 || selectedSize === '' ? 'Estoque esgotado!' : (<>
                                                Ainda temos {selectedSizeStock} peças do tamanho escolhido em nosso estoque!
                                            </>)}
                                        </span>
                                    </div>

                                    <div className={styles.quantityInformation}>
                                        <p>Quantidade:</p>
                                        <NumericStepper
                                            quantity={1}></NumericStepper>
                                    </div>

                                    <div className={styles.addcartandwishlistInformation}>
                                        <Button id={styles.buttonIndividualPajama}>Adicionar ao Carrinho</Button>
                                        <FaHeart className={styles.iconactive} size={86}></FaHeart>
                                    </div>

                                </div>
                            </div>

                            <div className={styles.featuresSection}>
                                <ul className={styles.featuresList}>
                                    <li>
                                        <ImageLink
                                            img={seasonImage()}
                                            width={70}
                                            height={70}
                                            id={styles.featureImage}>
                                        </ImageLink>
                                    </li>

                                    <li>
                                        <ImageLink
                                            img={genderImage()}
                                            width={70}
                                            height={70}
                                            id={styles.featureImage}>
                                        </ImageLink>
                                    </li>

                                    <li>
                                        <ImageLink
                                            img={forAdultsKidsImage()}
                                            width={70}
                                            height={70}
                                            id={styles.featureImage}>
                                        </ImageLink>
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
                                    <ul><li>Uma blusa de mangas longas na cor azul petróleo com estampa poá branca</li><li>Uma calça na cor azul petróleo com estampa poá branca</li></ul>
                                    <h4>Composição:</h4>
                                    <ul><li>100% algodão</li></ul>
                                </div>
                            </div>

                        </div>
                    </>
                ) : (
                    <h1>404 Livro não encontrado</h1>
                )}
            </div>
        </>
    )
}