export interface ILoginUser{
    email: string;
    password: string;
}

export interface IregisterUser{
    email: string;
    password: string;
    userRole: 'admin' | 'buyer' | 'superAdmin'
}