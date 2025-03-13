import React, { useState } from "react";
import styles from "./styles.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";

interface NumericStepperProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    maxQuantity: number;
}

const NumericStepper: React.FC<NumericStepperProps> = ({ quantity, onQuantityChange, maxQuantity }) => {
    const [animate, setAnimate] = useState(false);

    const handleAdd = () => {
        if (quantity < maxQuantity) {
            onQuantityChange(quantity + 1);
            triggerAnimation();
        }
    };

    const handleRemove = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
            triggerAnimation();
        }
    };

    const triggerAnimation = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    };

    return (
        <div className={styles.container}>
            <button onClick={handleRemove} className={styles.iconButton}>
                <FaMinus className={styles.icon} />
            </button>
            <span className={`${styles.quantity} ${animate ? styles.bounce : ""}`}>
                {quantity}
            </span>
            <button onClick={handleAdd} className={styles.iconButton}>
                <FaPlus className={styles.icon} />
            </button>
        </div>
    );
};

export default NumericStepper;