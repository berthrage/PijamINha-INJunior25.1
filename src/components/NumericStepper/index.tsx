import React, { useState } from "react";
import styles from "./styles.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";

interface NumericStepperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NumericStepper: React.FC<NumericStepperProps> = () => {
  const [quantity, setQuantity] = useState(1);
  const [animate, setAnimate] = useState(false);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
    triggerAnimation();
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
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