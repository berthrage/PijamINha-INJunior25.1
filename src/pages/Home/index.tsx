import ImageLinkTransition from '../../components/ImageLinkTransition';
import styles from './styles.module.css';
import logoDark from '../../assets/images/logo-darkvariant.png';
import logoDark2 from '../../assets/images/logo-darkvariant2.png';
import featurePajama from '../../assets/images/feature-pajama.png';
import featurePeople from '../../assets/images/feature-people.png';
import featureDelivery from '../../assets/images/feature-delivery.png';
import ImageLink from '../../components/ImageLink';

export default function Home() {
    return(
        <>
            <section className={styles.homeSection}>

                <div className={styles.titleBox}>
                    <ImageLinkTransition
                        firstImg={logoDark}
                        secondImg={logoDark2}
                        width={346}
                        height={342.02}>
                    </ImageLinkTransition>
                    <div className={styles.sloganBox}>
                        <h1>Se os lobos soubessem desse conforto, nem sopravam casas, iam dormir!</h1>
                    </div>
                </div>

                <div className={styles.featuresSection}>

                    <ul className={styles.featuresList}>
                        <li>
                            <ImageLink 
                                img={featurePajama}
                                width={100}
                                height={100}>
                            </ImageLink>
                            <p>Pijamas confortáveis e com tecnologia</p>
                        </li>

                        <li>
                            <ImageLink 
                                img={featurePeople}
                                width={100}
                                height={100}>
                            </ImageLink>
                            <p>Modelos para todas as idades e tamanhos</p>
                        </li>

                        <li>
                            <ImageLink 
                                img={featureDelivery}
                                width={100}
                                height={100}>
                            </ImageLink>
                            <p>Frete grátis em todo o Brasil e exterior</p>
                        </li>
                    </ul>

                </div>


            </section>
        </>
    )
}