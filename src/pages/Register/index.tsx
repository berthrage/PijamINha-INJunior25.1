import styles from "./styles.module.css";
import FormContainer from "../../components/FormContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { z } from "zod";
import { useState } from "react";

const registerSchema = z.object({
    name: z.string()
        .min(1, "Nome é obrigatório")
        .refine((value) => !/\d/.test(value), "Nome não pode conter números"),
    username: z.string()
        .min(1, "Usuário é obrigatório")
        .refine((value) => !/\s/.test(value), "Usuário não pode conter espaços")
        .refine((value) => !/[À-ú]/.test(value), "Usuário não pode conter acentos"),
    email: z.string()
        .min(1, "E-mail é obrigatório")
        .email("E-mail inválido"),
    password: z.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .refine((value) => !/\s/.test(value), "Senha não pode conter espaços"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitting, setSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [confirmationMessage, setConfirmationMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Atualiza o valor do input
        setFormData({ ...formData, [name]: value });

        // Limpa o erro do campo específico enquanto o usuário digita
        if (errors[name]) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            registerSchema.parse(formData);
            setErrors({});

            setSubmitting(true);

            const userData = {
                name: formData.name,
                email: formData.email,
                username: formData.username,
                password: formData.password,
            };

            const response = await axios.post("/api/register", userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setFormData({
                    name: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmationMessage("Registro realizado com sucesso!");
                setIsModalOpen(true);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors: { [key: string]: string } = {};
                error.errors.forEach((err) => {
                    validationErrors[err.path[0]] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.error("Erro ao registrar:", error);
                setConfirmationMessage("Erro ao registrar. Tente novamente.");
                setIsModalOpen(true);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.registerSection}>
            <FormContainer title="Registre-se" onSubmit={handleSubmit}>
                <div className={styles.containerRegister}>
                    <div className={styles.inputSection}>
                        <div>
                            <Input
                                name="name"
                                placeholder="Nome"
                                value={formData.name}
                                onChange={handleChange}
                                id={errors.name ? styles.inputError : ""}
                            />
                            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                        </div>

                        <div>
                            <Input
                                name="username"
                                placeholder="Nome de Usuário"
                                value={formData.username}
                                onChange={handleChange}
                                id={errors.username ? styles.inputError : ""}
                            />
                            {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}
                        </div>

                        <div>
                            <Input
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                id={errors.email ? styles.inputError : ""}
                            />
                            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                        </div>

                        <div>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Senha"
                                value={formData.password}
                                onChange={handleChange}
                                id={errors.password ? styles.inputError : ""}
                            />
                            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                        </div>

                        <div>
                            <Input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirmar Senha"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                id={errors.confirmPassword ? styles.inputError : ""}
                            />
                            {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
                        </div>
                    </div>
                    <Button type="submit" disabled={submitting}>
                        {submitting ? "Registrando..." : "Registrar"}
                    </Button>
                </div>
            </FormContainer>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <p>{confirmationMessage}</p>
                        <Button onClick={closeModal}>Fechar</Button>
                    </div>
                </div>
            )}
        </div>
    );
}