

export interface IOrders {
    id: number;
    companyId: number;
    created: Date;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: [ 
        {
        id: number,
        productId: number,
        product: null,
        amount: number,
        orderId: number,
    } ];

}