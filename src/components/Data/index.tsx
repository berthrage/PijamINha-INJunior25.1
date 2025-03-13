import Button from '../Button';
import FormContainer from '../FormContainer';
import Input from '../Input';
import styles from './styles.module.css';

interface DataProps {
    onSubmit: () => void; // Função para enviar os dados
}

const Data: React.FC<DataProps> = ({ onSubmit }) => {
    return (
        <div className={styles.dataSection}>
            <FormContainer id={styles.dataForm} title='Dados'>
                <Input placeholder='Nome Completo' /> {/* Esta variável 'Nome Completo' pode ser trocada para o nome que seu back-end usa. */}
                <Input placeholder='CPF' /> {/* Esta variável 'CPF' pode ser trocada para o nome que seu back-end usa. */}
                <Input placeholder='CEP' /> {/* Esta variável 'CEP' pode ser trocada para o nome que seu back-end usa. */}
                <Input placeholder='Logradouro' /> {/* Esta variável 'Logradouro' pode ser trocada para o nome que seu back-end usa. */}
                <div className={styles.containerinputData}>
                    <Input placeholder='UF' id={styles.minorinputData} /> {/* Esta variável 'UF' pode ser trocada para o nome que seu back-end usa. */}
                    <Input placeholder='Cidade' id={styles.inputData} /> {/* Esta variável 'Cidade' pode ser trocada para o nome que seu back-end usa. */}
                </div>
                <div className={styles.containerinputData}>
                    <Input placeholder='Número' id={styles.minorinputData} /> {/* Esta variável 'Número' pode ser trocada para o nome que seu back-end usa. */}
                    <Input placeholder='Bairro' id={styles.inputData} /> {/* Esta variável 'Bairro' pode ser trocada para o nome que seu back-end usa. */}
                </div>
                <Button id={styles.buttonData} onClick={onSubmit}>Enviar</Button>
            </FormContainer>
        </div>
    );
};

export default Data;