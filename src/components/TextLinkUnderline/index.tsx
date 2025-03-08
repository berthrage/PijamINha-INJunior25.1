import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.css'

interface TextLinkUnderlineProps extends React.HTMLAttributes<HTMLSpanElement>{
    linkTo: string;
    text: string;
    id?: string;
    idDiv?: string;
}

export default function TextLinkUnderline(props: TextLinkUnderlineProps) {
    const textRef = useRef<HTMLSpanElement>(null);
    const [underlineWidth, setUnderlineWidth] = useState(0);

    useEffect(() => {
        if (textRef.current) {
            setUnderlineWidth(textRef.current.offsetWidth);
        }
    }, [props.text]);

    return (
        <Link to={props.linkTo} className={styles.textLink}>
            <span {...props} ref={textRef} className={styles.text}>{props.text}</span>
            <div id={props.idDiv} className={styles.underline} style={{ width: underlineWidth }}></div>
        </Link>
    );
}
