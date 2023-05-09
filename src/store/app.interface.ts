export interface AppState {
    productList: Products,
    selectedProducts: Products,
    apiResponse?: boolean,
}
export interface Products {
    processorList: Processor[],
    motherboardList: Motherboard[],
    ramList: Ram[],
}

export interface Processor {
    productName: string,
    price?: number,
}
export interface Motherboard {
    productName: string,
    price?: number,
}
export interface Ram {
    productName: string,
    price?: number,
}
export interface CartItems {
    selectedProducts: Products,
}
