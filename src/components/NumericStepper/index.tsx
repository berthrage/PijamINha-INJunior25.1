import React from "react";
import styles from "./styles.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";

interface NumericStepperProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    maxQuantity: number;
}

const NumericStepper: React.FC<NumericStepperProps> = ({ quantity, onQuantityChange, maxQuantity }) => {
    const handleAdd = () => {
        if (quantity < maxQuantity) {
            onQuantityChange(quantity + 1);
        }
    };

    const handleRemove = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    return (
        <div className={styles.container}>
            <button onClick={handleRemove} className={styles.iconButton} disabled={quantity === 1}>
                <FaMinus className={styles.icon} />
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button onClick={handleAdd} className={styles.iconButton} disabled={quantity === maxQuantity}>
                <FaPlus className={styles.icon} />
            </button>
        </div>
    );
};

export default NumericStepper;