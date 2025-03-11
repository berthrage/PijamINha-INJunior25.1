import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import React from 'react';

interface ImageLinkProps extends React.HTMLAttributes<HTMLDivElement>{
    img: string;
    linkTo?: string;
    alt?: string;
    width?: number;
    height?: number;
    id?: string;
    imgId?: string;
    occupyFullWidth?: boolean;
}

function ImageLink(props: ImageLinkProps, ref?: React.Ref<HTMLDivElement>) {
    const dynamicStyle = {
        width: props.width ? `${props.width}px` : props.occupyFullWidth ? '100%' : undefined,
        height: props.height ? `${props.height}px` : props.occupyFullWidth ? '100%' : undefined,
    };

    const ImagesContent = () => (
        <>
            <img id={props.imgId} src={props.img} alt={props.alt} className={styles.imgStatic}></img>
        </>
    );

    return(
        <> 
                <div 
                    {...props} 
                    className={styles.imgBox} 
                    style={dynamicStyle} 
                    id={props.id} 
                    ref={ref}>
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

export default React.forwardRef(ImageLink);