import { useState, useRef } from "react";
import ImageLink from "../ImageLink";
import starInactive from '../../assets/icons/star-inactive-white.png';
import starActive from '../../assets/icons/star-active-white.png';
import starActiveHovered from '../../assets/icons/star-active-white-hovered.png';
import starHalfHovered from '../../assets/icons/star-active-half-white-hovered.png';
import starHalf from '../../assets/icons/star-active-half-white.png';
import styles from "./styles.module.css";

type RatingWidgetProps = {
    onRatingChange: (value: number) => void;
};

const RatingWidget: React.FC<RatingWidgetProps> = ({ onRatingChange }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const starRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const handleRating = (value: number) => {
        setRating(value);
        onRatingChange(value);
        animateStars(value);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>, value: number) => {
        const { left, width } = event.currentTarget.getBoundingClientRect();
        const hoverX = event.clientX - left;
        const newHover = hoverX < width / 2 ? value - 0.5 : value;
        setHover(newHover);
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    const handleClick = (event: React.MouseEvent<HTMLSpanElement>, value: number) => {
        const { left, width } = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - left;
        const newRating = clickX < width / 2 ? value - 0.5 : value;
        handleRating(newRating);
    };

    const animateStars = (value: number) => {
        for (let i = 0; i < value; i++) {
            if (starRefs.current[i]) {
                starRefs.current[i]?.classList.add(styles.animate);
                setTimeout(() => {
                    starRefs.current[i]?.classList.remove(styles.animate);
                }, 150);
            }
        }
    };

    return (
        <div className={styles.starratingSection}>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;

                return (
                    <span
                        key={index}
                        className={styles.star}
                        style={{
                            cursor: "pointer",
                        }}
                        onMouseMove={(event) => handleMouseMove(event, ratingValue)}
                        onMouseLeave={handleMouseLeave}
                        onClick={(event) => handleClick(event, ratingValue)}
                        ref={(element) => {
                            starRefs.current[index] = element;
                        }}
                    >
                        <ImageLink
                            img={
                                hover >= ratingValue
                                    ? starActive
                                    : hover >= ratingValue - 0.5
                                    ? starHalf
                                    : rating >= ratingValue && hover === 0
                                    ? starActive
                                    : rating >= ratingValue - 0.5 && hover === 0
                                    ? starHalf
                                    : starInactive
                            }
                            width={44}
                            height={42}
                            alt="star"
                        />
                    </span>
                );
            })}
        </div>
    );
};

export default RatingWidget;