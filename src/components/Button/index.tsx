import React from "react";
import styles from "./styles.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <button {...rest} className={styles.primaryButton}>
            {children}
        </button>
    );
};

export default Button;
