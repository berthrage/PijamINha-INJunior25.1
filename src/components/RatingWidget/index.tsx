import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import styles from "./styles.module.css";

type RatingWidgetProps = {
    onRatingChange: (value: number) => void;
};

const RatingWidget: React.FC<RatingWidgetProps> = ({ onRatingChange }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleRating = (value: number) => {
        setRating(value);
        onRatingChange(value);
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
                            color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                        }}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => handleRating(ratingValue)}
                    >
                        {ratingValue <= (hover || rating) ? <FaStar size={50} /> : <FaRegStar size={50} />}
                    </span>
                );
            })}
        </div>
    );
};

export default RatingWidget;
