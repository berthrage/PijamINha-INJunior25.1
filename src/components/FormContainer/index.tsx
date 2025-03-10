import React from "react";
import styles from "./styles.module.css";

interface FormContainerProps extends React.HTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    title: string;
    description?: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, title, description, ...rest}) => {
    return (
        <form className={styles.FormContainer} {...rest}>
            <div className={styles.internalContainer1}>
                <h1 className={styles.titleFormContainer}>{title}</h1>
                <p className={styles.descriptionFormContainer}>{description}</p>
            </div>
            <div className={styles.internalContainer2}>{children}</div>
        </form>
    );
};

export default FormContainer;
