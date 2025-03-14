import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Button from '../../components/Button';
import NumericStepper from '../../components/NumericStepper';
import { IoMdClose } from "react-icons/io";
import Data, { CustomerData } from '../../components/Data';
import Payment, { PaymentDetails } from '../../components/Payment';
import Concluded from '../../components/Concluded';
import useCartStore from '../../stores/CartStore'; // Importe o store do carrinho

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
    const { cart, removeFromCart, calculateTotalPrice, clearCart, updateQuantity } = useCartStore(); // Use o Zustand
    const [showDataModal, setShowDataModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showConcludedModal, setShowConcludedModal] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerData | null>(null);
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        calculateTotalPrice(); // Calcular o preço total ao carregar o carrinho
    }, [cart, calculateTotalPrice]);

    const removeItemFromCart = (itemId: number) => {
        removeFromCart(itemId); // Remove o item do carrinho usando Zustand
    };

    const updateSelectedQuantity = (itemId: number, newSelectedQuantity: number) => {
        updateQuantity(itemId, newSelectedQuantity); // Atualiza a quantidade no carrinho
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.pajama.price * item.pajama.selectedQuantity, 0);
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
                items: cart.map(item => ({
                    id: item.productId,
                    name: item.pajama.name,
                    reference: item.pajama.id, // Usando o ID como referência
                    size: item.pajama.selectedSize,
                    price: item.pajama.price,
                    stockQuantity: item.pajama.sizes.find(size => size.size === item.pajama.selectedSize)?.stock_quantity || 0,
                    selectedQuantity: item.pajama.selectedQuantity,
                    image: item.pajama.image,
                })),
                totalAmount: details.method === 'pix' && details.totalWithDiscount 
                    ? details.totalWithDiscount 
                    : calculateTotal(),
                orderDate: new Date().toISOString()
            };
            
            // Enviar dados para o backend (simulado)
            console.log('Purchase Order:', purchaseOrder);
            
            // Limpar o carrinho após o processamento da compra
            clearCart();
            
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
        clearCart(); // Limpar carrinho na interface
    };

    return (
        <div className={styles.cartSection}>
            {cart.map(item => (
                <div key={item.productId} className={styles.containerCart}>
                    <img src={item.pajama.image} alt="" />
                    <div className={styles.interncontainerCart}>
                        <div className={styles.titleCart}>
                            <div>
                                <h1>{item.pajama.name}</h1>
                                <p>Ref: #{item.pajama.id}</p>
                            </div>
                            <div className={styles.sizeCart}>
                                <button>{item.pajama.selectedSize}</button>
                            </div>
                        </div>
                        <div className={styles.containerquantityCart}>
                            <p>Quantidade:</p>
                            <NumericStepper
                                quantity={item.pajama.selectedQuantity}
                                onQuantityChange={(newQuantity) => updateSelectedQuantity(item.productId, newQuantity)}
                                maxQuantity={item.pajama.sizes.find(size => size.size === item.pajama.selectedSize)?.stock_quantity || 0}
                            />
                            <span>Não perca sua oportunidade!</span>
                            <span>Há apenas mais <span>{item.pajama.sizes.find(size => size.size === item.pajama.selectedSize)?.stock_quantity || 0}</span> peças disponíveis</span>
                        </div>
                    </div>
                    <div className={styles.productpriceCart}>
                        <p>R$ {item.pajama.price}</p>
                    </div>
                    <div className={styles.icon} onClick={() => removeItemFromCart(item.productId)}>
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
                    disabled={cart.length === 0}
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