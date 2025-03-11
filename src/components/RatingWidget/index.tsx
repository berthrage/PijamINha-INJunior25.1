import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import styles from './styles.module.css';

const RatingWidget: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className={styles.starratingSection}>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                // const halfRatingValue = ratingValue - 0.5;

                return (
                    <label key={index}>

                        {/* <input className={styles.inputStar}
                            type="radio"
                            name="rating"
                            value={halfRatingValue}
                            onClick={() => setRating(halfRatingValue)}
                            style={{ display: "flex" }} 
                        /> */}
                        <input className={styles.inputStar}
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            style={{ display: "none" }} 
                        />
                        <span
                            className={styles.star}
                            style={{
                                cursor: "pointer",
                                color:
                                    ratingValue <= (hover || rating)
                                        ? "#ffc107" 
                                        : ratingValue - 0.5 <= (hover || rating)
                                        ? "#ffc107" 
                                        : "#e4e5e9", 
                            }}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        >
                            {ratingValue <= (hover || rating) ? (
                                <FaStar size={50}/>
                            ) : ratingValue - 0.5 <= (hover || rating) ? (
                                <FaStarHalf size={50}/>
                            ) : (
                                <FaRegStar size={50}/>
                            )}
                        </span>
                    </label>
                );
            })}
        </div>
    );
};

export default RatingWidget;