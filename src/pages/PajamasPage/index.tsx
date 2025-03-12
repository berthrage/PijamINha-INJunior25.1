import { useEffect } from 'react';
import usePajamasStore from '../../stores/PajamasStore';
import styles from './styles.module.css';
import ProductCardStandard from '../../components/ProductCardStandard';

export default function PajamasPage() {
    const { pajamas, fetchPajamas, errorCode } = usePajamasStore();

    useEffect(() => {
        fetchPajamas();
    }, [fetchPajamas]);

    return (
        <>
            <div className={styles.pajamasSection}>
                {pajamas.length === 0 ? (
                    <h1>{errorCode ? `Erro ${errorCode} ao carregar pijamas` : 'Carregando pijamas...'}</h1>
                ) : (
                    pajamas.map(pajama =>
                        <ProductCardStandard pajama={pajama}></ProductCardStandard>
                    )
                )}
            </div>
        </>
    )
}