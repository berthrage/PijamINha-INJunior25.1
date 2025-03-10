import React from "react";
import styles from "./styles.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
}

const Input: React.FC<InputProps> = ({ ...rest }) => {
    return (
        <input {...rest} className={styles.primaryInput}>
        </input>
    );
};

export default Input;
