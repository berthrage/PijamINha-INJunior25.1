import Feedback from '../../types/Feedback';
import styles from './styles.module.css';
import starInactive from '../../assets/icons/star-inactive.png';
import starActive from '../../assets/icons/star-active.png';
import starHalf from '../../assets/icons/star-active-half.png';


interface RatingCardProps {
    feedback: Feedback,
}

export default function RatingCard({ feedback }: RatingCardProps) {   
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<img key={i} src={starActive} alt="Active Star" className={styles.star} />);
            } else if (i - rating === 0.5) {
                stars.push(<img key={i} src={starHalf} alt="Half Star" className={styles.star} />);
            } else {
                stars.push(<img key={i} src={starInactive} alt="Inactive Star" className={styles.star} />);
            }
        }
        return stars;
    };

    return (
        <>
            <div className={styles.ratingCard}>
                <div className={styles.ratingCardHeader}>
                    <h1>{feedback.name}</h1>
                    <div className={styles.stars}>
                        {renderStars(feedback.rating)}
                    </div>
                </div>
                <div className={styles.ratingCardDescription}>
                    <p>{feedback.description}</p>
                </div>
            </div>
        </>
    )
}