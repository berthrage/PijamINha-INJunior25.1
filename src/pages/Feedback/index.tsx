import { useState } from "react";
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
        watch,
    } = useForm<FormData>();

    const [nota, setNota] = useState(0);


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            data.nota = nota;

            const response = await axios.post("/api/feedback", data);
            console.log("Resposta do servidor:", response.data);

            alert("Feedback enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar feedback:", error);
            alert("Ocorreu um erro ao enviar o feedback. Tente novamente.");
        }
    };

    const isFormValid = watch("nome") && watch("descricao") && nota > 0;

    return (
        <div className={styles.feedbackSection}>
            <FormContainer
                title="Feedback"
                description="Fale um pouco sobre a sua experiência com a nossa loja!"
            >
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Input
                        placeholder="Nome Completo"
                        {...register("nome", { required: "Nome é obrigatório" })}
                    />
                    {errors.nome && <p className={styles.error}>{errors.nome.message}</p>}


                    <textarea
                        placeholder="Descrição Detalhada"
                        id={styles.feedbackBox}
                        {...register("descricao", { required: "Descrição é obrigatória" })}
                    />
                    {errors.descricao && (
                        <p className={styles.error}>{errors.descricao.message}</p>
                    )}

                    <RatingWidget
                        onRatingChange={(value) => {
                            setNota(value);
                            setValue("nota", value);
                        }}
                    />
                    {nota === 0 && (
                        <p className={styles.error}>Selecione uma nota para o feedback.</p>
                    )}

                    <Button type="submit" disabled={!isFormValid}>
                        Enviar
                    </Button>
                </form>
            </FormContainer>
        </div>
    );
}