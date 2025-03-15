import ImageLinkTransition from '../../components/ImageLinkTransition';
import styles from './styles.module.css';
import logoDark from '../../assets/images/logo-darkvariant.png';
import logoDark2 from '../../assets/images/logo-darkvariant2.png';
import featurePajama from '../../assets/images/feature-pajama.png';
import featurePeople from '../../assets/images/feature-people.png';
import featureDelivery from '../../assets/images/feature-delivery.png';
import ImageLink from '../../components/ImageLink';
import Pajama from '../../types/Pajama';
import ProductCardStandard from '../../components/ProductCardStandard';
import SecondaryButton from '../../components/SecondaryButton';
import RatingCardsCarousel from '../../components/RatingCardsCarousel';
import HomeCarousel from '../../components/HomeCarousel';
import usePajamasStore from '../../stores/PajamasStore';
import { useEffect } from 'react';
import useFeedbacksStore from '../../stores/FeedbacksStore';

export default function Home() {
    const { pajamas, fetchPajamas } = usePajamasStore();
    const { feedbacks, fetchFeedbacks } = useFeedbacksStore();

    useEffect(() => {
            fetchPajamas();
    }, [fetchPajamas]);

    useEffect(() => {
        fetchFeedbacks();
        console.log(feedbacks);
}, [fetchFeedbacks]);
    

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

                <div className={styles.carouselSection}>
                    <HomeCarousel></HomeCarousel>
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

                <div className={styles.salesSection}>
                    <h1>Nossas últimas promoções!</h1>
                    <div className={styles.productCardsSection}>
                        {pajamas.filter(pajama => pajama.sale_percent).slice(0, 3).map((pajama: Pajama) => (
                            <ProductCardStandard pajama={pajama} key={pajama.id}></ProductCardStandard>
                        ))}
                    </div>
                </div>

                <div className={styles.feedbacksSection}>
                    <h1>Feedbacks</h1>
                    <div className={styles.ratingsSection}>
                        <RatingCardsCarousel feedbacks={feedbacks}></RatingCardsCarousel>
                        
                        <SecondaryButton
                            linkTo='/feedback'
                            className={styles.feedbackButton}>
                                Também quero dar um feedback!
                        </SecondaryButton>
                        
                    </div>
                    
                </div>


            </section>
        </>
    )
}