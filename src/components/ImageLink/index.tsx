import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface ImageLinkProps extends React.HTMLAttributes<HTMLDivElement>{
    img: string;
    linkTo?: string;
    alt?: string;
    width?: number;
    height?: number;
    id?: string;
    imgId?: string;
}

export default function ImageLink(props: ImageLinkProps) {
    const dynamicStyle = {
        width: props.width ? `${props.width}px` : undefined,
        height: props.height ? `${props.height}px` : undefined
    };

    const ImagesContent = () => (
        <>
            <img id={props.imgId} src={props.img} alt={props.alt} className={styles.imgStatic}></img>
        </>
    );

    return(
        <> 
                <div {...props} className={styles.imgBox} style={dynamicStyle} id={props.id}>
                    {props.linkTo ? (
                        <Link to={props.linkTo}>
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