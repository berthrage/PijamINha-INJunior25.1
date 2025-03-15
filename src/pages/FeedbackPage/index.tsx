import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";
import RatingWidget from "../../components/RatingWidget";
import useFeedbacksStore from "../../stores/FeedbacksStore";
import Feedback from "../../types/Feedback";


export default function FeedbackPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<Feedback>();

    const [nota, setNota] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [confirmationMessage, setConfirmationMessage] = useState<string>("");
    const { createFeedback } = useFeedbacksStore();

    useEffect(() => {
        setValue("rating", nota);
        trigger("rating");
    }, [nota, setValue, trigger]);

    const onSubmit: SubmitHandler<Feedback> = async (data) => {
        if (Object.keys(errors).length > 0) {
            console.warn("Erros encontrados:", errors);
            return;
        }

        createFeedback(data);
        setConfirmationMessage("Feedback enviado com sucesso!");
        setIsModalOpen(true);   
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
                            id={errors.name ? styles.inputError : styles.nomeinputFeedback}
                            placeholder="Nome Completo"
                            {...register("name", {
                                required: "Nome é obrigatório",
                                validate: {
                                    noNumbers: (value) =>
                                        /^[A-Za-zÀ-ú\s]+$/.test(value) ||
                                        "O nome não pode conter números.",
                                },
                            })}
                        />
                        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                    </div>

                    <div>
                        <textarea
                            id={errors.description ? styles.feedbackBoxError : styles.feedbackBox}
                            placeholder="Descrição Detalhada"
                            aria-label="Descrição do feedback"
                            {...register("description", { required: "Descrição é obrigatória" })}
                        />
                        {errors.description && (
                            <p className={styles.error}>{errors.description.message}</p>
                        )}
                    </div>

                    <div className={styles.lowerPart}>
                        <RatingWidget
                            onRatingChange={(value: number) => setNota(value)}
                        />
                        <input
                            type="hidden"
                            {...register("rating", {
                                validate: (value) => value > 0 || "Selecione uma nota para o feedback.",
                            })}
                        />
                        {errors.rating && <p className={styles.error}>{errors.rating.message}</p>}

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