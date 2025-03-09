import ImageLinkTransition from '../../components/ImageLinkTransition';
import styles from './styles.module.css';
import logoDark from '../../assets/images/logo-darkvariant.png';
import logoDark2 from '../../assets/images/logo-darkvariant2.png';

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


            </section>
        </>
    )
}