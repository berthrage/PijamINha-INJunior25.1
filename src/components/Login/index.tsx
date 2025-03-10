import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import passwordEyeIcon from "../../assets/icons/password-eye.png";

const loginSchema = z.object({
    identifier: z
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
    const [showPassword, setShowPassword] = useState(false);
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
            const response = await axios.post("http://localhost:3333/authenticate", data);
            if (response.status === 201 || response.status === 200) {
                navigate("/homepage");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setBackendError(
                    error.response?.data.message || "Usuário/email inválido ou senha inválida"
                );
            } else {
                setBackendError("Um erro ocorreu. Por favor, tente novamente.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.containerForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.titleLogin}>
                <h1>Login</h1>
            </div>
            <div className={styles.paragraphLogin}>
                <p>
                    Faça login para ter acesso aos pijamas dos seus
                    <strong> sonhos!</strong>
                </p>
            </div>
            <div className={styles.useroremailorpasswordLogin}>
                <div className={styles.containerUseroremail}>
                    <input
                        {...register("identifier")}
                        placeholder="Usuário ou E-mail"
                    />
                    {errors.identifier && (
                        <p className={styles.usernameoremailorpasswordError}>
                            {errors.identifier.message}
                        </p>
                    )}
                </div>
                <div className={styles.containerPassword}>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            placeholder="Senha"
                        />
                        <button
                            type="button"
                            className={`${styles.togglePasswordButton} ${showPassword ? styles.passwordVisible : ""
                                }`}
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                            <img
                                src={passwordEyeIcon}
                                alt="Ícone de exibição de senha"
                                className={styles.passwordIcon}
                            />
                        </button>
                    </div>
                    {errors.password && (
                        <p className={styles.usernameoremailorpasswordError}>
                            {errors.password.message}
                        </p>
                    )}
                    <Link to="/forgot-password">
                        <button
                            type="button"
                            disabled={isSubmitting}
                            className={styles.forgotpassButton}
                        >
                            Esqueci minha senha
                        </button>
                    </Link>
                </div>
            </div>
            <div className={styles.buttonForm}>
                <div className={styles.containerSubmit}>
                    {backendError && <span className={styles.backendError}>{backendError}</span>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.submitButton}
                    >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>

                    <hr />
                </div>
                <Link to="/register">
                    <button
                        type="button"
                        disabled={isSubmitting}
                        className={styles.registerButton}
                    >
                        Cadastre-se
                    </button>
                </Link>
            </div>
        </form>
    );
}
