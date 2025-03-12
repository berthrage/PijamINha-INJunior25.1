import Sale from "./Sale";

interface Address {
    zip_code: string,
    state: string,
    city: string,
    neighborhood: string,
    address: string,
    number: string,
    sales: Sale[],
}

export default Address;