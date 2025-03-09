import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const loginSchema = z.object({
    usernameOrEmail: z
        .string()
        .min(1, "Usuário ou e-mail é obrigatório.")
        .refine((value) => {
            const isEmail = z.string().email().safeParse(value).success;
            const isUsername = !/\s/.test(value) && !/[À-ÿ]/.test(value);
            return isEmail || isUsername;
        }, "Usuário ou E-mail errado."),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 dígitos."),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [backendError, setBackendError] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsSubmitting(true);
        setBackendError(null);

        try {
            const response = await axios.post("/api/login", data);
            if (response.status === 200) {
                navigate("/homepage");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setBackendError(
                    error.response?.data.message || "Usuário/email ou senha inválido"
                );
            } else {
                setBackendError("Um erro ocorreu. Por favor, tente novamente.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <p>
                    Faça login para ter acesso aos pijamas dos seus{" "}
                    <strong>sonhos</strong>
                </p>
            </div>
            <div>
                <input
                    {...register("usernameOrEmail")}
                    placeholder="Usuário ou E-mail"
                />
                {errors.usernameOrEmail && (
                    <span>{errors.usernameOrEmail.message}</span>
                )}
            </div>
            <div>
                <input type="password" {...register("password")} placeholder="Senha" />
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            {backendError && <span>{backendError}</span>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
            <Link to="/forgot-password">
                <button type="button" disabled={isSubmitting}>
                    Esqueci minha senha
                </button>
            </Link>
            <hr />
            <Link to="/register">
                <button type="button" disabled={isSubmitting}>
                    Cadastre-se
                </button>
            </Link>
        </form>
    );
}
