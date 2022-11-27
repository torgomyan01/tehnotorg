interface Quotation {
    id: string;
    test: string;
    title: string;
    img: string | null;
    questions: string[];
    true: number;
    request: boolean | undefined;
}

interface IUserInfo {
    id: string | number;
    email_or_address: string;
    birthday: string;
    country: string;
    created_at: string;
    name: string;
    phone_number: string;
    status: string;
    token: string;
    updated_at: string;
    username: string;
}

interface IStateUser {
    userInfo: {
        userInfo: IUserInfo | null;
    };
}

interface IProduct {
    images: IProductImage[];
    address: IProductAddress[];
    productInfo: {
        created_at: string;
        description: string;
        id: number;
        name: string;
        updated_at: string;
    };
}

interface IProductImage {
    created_at: string;
    id: number;
    product_id: string;
    updated_at: string;
    url: string;
}

interface IProductAddress {
    address: string;
    comment: string;
    country: string;
    created_at: string;
    id: number;
    price: string;
    product_id: string;
    updated_at: string;
}
