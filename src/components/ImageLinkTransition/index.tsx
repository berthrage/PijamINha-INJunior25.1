import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import React from 'react';

interface ImageLinkTransitionProps extends React.HTMLAttributes<HTMLDivElement>{
    firstImg: string;
    secondImg: string;
    transitionOnlyIn?: boolean;
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

function ImageLinkTransition(props: ImageLinkTransitionProps, ref?: React.Ref<HTMLDivElement>) {
    const dynamicStyle = {
        width: props.width ? `${props.width}px` : undefined,
        height: props.height ? `${props.height}px` : undefined
    };

    const transition = {
        transition: '0.5s ease-in-out',
    }

    const ImagesContent = () => (
        <>
            <img 
                id={props.firstImgId} 
                src={props.firstImg} 
                alt={props.firstAlt} 
                className={styles.imgStatic} 
                style={props.transitionOnlyIn ? {} : transition}>
            </img>
            <img 
                id={props.secondImgId} 
                src={props.secondImg} 
                alt={props.secondAlt} 
                className={props.transitionOnlyIn ? styles.imgHoveredSimpler : styles.imgHovered}
                style={props.transitionOnlyIn ? {} : transition}>
            </img>
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

export default React.forwardRef(ImageLinkTransition);