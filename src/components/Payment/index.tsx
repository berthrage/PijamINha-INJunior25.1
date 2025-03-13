import React, { useState } from 'react';
import Button from '../Button';
import FormContainer from '../FormContainer';
import Input from '../Input';
import styles from './styles.module.css';
import { FaLessThan } from 'react-icons/fa';

interface PaymentProps {
    onSubmit: () => void; // Função para enviar o pagamento
    onBack: () => void; // Função para voltar ao modal de dados
    totalAmount: number; // Valor total do carrinho
}

const Payment: React.FC<PaymentProps> = ({ onSubmit, onBack, totalAmount }) => {
    const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'pix'>('creditCard');
    const [cardNumber, setCardNumber] = useState('');
    const [installments, setInstallments] = useState('1');

    const handleSubmit = () => {
        if (paymentMethod === 'creditCard' && !cardNumber) {
            alert('Por favor, preencha o número do cartão.');
            return;
        }
        onSubmit();
    };

    // Calcula o valor das parcelas
    const calculateInstallmentValue = (installments: number) => {
        return (totalAmount / installments).toFixed(2);
    };

    return (
        <div className={styles.dataSection}>
            <FormContainer id={styles.paymentForm} title='Pagamento'>
                <div className={styles.formGroup}>
                    <select
                        className={styles.selectPayment}
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as 'creditCard' | 'pix')}
                    >
                        <option className={styles.optionPayment} value="creditCard">Cartão de Crédito</option>
                        <option value="pix">PIX (15% de desconto)</option>
                    </select>
                </div>

                {paymentMethod === 'creditCard' && (
                    <>
                        <div className={styles.formGroup}>
                            <select
                                className={styles.selectPayment}
                                value={installments}
                                onChange={(e) => setInstallments(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <option key={num} value={num.toString()}>
                                        {num}x de R$ {calculateInstallmentValue(num)} sem juros
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <Input
                                placeholder='Número do Cartão'
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {paymentMethod === 'pix' && (
                    <div className={styles.formGroup}>
                        <p>Você terá 15% de desconto ao pagar com PIX.</p>
                        <p>Valor total com desconto: <strong>R$ {(totalAmount * 0.85).toFixed(2)}</strong></p>
                    </div>
                )}

                <div id={styles.containerbuttonPayment}>
                    <Button id={styles.buttonPayment} onClick={onBack}>
                        <FaLessThan size={20} /> Voltar
                    </Button>
                    <Button id={styles.buttonPayment} onClick={handleSubmit}>
                        Enviar
                    </Button>
                </div>
            </FormContainer>
        </div>
    );
};

export default Payment;