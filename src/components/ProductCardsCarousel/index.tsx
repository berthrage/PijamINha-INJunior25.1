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
    const cardScale = 0.7;

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
                spaceBetween={0} // Space between slides
                slidesPerView={1} // Default slides per view
                initialSlide={0}
                navigation={{
                    nextEl: `#${styles["swiperButtonNext"]}`,
                    prevEl: `#${styles["swiperButtonPrev"]}`,
                }} // Enable custom navigation arrows
                breakpoints={{
                    640: { slidesPerView: 1 },
                    945: { slidesPerView: 2 },
                    1413: { slidesPerView: 3 },
                }}
                
                className={styles.swiperContainer}
            >
                {pajamas.map((pajama, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <ProductCardStandard
                            pajama={pajama}
                            id={styles.pajamaCard}
                            fadeInTimeout={0}
                            itemsPerRow={5}
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