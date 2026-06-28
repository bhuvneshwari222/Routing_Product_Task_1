export interface Iproduct {
    prodName: string;
    prodID: string;
    prodStatus: "Delivered" | "Inprogress" | "Dispatched";
    canReturn: 0 | 1,
    image: string;
    description: string;
}

export interface IproductResp<T> {
    msg: string,
    data: T
}