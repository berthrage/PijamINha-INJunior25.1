import { useState, useRef } from "react";
import useMediaQuery from "../../hooks/useMediaQueries";
import starInactive from '../../assets/icons/star-inactive-white.png';
import starActive from '../../assets/icons/star-active-white.png';
// import starActiveHovered from '../../assets/icons/star-active-white-hovered.png';
// import starHalfHovered from '../../assets/icons/star-active-half-white-hovered.png';
import starHalf from '../../assets/icons/star-active-half-white.png';
import styles from "./styles.module.css";

type RatingWidgetProps = {
    onRatingChange: (value: number) => void;
};

const RatingWidget: React.FC<RatingWidgetProps> = ({ onRatingChange }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const starRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const canHover = useMediaQuery("(hover: hover)");

    const handleRating = (value: number) => {
        setRating(value);
        onRatingChange(value);
        animateStars(value);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>, value: number) => {
        if (!canHover) return;
        const { left, width } = event.currentTarget.getBoundingClientRect();
        const hoverX = event.clientX - left;
        const newHover = hoverX < width / 2 ? value - 0.5 : value;
        setHover(newHover);
    };

    const handleMouseLeave = () => {
        if (!canHover) return;
        setHover(0);
    };

    const handleClick = (event: React.MouseEvent<HTMLSpanElement>, value: number) => {
        const { left, width } = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - left;
        const newRating = clickX < width / 2 ? value - 0.5 : value;
        handleRating(newRating);
        if (!canHover) setHover(newRating); setTimeout(() => {setHover(0)}, 150) ;
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
                            position: "relative",
                            display: "inline-block",
                            width: 44,
                            height: 42,
                        }}
                        onMouseMove={(event) => handleMouseMove(event, ratingValue)}
                        onMouseLeave={handleMouseLeave}
                        onClick={(event) => handleClick(event, ratingValue)}
                        ref={(element) => {
                            starRefs.current[index] = element;
                        }}
                    >
                        <img
                            src={starInactive}
                            alt="star"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                opacity: hover >= ratingValue || (rating >= ratingValue && hover === 0) ? 0 : 1,
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        />
                        <img
                            src={starActive}
                            alt="star"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                opacity: rating >= ratingValue && hover === 0 ? 1 : 0,
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        />
                        <img
                            src={starActive} //starActiveHovered
                            alt="star"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                opacity: hover >= ratingValue ? 1 : 0,
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        />
                        <img
                            src={starHalf}
                            alt="star"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                opacity: rating >= ratingValue - 0.5 && rating < ratingValue && hover === 0 ? 1 : 0,
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        />
                        <img
                            src={starHalf} // starHalfHovered
                            alt="star"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                opacity: hover >= ratingValue - 0.5 && hover < ratingValue ? 1 : 0,
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        />
                    </span>
                );
            })}
        </div>
    );
};

export default RatingWidget;