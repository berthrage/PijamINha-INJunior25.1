import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import React, { useState } from 'react';

interface ImageLinkProps extends React.HTMLAttributes<HTMLDivElement>{
    img: string;
    linkTo?: string;
    alt?: string;
    width?: number;
    height?: number;
    id?: string;
    imgId?: string;
    occupyFullWidth?: boolean;
    naturalDimensions?: boolean;
}

function ImageLink(props: ImageLinkProps, ref?: React.Ref<HTMLDivElement>) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { naturalWidth, naturalHeight } = event.currentTarget;
        setDimensions({ width: naturalWidth, height: naturalHeight });
    };

    const dynamicStyle = {
        width: props.naturalDimensions ? `${dimensions.width}px` : props.width ? `${props.width}px` : props.occupyFullWidth ? '100%' : undefined,
        height: props.naturalDimensions ? `${dimensions.height}px` : props.height ? `${props.height}px` : props.occupyFullWidth ? '100%' : undefined,
    };

    const ImagesContent = () => (
        <>
            <img
                id={props.imgId}
                src={props.img}
                alt={props.alt}
                className={styles.imgStatic}
                onLoad={props.naturalDimensions ? handleImageLoad : undefined}
            ></img>
        </>
    );

    return (
        <>
            <div
                {...props}
                className={styles.imgBox}
                style={dynamicStyle}
                id={props.id}
                ref={ref}
            >
                {props.linkTo ? (
                    <Link to={props.linkTo}>
                        <ImagesContent></ImagesContent>
                    </Link>
                ) : (
                    <>
                        <ImagesContent></ImagesContent>
                    </>
                )}
            </div>
        </>
    );
}

export default React.forwardRef(ImageLink);