import styles from "./styles.module.css";
import logo from "../../assets/images/logo-variant1.png";
import logoinstagram from "../../assets/icons/ico-insta.png";
import logofacebook from "../../assets/icons/ico-facebook.png";
import logolinkedin from "../../assets/icons/ico-linkedin.png";
import ImageLinkTransition from "../ImageLinkTransition";

export default function Footer() {
    return (
        <>
            <footer className={styles.footerSection}>
                <div className={styles.containerfooterSection}>
                    <div className={styles.adressandcontactSection}>
                        <div className={styles.adressSection}>
                            <h2>Endereço</h2>
                            <p>
                                Av. Milton Tavares de Souza, s/n - Sala 115 B - Boa Viagem,
                                Niterói - RJ
                                <br />
                                CEP: 24210-315
                            </p>
                        </div>
                        <div className={styles.contactSection}>
                            <div className={styles.emailSection}>
                                <h2>Fale Conosco</h2>
                                <p>contato@injunior.com.br</p>
                            </div>
                            <div className={styles.socialSection}>
                                
                                <ImageLinkTransition
                                    linkTo={"https://www.instagram.com/injunioruff/"}
                                    firstImg={logoinstagram}
                                    secondImg={logoinstagram}
                                    firstAlt="logoInstagram"
                                    secondAlt="logoInstagram"
                                    width={27}
                                    height={27}
                                    target="_blank">
                                </ImageLinkTransition>
                                <ImageLinkTransition
                                    linkTo={"https://www.facebook.com/injunioruff?_rdc=1&_rdr#"}
                                    firstImg={logofacebook}
                                    secondImg={logofacebook}
                                    firstAlt="logoFacebook"
                                    secondAlt="logoFacebook"
                                    width={27}
                                    height={27}
                                    target="_blank">
                                </ImageLinkTransition>
                                <ImageLinkTransition
                                    linkTo={"https://www.linkedin.com/company/in-junior/"}
                                    firstImg={logolinkedin}
                                    secondImg={logolinkedin}
                                    firstAlt="logoLinkedIn"
                                    secondAlt="logoLinkedIn"
                                    width={27}
                                    height={27}
                                    target="_blank">
                                </ImageLinkTransition>
                            
                            </div>
                        </div>
                    </div>
                    <div className={styles.logoSection}>
                        <img src={logo} alt="Logo do Pijaminhas" />
                    </div>
                    <div className={styles.mapSection}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1837.575333154359!2d-43.13361603764284!3d-22.90781298394333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99817ed79f10f3%3A0xb39c7c0639fbc9e8!2sIN%20Junior%20-%20Empresa%20Junior%20de%20Computa%C3%A7%C3%A3o%20da%20UFF!5e0!3m2!1spt-BR!2sbr!4v1741458355702!5m2!1spt-BR!2sbr"
                            width="400"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <div className={styles.copyrightSection}>
                    <p>
                        © Copyright 2025. IN Junior. Todos os direitos reservados. Niterói,
                        Brasil.
                    </p>
                </div>
            </footer>
        </>
    );
}
