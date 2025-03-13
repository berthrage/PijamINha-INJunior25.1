import styles from './styles.module.css';

const Concluded: React.FC = () => {
    return (
        <div className={styles.concludedSection}>
            <h1>Sua compra foi concluída!</h1>
            <p>Obrigado por comprar conosco. Volte Sempre!</p>
        </div>
    );
};

export default Concluded;