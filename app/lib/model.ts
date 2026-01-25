export default interface User {
    id: number,
    name: string,
    userName: string,
    active: boolean
}

export interface Ministry {
    id: number,
    name: string,
    acronym: string
}

export interface Product {
    id: number,
    name: string,
    barcode: string,
    price: number,
    category: number
}

export interface SaleItem {
    product: Product;
    quantity: number;
}

export interface Member {
    name: string,
    church: string,
    phoneNumber: string
}

export interface Payment {
    receivedValue: number;
    changeValue: number | null;
    value: number;
    paymentType: number | null;
    member: Member | null;
    guid: string
}


export interface SaleItemResponse {
    name: string,
    unitPrice: number,
    quantity: number
}

export interface PaymentResponse {
    id: number,
    paymentType: number,
    value: number,
    canUpdate: boolean,
    member: Member | null
}

export interface Sale {
    id: number;
    code: string;
    saleItems: SaleItemResponse[];
    payments: PaymentResponse[];
    creationDate: Date;
    canCancel: boolean;
}

export interface Courtesy {
    id: number,
    ministry: string,
    product: string,
    quantity: number,
    creationDate: Date
}

