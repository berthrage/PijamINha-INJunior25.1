import React from "react";
import styles from "./styles.module.css";

interface FormConainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    title: string;
    description?: string;
}

const Button: React.FC<FormConainerProps> = ({ children, title, description, ...rest}) => {
    return (
        <div className={styles.FormContainer}>
            <div className={styles.internalContainer1}>
                <h1 className={styles.titleFormContainer}>{title}</h1>
                <p className={styles.descriptionFormContainer}>{description}</p>
            </div>
            <div className={styles.internalContainer2} {...rest}>{children}</div>
        </div>
    );
};

export default Button;
