import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface ImageTransitionProps {
    firstImg: string;
    secondImg: string;
    linkTo?: string;
    firstAlt?: string;
    secondAlt?: string;
    width?: number;
    height?: number;
    id?: string;
}

export default function ImageTransition(props: ImageTransitionProps) {
    const dynamicStyle = {
        width: props.width ? `${props.width}px` : undefined,
        height: props.height ? `${props.height}px` : undefined
    };

    return(
        <> 
            
                
                <div className={styles.imgBox} style={dynamicStyle} id={props.id}>
                    {props.linkTo ? (
                        <Link to={props.linkTo}>
                            <img src={props.firstImg} alt={props.firstAlt} className={styles.imgStatic}></img>
                            <img src={props.secondImg} alt={props.secondAlt} className={styles.imgHovered}></img>
                        </Link>
                    ) : (<>
                            <img src={props.firstImg} alt={props.firstAlt} className={styles.imgStatic}></img>
                            <img src={props.secondImg} alt={props.secondAlt} className={styles.imgHovered}></img>
                        </>
                    )}
                </div>

            
            
        </>
    )
}