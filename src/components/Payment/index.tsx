import Button from '../Button';
import FormContainer from '../FormContainer';
import Input from '../Input';
import styles from './styles.module.css';
import { FaLessThan } from 'react-icons/fa';

interface PaymentProps {
    onSubmit: () => void; // Função para enviar o pagamento
    onBack: () => void; // Função para voltar ao modal de dados
}

const Payment: React.FC<PaymentProps> = ({ onSubmit, onBack }) => {
    return (
        <div className={styles.dataSection}>
            <FormContainer id={styles.paymentForm} title='Pagamento'>
                <Input placeholder='Forma de Pagamento' /> {/* Esta variável 'Forma de Pagamento' pode ser trocada para o nome que seu back-end usa. */}
                <Input placeholder='Parcelamento' /> {/* Esta variável 'Parcelamento' pode ser trocada para o nome que seu back-end usa. */}
                <Input placeholder='Número do Cartão' /> {/* Esta variável 'Número do Cartão' pode ser trocada para o nome que seu back-end usa. */}
                <div id={styles.containerbuttonPayment}>
                    <Button id={styles.buttonPayment} onClick={onBack}>
                        <FaLessThan size={20} /> Voltar
                    </Button>
                    <Button id={styles.buttonPayment} onClick={onSubmit}>Enviar</Button>
                </div>
            </FormContainer>
        </div>
    );
};

export default Payment;