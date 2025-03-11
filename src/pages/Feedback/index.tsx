import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link, Form } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer"
import RatingWidget from "../../components/RatingWidget";

export default function Feedback(){
    return(
        <><div className={styles.feedbackSection}>
            
            <FormContainer
            title="Feedback"
            description="Fale um pouco sobre a sua experiência com a nossa loja!">
                <Input placeholder="Nome Completo"></Input>
                <textarea placeholder="Descrição Detalhada" id={styles.feedbackBox}></textarea>
                <RatingWidget></RatingWidget>
                <Button>Enviar</Button></FormContainer>
        </div>        </>
    )
}