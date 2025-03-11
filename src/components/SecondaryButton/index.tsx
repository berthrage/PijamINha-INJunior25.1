import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import useMediaQuery from '../../hooks/useMediaQueries';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    linkTo?: string;
    width?: number;
    overrideMediaQuery?: boolean;
}

export default function SecondaryButton(props: ButtonProps) {
    const isWideEnough = useMediaQuery('(min-width: 800px)');

    const staticStyle = {
        width: props.width ? `${props.width}px` : `${772}px`,
    };

    const buttonContent = (
        <div className={styles.buttonContainer} style={props.overrideMediaQuery ? staticStyle : isWideEnough ? staticStyle : {}}>
            <button {...props} className={`${styles.button} ${props.className}`}>
                {props.children}
            </button>
        </div>
    );

    return props.linkTo ? (
        <Link to={props.linkTo}>
            {buttonContent}
        </Link>
    ) : (
        buttonContent
    );
}