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
            alert("Feedback enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar feedback:", error);
            alert("Ocorreu um erro ao enviar o feedback. Tente novamente.");
        }
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
                                placeholder="Nome Completo"
                                {...register("nome", { required: "Nome é obrigatório" })}
                            />
                            {errors.nome && <p className={styles.error}>{errors.nome.message}</p>}
                        </div>

                        <div>
                            <textarea
                                id={styles.feedbackBox}
                                placeholder="Descrição Detalhada"
                                aria-label="Descrição do feedback"
                                {...register("descricao", { required: "Descrição é obrigatória" })}
                            />
                            {errors.descricao && (
                                <p className={styles.error}>{errors.descricao.message}</p>
                            )}
                        </div>

                        <RatingWidget
                            rating={nota}
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
            </FormContainer>
        </div>
    );
}
