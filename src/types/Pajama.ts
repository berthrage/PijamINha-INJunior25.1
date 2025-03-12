import Sale from "./Sale";

interface Pajama {
    name: string,
    description: string,
    image: string,
    price: number,
    season: string,
    type: string | number,
    gender: string | number,
    favorite: boolean,
    on_sale: boolean,
    sale_percent?: number,
    sales: Sale[],
}

export default Pajama;