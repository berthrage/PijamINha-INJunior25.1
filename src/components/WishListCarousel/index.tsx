import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import styles from './styles.module.css';
import arrowNext from '../../assets/icons/next.png';
import arrowNextHovered from '../../assets/icons/next-hovered.png';
import arrowPrev from '../../assets/icons/prev.png';
import arrowPrevHovered from '../../assets/icons/prev-hovered.png';
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import ImageLinkTransition from "../ImageLinkTransition";

export default function WishListCarousel({ children }) {
    return (
        <div className={styles.ratingCardsCarousel}>
            <ImageLinkTransition id={styles.swiperButtonPrev}
                firstImg={arrowPrev}
                secondImg={arrowPrevHovered}
                firstAlt="prev"
                secondAlt="prev-hovered">
            </ImageLinkTransition>
            <ImageLinkTransition id={styles.swiperButtonNext}
                firstImg={arrowNext}
                secondImg={arrowNextHovered}
                firstAlt="next"
                secondAlt="next-hovered">
            </ImageLinkTransition>
            <Swiper
                modules={[Navigation, EffectFade]}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                initialSlide={0}
                navigation={{
                    nextEl: `#${styles["swiperButtonNext"]}`,
                    prevEl: `#${styles["swiperButtonPrev"]}`,
                }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    945: { slidesPerView: 2 },
                    1413: { slidesPerView: 3 },
                }}
                className={styles.swiperContainer}
            >
                <SwiperSlide className={styles.swiperSlide}>
                    {children}
                </SwiperSlide>
            </Swiper>
        </div>
    );
}