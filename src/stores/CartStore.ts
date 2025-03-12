import { create } from "zustand";
import CartProduct from "../types/CartProduct";
import Pajama from "../types/Pajama";

interface CartStore {
    cart: CartProduct[];
    totalPrice: number;
    addToCart: (pajama: Pajama) => void;
    removeFromCart: (productId: number) => void;
    validateCart: (pajama: Pajama[]) => void;
    loadCart: () => void;
    clearCart: () => void;
    calculateTotalPrice: () => void;
}

const useCartStore = create<CartStore>((set: any, get: any) => {
    const savedCart = localStorage.getItem('cart');
    const initialCart: CartProduct[] = savedCart ? JSON.parse(savedCart) : [];
    
    return ({
        cart: initialCart,
        totalPrice: 0,
        
        addToCart: (pajama: Pajama) => {
            if (get().cart.length < 99) {
                const newCart: CartProduct[] = [...get().cart];
                const newCartProduct: CartProduct = {
                    pajama: pajama,
                    productId: 0,
                }
                newCart.unshift(newCartProduct);
                for(let i = 0; i < newCart.length; i++) {
                    newCart[i].productId = i;
                }
                set({cart: newCart});
                localStorage.setItem("cart", JSON.stringify(newCart));
                console.log(get().cart);
            }
        },

        removeFromCart: (productId: number) => {
            let newCart: CartProduct[] = [...get().cart];
            newCart = newCart.filter(product => product.productId !== productId);
            for(let i = 0; i < newCart.length; i++) {
                newCart[i].productId = i;
            }
            set({ cart: newCart });
            localStorage.setItem("cart", JSON.stringify(newCart));
            console.log(get().cart);
        },

        validateCart: (pajama: Pajama[]) => {
            let newCart: CartProduct[] = [...get().cart];
            newCart = newCart.filter(
              (cartProduct) =>
                pajama.some((pajama) => pajama.name === cartProduct.pajama.name) 
            );

            set({ cart: newCart });
            localStorage.setItem("cart", JSON.stringify(newCart));
            console.log(get().cart);
        },

        loadCart: () => {
            const savedCart = localStorage.getItem("cart");
            if(savedCart) {
                set({cart: JSON.parse(savedCart)});
            }
        },

        clearCart: () => {
            const newCart: CartProduct[] = [];
            set({cart: newCart});
            localStorage.setItem("cart", JSON.stringify(newCart));
        },

        calculateTotalPrice: () => {
            let price = 0;
            for (let product of get().cart) {
                price += product.pajama.preco;
            }
            set({totalPrice: price});
        }

    })
});

export default useCartStore;