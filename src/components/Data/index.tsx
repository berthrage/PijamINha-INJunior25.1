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

    const [errors, setErrors] = useState({
        nomeCompleto: '',
        cpf: '',
        cep: '',
        logradouro: '',
        uf: '',
        cidade: '',
        numero: '',
        bairro: ''
    });

    // Funções de validação
    const validateNomeCompleto = (value: string) => {
        return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value);
    };

    const validateCPF = (value: string) => {
        return /^\d{11}$/.test(value);
    };

    const validateCEP = (value: string) => {
        return /^\d{8}$/.test(value);
    };

    const validateUF = (value: string) => {
        return /^[A-Za-z]{2}$/.test(value);
    };

    const validateCidade = (value: string) => {
        return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value);
    };

    const validateNumero = (value: string) => {
        return /^\d+$/.test(value);
    };

    const validateBairro = (value: string) => {
        return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Validação em tempo real
        let error = '';
        switch (name) {
            case 'nomeCompleto':
                if (!validateNomeCompleto(value)) error = 'Nome inválido. Apenas letras e espaços são permitidos.';
                break;
            case 'cpf':
                if (!validateCPF(value)) error = 'CPF inválido. Deve conter 11 dígitos.';
                break;
            case 'cep':
                if (!validateCEP(value)) error = 'CEP inválido. Deve conter 8 dígitos.';
                break;
            case 'logradouro':
                if (value.trim() === '') error = 'Campo obrigatório.';
                break;
            case 'uf':
                if (!validateUF(value)) error = 'UF inválida. Deve conter exatamente 2 letras.';
                break;
            case 'cidade':
                if (!validateCidade(value)) error = 'Cidade inválida. Apenas letras e espaços são permitidos.';
                break;
            case 'numero':
                if (!validateNumero(value)) error = 'Número inválido. Apenas números são permitidos.';
                break;
            case 'bairro':
                if (!validateBairro(value)) error = 'Bairro inválido. Apenas letras e espaços são permitidos.';
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [name]: error
        });
    };

    const isFormValid = () => {
        return (
            validateNomeCompleto(formData.nomeCompleto) &&
            validateCPF(formData.cpf) &&
            validateCEP(formData.cep) &&
            formData.logradouro.trim() !== '' &&
            validateUF(formData.uf) &&
            validateCidade(formData.cidade) &&
            validateNumero(formData.numero) &&
            validateBairro(formData.bairro)
        );
    };

    return (
        <div className={styles.dataSection}>
            <FormContainer id={styles.dataForm} title='Dados'>
                <div>
                    <Input 
                        placeholder='Nome Completo' 
                        name="nomeCompleto"
                        value={formData.nomeCompleto}
                        onChange={handleInputChange}
                    />
                    {errors.nomeCompleto && <p className={styles.error}>{errors.nomeCompleto}</p>}
                </div>

                <div>
                    <Input 
                        placeholder='CPF' 
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                    />
                    {errors.cpf && <p className={styles.error}>{errors.cpf}</p>}
                </div>

                <div>
                    <Input 
                        placeholder='CEP' 
                        name="cep"
                        value={formData.cep}
                        onChange={handleInputChange}
                    />
                    {errors.cep && <p className={styles.error}>{errors.cep}</p>}
                </div>

                <div>
                    <Input 
                        placeholder='Logradouro' 
                        name="logradouro"
                        value={formData.logradouro}
                        onChange={handleInputChange}
                    />
                    {errors.logradouro && <p className={styles.error}>{errors.logradouro}</p>}
                </div>

                <div className={styles.containerinputData}>
                    <div>
                        <Input 
                            placeholder='UF' 
                            id={styles.minorinputData}
                            name="uf"
                            value={formData.uf}
                            onChange={handleInputChange}
                        />
                        {errors.uf && <p className={styles.error}>{errors.uf}</p>}
                    </div>

                    <div>
                        <Input 
                            placeholder='Cidade' 
                            id={styles.inputData}
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleInputChange}
                        />
                        {errors.cidade && <p className={styles.error}>{errors.cidade}</p>}
                    </div>
                </div>

                <div className={styles.containerinputData}>
                    <div>
                        <Input 
                            placeholder='Número' 
                            id={styles.minorinputData}
                            name="numero"
                            value={formData.numero}
                            onChange={handleInputChange}
                        />
                        {errors.numero && <p className={styles.error}>{errors.numero}</p>}
                    </div>

                    <div>
                        <Input 
                            placeholder='Bairro' 
                            id={styles.inputData}
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleInputChange}
                        />
                        {errors.bairro && <p className={styles.error}>{errors.bairro}</p>}
                    </div>
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