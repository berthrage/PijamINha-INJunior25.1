import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules"; 
import styles from './styles.module.css';
import arrowNext from '../../assets/icons/next-round.png';
import arrowNextHovered from '../../assets/icons/next-round-hovered.png';
import arrowPrev from '../../assets/icons/prev-round.png';
import arrowPrevHovered from '../../assets/icons/prev-round-hovered.png';
import carousel1 from '../../assets/images/carousel-1-upscaled.png';
import carousel2 from '../../assets/images/carousel-2-upscaled.png';
import carousel3 from '../../assets/images/carousel-3-upscaled.png';
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import ImageLinkTransition from "../ImageLinkTransition";
import ImageLink from "../ImageLink";

export default function HomeCarousel() {
    const carouselImages = [ carousel1, carousel2, carousel3 ];

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
                modules={[Navigation, EffectFade, Autoplay]} // Enable navigation
                effect="fade" fadeEffect={{ crossFade: true }} 
                loop={true} 
                spaceBetween={0} // Space between slides
                slidesPerView={1} // Default slides per view
                centerInsufficientSlides={true}
                centeredSlidesBounds={true}
                centeredSlides={true}
                navigation={{
                    nextEl: `#${styles["swiperButtonNext"]}`,
                    prevEl: `#${styles["swiperButtonPrev"]}`,
                }} // Enable custom navigation arrows
                autoplay={{
                    delay: 2500, 
                    disableOnInteraction: false, 
                    pauseOnMouseEnter: true, 
                }}
                
                className={styles.swiperContainer}
            >
                {carouselImages.map((image, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <ImageLink
                            img={image}
                            id={styles.carouselImage}
                            occupyFullWidth={true}></ImageLink>
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    )
}