import { useNavigate } from 'react-router-dom'; 
import styles from './styles.module.css';
import { IoMdClose } from "react-icons/io";

interface ConcludedProps {
    onClose: () => void; 
}

const Concluded: React.FC<ConcludedProps> = ({ onClose }) => {
    const navigate = useNavigate(); 
    const handleClose = () => {
        onClose(); 
        navigate('/home'); 
    };

    return (
        <div className={styles.concludedSection}>
            <div>
                <h1>Sua compra foi concluída!</h1>
                <p>Obrigado por comprar conosco. Volte Sempre!</p>
            </div>

            <div className={styles.buttoncloseConcluded} onClick={handleClose}>
                <IoMdClose size={30} />
            </div>
        </div>
    );
};

export default Concluded;