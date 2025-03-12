import { useEffect, useRef, useState } from 'react';
import usePajamasStore from '../../stores/PajamasStore';
import styles from './styles.module.css';
import ProductCardStandard from '../../components/ProductCardStandard';

export default function PajamasPage() {
    const { pajamas, fetchPajamas, errorCode } = usePajamasStore();
    const [itemsPerRow, setItemsPerRow] = useState(4);
    const initialPage = localStorage.getItem('pajamasCurrentPage')? parseInt(localStorage.getItem('pajamasCurrentPage')!) : 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const itemsPerPage = 12;
    const listContainerRef = useRef<HTMLDivElement>(null);
    const cardScale = 0.9;

    useEffect(() => {
        fetchPajamas();
    }, [fetchPajamas]);

    useEffect(() => {
        const handleResize = () => {
            if (listContainerRef.current) {
                const listContainerWidth = listContainerRef.current.offsetWidth;
                const productCardWidth = 408; 
                const newItemsPerRow = Math.floor(listContainerWidth / productCardWidth);
                setItemsPerRow(newItemsPerRow);
                console.log('Items per row:', newItemsPerRow);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [cardScale]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPajamas = pajamas.slice(startIndex, endIndex);
    const totalPages = Math.ceil(pajamas.length / itemsPerPage);

    return (
        <>
            <div className={styles.pajamasSection}>
                <div className={styles.pajamasList} ref={listContainerRef}>
                    <ul>
                        {currentPajamas.length === 0 ? (
                            <h1>{errorCode ? `Erro ${errorCode} ao carregar pijamas` : 'Carregando pijamas...'}</h1>
                        ) : (
                            currentPajamas.map((pajama, index) => {
                                const rowIndex = index % itemsPerRow;
                                return (
                                    <li key={pajama.name}>
                                        <ProductCardStandard
                                            pajama={pajama}
                                            id={styles.pajamaCard}
                                            fadeInTimeout={rowIndex * 70}
                                            itemsPerRow={itemsPerRow}
                                            scale={cardScale}
                                            fadeInThreshold={0.04}
                                        />
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
                <div className={styles.pagination}>
                    <button 
                        onClick={() => {
                                            setCurrentPage(prev => Math.max(prev - 1, 1));
                                            localStorage.setItem('pajamasCurrentPage', (currentPage - 1).toString());
                                        }} 
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button 
                        onClick={() => {
                                            setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                            localStorage.setItem('pajamasCurrentPage', (currentPage + 1).toString());
                                        }} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>

                <div className={styles.paginationCarousel}>
                    
                </div>
            </div>
        </>
    );
}