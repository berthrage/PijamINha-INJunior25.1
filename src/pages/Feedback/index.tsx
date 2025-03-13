import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";
import RatingWidget from "../../components/RatingWidget";

type FormData = {
    nome: string;
    descricao: string;
    nota: number;
};

export default function Feedback() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<FormData>();

    const [nota, setNota] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [confirmationMessage, setConfirmationMessage] = useState<string>("");

    useEffect(() => {
        setValue("nota", nota);
        trigger("nota");
    }, [nota, setValue, trigger]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (Object.keys(errors).length > 0) {
            console.warn("Erros encontrados:", errors);
            return;
        }

        try {
            const response = await axios.post("/api/feedback", data);
            console.log("Resposta do servidor:", response.data);
            setConfirmationMessage("Feedback enviado com sucesso!");
            setIsModalOpen(true);
        } catch (error) {
            console.error("Erro ao enviar feedback:", error);
            setConfirmationMessage("Ocorreu um erro ao enviar o feedback. Tente novamente.");
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.feedbackSection}>
            <FormContainer
                onSubmit={handleSubmit(onSubmit)}
                title="Feedback"
                description="Fale um pouco sobre a sua experiência com a nossa loja!"
            >
                <div className={styles.rating}>
                    <div>
                        <Input
                            id={errors.nome ? styles.inputError : styles.nomeinputFeedback}
                            placeholder="Nome Completo"
                            {...register("nome", {
                                required: "Nome é obrigatório",
                                validate: {
                                    noNumbers: (value) =>
                                        /^[A-Za-zÀ-ú\s]+$/.test(value) ||
                                        "O nome não pode conter números.",
                                },
                            })}
                        />
                        {errors.nome && <p className={styles.error}>{errors.nome.message}</p>}
                    </div>

                    <div>
                        <textarea
                            id={errors.descricao ? styles.feedbackBoxError : styles.feedbackBox}
                            placeholder="Descrição Detalhada"
                            aria-label="Descrição do feedback"
                            {...register("descricao", { required: "Descrição é obrigatória" })}
                        />
                        {errors.descricao && (
                            <p className={styles.error}>{errors.descricao.message}</p>
                        )}
                    </div>

                    <div className={styles.lowerPart}>
                        <RatingWidget
                            onRatingChange={(value: number) => setNota(value)}
                        />
                        <input
                            type="hidden"
                            {...register("nota", {
                                validate: (value) => value > 0 || "Selecione uma nota para o feedback.",
                            })}
                        />
                        {errors.nota && <p className={styles.error}>{errors.nota.message}</p>}

                        <Button type="submit">
                            Enviar
                        </Button>
                    </div>
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