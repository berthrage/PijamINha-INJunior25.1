import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import styles from './styles.module.css';
import arrowNext from '../../assets/icons/next.png';
import arrowNextHovered from '../../assets/icons/next-hovered.png';
import arrowPrev from '../../assets/icons/prev.png';
import arrowPrevHovered from '../../assets/icons/prev-hovered.png';
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import ImageLinkTransition from "../ImageLinkTransition";
import Pajama from "../../types/Pajama";
import ProductCardStandard from "../ProductCardStandard";

interface ProductCardsCarouselProps {
    pajamas: Pajama[];
}

export default function ProductCardsCarousel({ pajamas }: ProductCardsCarouselProps) {
    const cardScale = 0.6;

    return (
        <div className={styles.productCardsCarousel}>
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
                modules={[Navigation]} // Enable navigation
                spaceBetween={70} // Space between slides
                slidesPerView={1} // Default slides per view
                initialSlide={0}
                navigation={{
                    nextEl: `#${styles["swiperButtonNext"]}`,
                    prevEl: `#${styles["swiperButtonPrev"]}`,
                }} // Enable custom navigation arrows
                breakpoints={{
                    672: { slidesPerView: 2 },
                    880: { slidesPerView: 3 },
                    1220: { slidesPerView: 4 },
                    1660: { slidesPerView: 5 },
                    1713: { slidesPerView: 6 },
                }}
                
                className={styles.swiperContainer}

                style={{ height: 850 * cardScale }}
            >
                {pajamas.map((pajama, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <ProductCardStandard
                            pajama={pajama}
                            id={styles.pajamaCard}
                            scale={cardScale}
                            fadeInThreshold={0.04}
                            linkTo={`/pajama/${encodeURIComponent(pajama.name)}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    )
}