import { IproductCategory } from "./IproductCategory";

export interface IMovie {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    year: number;
    added: Date;
    productCategory: [{
        categoryId: number,
        category: null,
    }];

}