export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export interface Customer {
    customerId: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    gender: Gender;
    industry: string;
    sales: Sale[];
    mails: Mail[];
}

export interface Sale {
    // Add relevant fields for Sale
}

export interface Mail {
    // Add relevant fields for Mail
}
