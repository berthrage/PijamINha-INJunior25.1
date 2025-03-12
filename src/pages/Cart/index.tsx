import styles from './styles.module.css'
import Button from '../../components/Button'
import NumericStepper from '../../components/NumericStepper';
import imagem from '../../assets/pajamas/example.jpg'
import { IoMdClose } from "react-icons/io";

export default function Cart() {
    const preço = 0;
    const quantidade = 12;
    const size = 'M'
    const productprice = preço
    return (
        <><div className={styles.cartSection}>
            <div className={styles.containerCart}>
                <img src={imagem} alt="" />
                <div className={styles.interncontainerCart}>
                    <div className={styles.titleCart}>
                        <div>
                            <h1>Nome do Pijama</h1>
                            <p>Referência</p>
                        </div>
                        <div className={styles.sizeCart}><button>{size}</button></div>
                    </div>
                    <div className={styles.containerquantityCart}>
                        <p>Quantidade:</p>
                        
                            <NumericStepper></NumericStepper>
                        
                        <span>Não perca sua oportunidade!</span>
                        <span>Há apenas mais <span> {quantidade}</span> peças disponíveis</span></div>
                </div>
                <div className={styles.productpriceCart}>
                        <p>{productprice}</p>
                    </div>
                <div className={styles.icon}>
                    <IoMdClose size={50} />
                </div>
            </div>
            <div className={styles.buySection}>
                <div className={styles.totalCart}><p>Total</p>
                <div><span>R$ {preço}</span></div></div>
                
                <Button id={styles.buttonCart}>Compre Tudo</Button>
            </div>
        </div></>
    )
}