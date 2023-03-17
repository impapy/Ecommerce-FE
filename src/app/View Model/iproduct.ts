export interface IProduct {
    _id?: string;
    name: string,
    arname: string,
    imagePath: [string],
    brand: string,
    category: string,
    arcategory: string,
    subcategory: string,
    arsubcategory: string,
    model: any,
    ModelId:any,
    description: string,
    ardescription: string,
    sellerId: any,
    price: number,
    countInStock: number,
    ratings: number,
    priceafterdiscount:  number ,
    discount: number ,
    numReviews: number,
    reviews: [
        {
            userId: string,
            name: string,
            rating: number,
            comment: string
        }
    ]
}