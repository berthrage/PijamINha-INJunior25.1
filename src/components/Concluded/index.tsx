import Button from '../Button'
import FormContainer from '../FormContainer'
import Input from '../Input'
import styles from './styles.module.css'

export default function Concluded(){
    return(
        <>
        <div className={styles.concludedSection}
        ><h1>Sua compra foi concluída!</h1><p>Obrigado por comprar conosco. Volte Sempre!</p></div>
        </>
    )
}
