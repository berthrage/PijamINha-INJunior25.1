import Button from '../../components/Button'
import NumericStepper from '../../components/NumericStepper'
import styles from './styles.module.css'
import { FaHeart } from 'react-icons/fa'
import ImageLink from '../../components/ImageLink'
import inverno from '../../assets/icons/winter-grouped.png'
import unissex from '../../assets/icons/unisex-grouped.png'
import adulto from '../../assets/icons/foradults-both.png'
import { useParams } from 'react-router-dom'
import usePajamasStore from '../../stores/PajamasStore'
import { useEffect, useState } from 'react'
import Pajama from '../../types/Pajama'
import PriceRealFormatted from '../../components/PriceRealFormatted'

export default function SinglePajamaPage() {
    const { pajamaName } = useParams<{ pajamaName: string }>();
    const decodedPajamaName = decodeURIComponent(pajamaName || '');
    const { pajamas, fetchPajamas, errorCode } = usePajamasStore();
    const [ pajama, setPajama ] = useState<Pajama>();

    useEffect(() => {
        fetchPajamas();
    }, [fetchPajamas]);

    useEffect(() => {
        if (pajamas.length > 0) {
            const foundPajama = pajamas.find(pajama => pajama.name === decodedPajamaName);
            if (foundPajama) {
                setPajama(foundPajama);
            } 
        }
    }, [pajamas, decodedPajamaName]);

    return (
        <>
            <div className={styles.individualpajamaSection}>

                {pajamas.length === 0 ? (
                    <h1>{errorCode ? `Erro ${errorCode} ao carregar pijama` : 'Carregando pijamas...'}</h1>
                ) : pajama ? (
                    <>
                        <div className={styles.containerIndividualPajama}>

                            <img src={pajama.image} alt="" />
                            <div className={styles.containerInformation}>

                                <div className={styles.titleInformation}>
                                    <h1>{pajama.name}</h1>
                                    <p>Ref: #123456</p>
                                </div>

                                <div className={styles.priceInformation}>
                                    <div>
                                        <h3>{<PriceRealFormatted price={pajama.price}></PriceRealFormatted>}</h3>
                                        <p>Pix</p>
                                    </div>
                                    <p>Parcelamento</p>
                                </div>

                                <div className={styles.sizeInformation}>
                                    <p>Tamanhos:</p>
                                    <div className={styles.buttonInformation}>
                                        <button>PP</button><button>P</button><button>M</button><button>G</button><button>GG</button>
                                    </div>
                                    <span>Ainda temos 8 peças do tamanho escolhido em nosso estoque!</span>
                                </div>

                                <div className={styles.quantityInformation}>
                                    <p>Quantidade:</p>
                                    <NumericStepper
                                        quantity={30}></NumericStepper>
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
                                        img={inverno}
                                        width={70}
                                        height={70}>
                                    </ImageLink>
                                    <p>Inverno</p>
                                </li>

                                <li>
                                    <ImageLink
                                        img={unissex}
                                        width={70}
                                        height={70}>
                                    </ImageLink>
                                    <p>Unissex</p>
                                </li>

                                <li>
                                    <ImageLink
                                        img={adulto}
                                        width={70}
                                        height={70}>
                                    </ImageLink>
                                    <p>Adulto</p>
                                </li>
                            </ul>
                        </div>


                        <div className={styles.aboutSection}>
                            <div className={styles.titleaboutSection}>
                                <h1>SOBRE NOSSO PIJAMA</h1>
                                <p>{pajama.description}</p>
                            </div>
                            <div className={styles.informationaboutSection}>
                                <h4>Contém:</h4>
                                <ul><li>Uma blusa de mangas longas na cor azul petróleo com estampa poá branca</li><li>Uma calça na cor azul petróleo com estampa poá branca</li></ul>
                                <h4>Composição:</h4>
                                <ul><li>100% algodão</li></ul>
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