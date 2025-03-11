import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules"; 
import Feedback from "../../types/Feedback";
import RatingCard from "../RatingCard";
import styles from './styles.module.css';
import arrowNext from '../../assets/icons/next.png';
import arrowNextHovered from '../../assets/icons/next-hovered.png';
import arrowPrev from '../../assets/icons/prev.png';
import arrowPrevHovered from '../../assets/icons/prev-hovered.png';
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import ImageLinkTransition from "../ImageLinkTransition";

interface RatingCardsCarouselProps {
    feedbacks: Feedback[];
}

export default function RatingCardsCarousel({ feedbacks }: RatingCardsCarouselProps) {
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
                modules={[Navigation, EffectFade]} // Enable navigation
                // effect="fade" fadeEffect={{ crossFade: true }} 
                loop={true} 
                spaceBetween={0} // Space between slides
                slidesPerView={1} // Default slides per view
                centerInsufficientSlides={true}
                centeredSlidesBounds={true}
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
                {feedbacks.map((feedback, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <RatingCard feedback={feedback} />
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    )
}