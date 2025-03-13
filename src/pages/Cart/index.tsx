import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Button from '../../components/Button';
import NumericStepper from '../../components/NumericStepper';
import { IoMdClose } from "react-icons/io";
import Data, { CustomerData } from '../../components/Data';
import Payment, { PaymentDetails } from '../../components/Payment';
import Concluded from '../../components/Concluded';
import '../../services/mockAPI';
import '../../services/mockAPIforOrders';

// Interface para representar um item do carrinho
interface CartItem {
    id: number;
    name: string;
    reference: string;
    size: string;
    price: number;
    stockQuantity: number;
    selectedQuantity: number;
    image: string;
}

// Interface para o registro da compra
interface PurchaseOrder {
    customerData: CustomerData;
    paymentDetails: PaymentDetails;
    items: CartItem[];
    totalAmount: number;
    orderDate: string;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showDataModal, setShowDataModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showConcludedModal, setShowConcludedModal] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerData | null>(null);
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get<CartItem[]>('/api/cart');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const removeItemFromCart = async (itemId: number) => {
        try {
            await axios.delete(`/api/cart/${itemId}`);
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const updateSelectedQuantity = async (itemId: number, newSelectedQuantity: number) => {
        try {
            await axios.put(`/api/cart/${itemId}`, { quantity: newSelectedQuantity });
            setCartItems(cartItems.map(item =>
                item.id === itemId ? { ...item, selectedQuantity: newSelectedQuantity } : item
            ));
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.selectedQuantity, 0);
    };

    const handleBuyAll = () => {
        setShowDataModal(true);
    };

    const handleDataSubmit = (data: CustomerData) => {
        setCustomerData(data);
        setShowDataModal(false);
        setShowPaymentModal(true);
    };

    const handlePaymentSubmit = async (details: PaymentDetails) => {
        try {
            setPaymentDetails(details);
            setIsProcessing(true);
            
            // Criar objeto com todos os dados da compra
            const purchaseOrder: PurchaseOrder = {
                customerData: customerData!,
                paymentDetails: details,
                items: cartItems,
                totalAmount: details.method === 'pix' && details.totalWithDiscount 
                    ? details.totalWithDiscount 
                    : calculateTotal(),
                orderDate: new Date().toISOString()
            };
            
            // Enviar dados para o backend
            await axios.post('/api/orders', purchaseOrder);
            
            // Limpar o carrinho após o processamento da compra
            await axios.delete('/api/cart/clear');
            
            setShowPaymentModal(false);
            setShowConcludedModal(true);
        } catch (error) {
            console.error('Error processing purchase:', error);
            alert('Ocorreu um erro ao processar sua compra. Por favor, tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleBackToData = () => {
        setShowPaymentModal(false);
        setShowDataModal(true);
    };

    const handleCompletePurchase = () => {
        setShowConcludedModal(false);
        setCartItems([]);  // Limpar carrinho na interface
    };

    return (
        <div className={styles.cartSection}>
            {cartItems.map(item => (
                <div key={item.id} className={styles.containerCart}>
                    <img src={item.image} alt="" />
                    <div className={styles.interncontainerCart}>
                        <div className={styles.titleCart}>
                            <div>
                                <h1>{item.name}</h1>
                                <p>{item.reference}</p>
                            </div>
                            <div className={styles.sizeCart}>
                                <button>{item.size}</button>
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
                            <span>Há apenas mais <span>{item.stockQuantity}</span> peças disponíveis</span>
                        </div>
                    </div>
                    <div className={styles.productpriceCart}>
                        <p>R$ {item.price}</p>
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
                        <span>R$ {calculateTotal()}</span>
                    </div>
                </div>
                <Button 
                    id={styles.buttonCart} 
                    onClick={handleBuyAll}
                    disabled={cartItems.length === 0}
                >
                    Compre Tudo
                </Button>
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
                    <Payment 
                        onSubmit={handlePaymentSubmit} 
                        onBack={handleBackToData} 
                        totalAmount={calculateTotal()}
                    />
                </div>
            )}

            {/* Modal de Conclusão */}
            {showConcludedModal && (
                <div className={styles.modalOverlay}>
                    <Concluded onClose={handleCompletePurchase} />
                </div>
            )}
        </div>
    );
};

export default Cart;