import Address from "./Address";

interface Sale {
    buyer_name: string,
    cpf: string,
    price: number,
    address: Address,
    payment_method: string,
    installments: number,
    card_number: string,
}

export default Sale;