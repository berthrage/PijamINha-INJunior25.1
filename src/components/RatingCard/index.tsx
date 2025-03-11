import Feedback from '../../types/Feedback';
import styles from './styles.module.css';

interface RatingCardProps {
    feedback: Feedback,
}

export default function RatingCard({ feedback }: RatingCardProps) {   
    return (
        <>
            <div className={styles.ratingCard}>
                <div className={styles.ratingCardHeader}>
                    <h1>{feedback.name}</h1>
                    <h2>{feedback.rating}</h2>
                </div>
                <div className={styles.ratingCardDescription}>
                    <p>{feedback.description}</p>
                </div>
            </div>
        </>
    )
}