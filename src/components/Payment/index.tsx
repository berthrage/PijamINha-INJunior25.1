import Button from '../Button'
import FormContainer from '../FormContainer'
import Input from '../Input'
import styles from './styles.module.css'
import { FaLessThan } from 'react-icons/fa'

export default function Payment(){
    return(
        <>
        <div className={styles.dataSection}>
            <FormContainer id={styles.paymentForm}
            title='Pagamento'
            >
                <Input placeholder='Forma de Pagamento'></Input>
                <Input placeholder='Parcelamento'></Input>
                <Input placeholder='Número do Cartão'></Input>
                <div id={styles.containerbuttonPayment}>
                    <Button id={styles.buttonPayment}><FaLessThan size={20}></FaLessThan>Voltar</Button>
                    <Button id={styles.buttonPayment}>Enviar</Button>
                </div>
            </FormContainer>
        </div>
        </>
    )
}