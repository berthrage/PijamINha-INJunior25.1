import React, { useState } from 'react';
import Button from '../Button';
import FormContainer from '../FormContainer';
import Input from '../Input';
import styles from './styles.module.css';

interface DataProps {
    onSubmit: () => void; // Função para enviar os dados
}

const Data: React.FC<DataProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        cpf: '',
        cep: '',
        logradouro: '',
        uf: '',
        cidade: '',
        numero: '',
        bairro: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    return (
        <div className={styles.dataSection}>
            <FormContainer id={styles.dataForm} title='Dados'>
                <Input 
                    placeholder='Nome Completo' 
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                />
                <Input 
                    placeholder='CPF' 
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                />
                <Input 
                    placeholder='CEP' 
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                />
                <Input 
                    placeholder='Logradouro' 
                    name="logradouro"
                    value={formData.logradouro}
                    onChange={handleInputChange}
                />
                <div className={styles.containerinputData}>
                    <Input 
                        placeholder='UF' 
                        id={styles.minorinputData}
                        name="uf"
                        value={formData.uf}
                        onChange={handleInputChange}
                    />
                    <Input 
                        placeholder='Cidade' 
                        id={styles.inputData}
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.containerinputData}>
                    <Input 
                        placeholder='Número' 
                        id={styles.minorinputData}
                        name="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                    />
                    <Input 
                        placeholder='Bairro' 
                        id={styles.inputData}
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleInputChange}
                    />
                </div>
                <Button 
                    id={styles.buttonData} 
                    onClick={onSubmit}
                    disabled={!isFormValid()}
                >
                    Enviar
                </Button>
            </FormContainer>
        </div>
    );
};

export default Data;