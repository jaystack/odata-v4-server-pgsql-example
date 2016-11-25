export declare class Product {
    Id: number;
    CategoryId: number;
    Category: Category;
    Discontinued: boolean;
    Name: string;
    QuantityPerUnit: string;
    UnitPrice: number;
    getUnitPrice(result: Product): number;
    invertDiscontinued(result: Product): Promise<void>;
    setDiscontinued(result: Product, value: boolean): Promise<void>;
}
export declare class Category {
    Id: number;
    Description: string;
    Name: string;
    Products: Product[];
}
