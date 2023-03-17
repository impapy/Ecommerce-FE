export interface ICart {
    _id?:string,
    items: [{
        productId:string,
        quantity:number,
        price:number,
        sellerId:any,
    }],    
    userId?:string,
    totalCount?:number,
    totalPrice:number,
}

