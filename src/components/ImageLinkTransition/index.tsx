import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface ImageLinkTransitionProps {
    firstImg: string;
    secondImg: string;
    linkTo?: string;
    firstAlt?: string;
    secondAlt?: string;
    width?: number;
    height?: number;
    id?: string;
    firstImgId?: string;
    secondImgId?: string;
    target?: string;
}

export default function ImageLinkTransition(props: ImageLinkTransitionProps) {
    const dynamicStyle = {
        width: props.width ? `${props.width}px` : undefined,
        height: props.height ? `${props.height}px` : undefined
    };

    const ImagesContent = () => (
        <>
            <img id={props.firstImgId} src={props.firstImg} alt={props.firstAlt} className={styles.imgStatic}></img>
            <img id={props.secondImgId} src={props.secondImg} alt={props.secondAlt} className={styles.imgHovered}></img>
        </>
    );

    return(
        <> 
                <div className={styles.imgBox} style={dynamicStyle} id={props.id}>
                    {props.linkTo ? (
                        <Link to={props.linkTo} target={props.target? props.target : "_self"}>
                            <ImagesContent></ImagesContent>
                        </Link>
                    ) : (<>
                            <ImagesContent></ImagesContent>
                        </>
                    )}
                </div>

            
            
        </>
    )
}