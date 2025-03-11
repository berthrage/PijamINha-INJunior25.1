import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import Feedback from "../../types/Feedback";
import RatingCard from "../RatingCard";
import styles from './styles.module.css';
import arrowNext from '../../assets/icons/next.png';
import arrowPrev from '../../assets/icons/prev.png';

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";

interface RatingCardsCarouselProps {
    feedbacks: Feedback[];
}

export default function RatingCardsCarousel({ feedbacks }: RatingCardsCarouselProps) {
    return (
        <div className={styles.ratingCardsCarousel}>
            <div className={styles.swiperButtonPrev}>
                <img src={arrowPrev} alt="Previous" />
            </div>
            <div className={styles.swiperButtonNext}>
                <img src={arrowNext} alt="Next" />
            </div>

            <Swiper
                modules={[Navigation]} // Enable navigation
                spaceBetween={20} // Space between slides
                slidesPerView={1} // Default slides per view
                navigation={{
                    nextEl: `.${styles["swiperButtonNext"]}`,
                    prevEl: `.${styles["swiperButtonPrev"]}`,
                }} // Enable custom navigation arrows
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
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