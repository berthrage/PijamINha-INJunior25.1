import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Button from '../../components/Button';
import NumericStepper from '../../components/NumericStepper';
import { IoMdClose } from "react-icons/io";
import Data from '../../components/Data'; // Componente de dados do cliente
import Payment from '../../components/Payment'; // Componente de pagamento
import Concluded from '../../components/Concluded'; // Componente de conclusão
import '../../stores/mockAPI'

// Interface para representar um item do carrinho
interface CartItem {
    id: number; // Esta variável 'id' pode ser trocada para o nome que seu back-end usa.
    name: string; // Esta variável 'name' pode ser trocada para o nome que seu back-end usa.
    reference: string; // Esta variável 'reference' pode ser trocada para o nome que seu back-end usa.
    size: string; // Esta variável 'size' pode ser trocada para o nome que seu back-end usa.
    price: number; // Esta variável 'price' pode ser trocada para o nome que seu back-end usa.
    stockQuantity: number; // Esta variável 'stockQuantity' pode ser trocada para o nome que seu back-end usa.
    selectedQuantity: number; // Esta variável 'selectedQuantity' pode ser trocada para o nome que seu back-end usa.
    image: string; // Esta variável 'image' pode ser trocada para o nome que seu back-end usa.
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showDataModal, setShowDataModal] = useState(false); // Controla a exibição do modal de dados
    const [showPaymentModal, setShowPaymentModal] = useState(false); // Controla a exibição do modal de pagamento
    const [showConcludedModal, setShowConcludedModal] = useState(false); // Controla a exibição do modal de conclusão

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get<CartItem[]>('/api/cart'); // Esta variável '/api/cart' pode ser trocada para o endpoint que seu back-end usa.
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const removeItemFromCart = async (itemId: number) => {
        try {
            await axios.delete(`/api/cart/${itemId}`); // Esta variável '/api/cart/${itemId}' pode ser trocada para o endpoint que seu back-end usa.
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const updateSelectedQuantity = async (itemId: number, newSelectedQuantity: number) => {
        try {
            await axios.put(`/api/cart/${itemId}`, { quantity: newSelectedQuantity }); // Esta variável 'quantity' pode ser trocada para o nome que seu back-end usa.
            setCartItems(cartItems.map(item =>
                item.id === itemId ? { ...item, selectedQuantity: newSelectedQuantity } : item
            ));
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const handleBuyAll = () => {
        setShowDataModal(true); // Abre o modal de dados ao clicar em "Compre Tudo"
    };

    const handleDataSubmit = () => {
        setShowDataModal(false); // Fecha o modal de dados
        setShowPaymentModal(true); // Abre o modal de pagamento
    };

    const handlePaymentSubmit = () => {
        setShowPaymentModal(false); // Fecha o modal de pagamento
        setShowConcludedModal(true); // Abre o modal de conclusão
    };

    const handleBackToData = () => {
        setShowPaymentModal(false); // Fecha o modal de pagamento
        setShowDataModal(true); // Volta para o modal de dados
    };

    return (
        <div className={styles.cartSection}>
            {cartItems.map(item => (
                <div key={item.id} className={styles.containerCart}>
                    <img src={item.image} alt="" /> {/* Esta variável 'image' pode ser trocada para o nome que seu back-end usa. */}
                    <div className={styles.interncontainerCart}>
                        <div className={styles.titleCart}>
                            <div>
                                <h1>{item.name}</h1> {/* Esta variável 'name' pode ser trocada para o nome que seu back-end usa. */}
                                <p>{item.reference}</p> {/* Esta variável 'reference' pode ser trocada para o nome que seu back-end usa. */}
                            </div>
                            <div className={styles.sizeCart}>
                                <button>{item.size}</button> {/* Esta variável 'size' pode ser trocada para o nome que seu back-end usa. */}
                            </div>
                        </div>
                        <div className={styles.containerquantityCart}>
                            <p>Quantidade:</p>
                            <NumericStepper
                                quantity={item.selectedQuantity}
                                onQuantityChange={(newQuantity) => updateSelectedQuantity(item.id, newQuantity)}
                                maxQuantity={item.stockQuantity}
                            />
                            <span>Não perca sua oportunidade!</span>
                            <span>Há apenas mais <span>{item.stockQuantity}</span> peças disponíveis</span> {/* Esta variável 'stockQuantity' pode ser trocada para o nome que seu back-end usa. */}
                        </div>
                    </div>
                    <div className={styles.productpriceCart}>
                        <p>R$ {item.price}</p> {/* Esta variável 'price' pode ser trocada para o nome que seu back-end usa. */}
                    </div>
                    <div className={styles.icon} onClick={() => removeItemFromCart(item.id)}>
                        <IoMdClose size={50} />
                    </div>
                </div>
            ))}
            <div className={styles.buySection}>
                <div className={styles.totalCart}>
                    <p>Total</p>
                    <div>
                        <span>R$ {cartItems.reduce((total, item) => total + item.price * item.selectedQuantity, 0)}</span>
                    </div>
                </div>
                <Button id={styles.buttonCart} onClick={handleBuyAll}>Compre Tudo</Button>
            </div>

            {/* Modal de Dados */}
            {showDataModal && (
                <div className={styles.modalOverlay}>
                    <Data onSubmit={handleDataSubmit} />
                </div>
            )}

            {/* Modal de Pagamento */}
            {showPaymentModal && (
                <div className={styles.modalOverlay}>
                    <Payment onSubmit={handlePaymentSubmit} onBack={handleBackToData} />
                </div>
            )}

            {/* Modal de Conclusão */}
            {showConcludedModal && (
                <div className={styles.modalOverlay}>
                    <Concluded />
                </div>
            )}
        </div>
    );
};

export default Cart;