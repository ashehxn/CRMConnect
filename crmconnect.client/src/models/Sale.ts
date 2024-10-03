import { Customer } from './Customer';

export interface Sale {
    saleId: number;
    productName: string;
    saleAmount: number;
    saleDate: Date;
    salesRepId?: number;
    salesRepresentative?: SalesRepresentative;
    customerId?: number;
    customer?: Customer;
}
export interface SalesRepresentative {
    salesRepId: number;
    name: string;
    email: string;
}