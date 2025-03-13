import Button from '../Button'
import FormContainer from '../FormContainer'
import Input from '../Input'
import styles from './styles.module.css'

export default function Data(){
    return(
        <>
        <div className={styles.dataSection}>
            <FormContainer id={styles.dataForm}
            title='Dados'
            >
                <Input placeholder='Nome Completo'></Input>
                <Input placeholder='CPF'></Input>
                <Input placeholder='CEP'></Input>
                <Input placeholder='Logradouro'></Input>
                <div className={styles.containerinputData}>
                <Input placeholder='UF' id={styles.minorinputData}></Input>
                <Input placeholder='Cidade' id={styles.inputData}></Input>
                </div>
                <div className={styles.containerinputData}>
                <Input placeholder='Número'id={styles.minorinputData}></Input>
                <Input placeholder='Bairro' id={styles.inputData}></Input>
                </div>
                <Button id={styles.buttonData}>Enviar</Button>
            </FormContainer>
        </div>
        </>
    )
}