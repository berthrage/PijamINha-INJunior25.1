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

interface PaginationCarouselProps {
    totalPages: number;
    currentPage: number;
    onClickGoToPage: (page: number) => void;
    id?: string;
}

export default function PaginationCarousel({ totalPages, currentPage, onClickGoToPage, id } : PaginationCarouselProps) {
    return (
        <>
            <div 
                className={styles.paginationCarousel}
                id={id}>
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
                    modules={[ Navigation ]} // Enable navigation
                    spaceBetween={0} // Space between slides
                    slidesPerView={5} // Default slides per view
                    initialSlide={0}
                    navigation={{
                        nextEl: `#${styles["swiperButtonNext"]}`,
                        prevEl: `#${styles["swiperButtonPrev"]}`,
                    }} // Enable custom navigation arrows
                    
                    
                    className={styles.swiperContainer}
                >
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageIndex) => (
                        <SwiperSlide 
                            key={pageIndex} 
                            className={styles.swiperSlide} >

                                <div 
                                    className={pageIndex === currentPage ? 
                                        styles.pageNumberActive : 
                                        styles.pageNumberInactive}
                                    onClick={() => onClickGoToPage(pageIndex)}>
                                    <h1>{pageIndex}</h1>
                                </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}