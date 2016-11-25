import { ODataController, ODataQuery } from "odata-v4-server";
import { Product, Category } from "./model";
export declare class ProductsController extends ODataController {
    select(query: ODataQuery): Promise<Product[]>;
    selectOne(key: number, query: ODataQuery): Promise<Product>;
    getCategory(product: Product, query: ODataQuery): Promise<Category>;
    setCategory(key: number, link: number): Promise<number>;
    unsetCategory(key: number): Promise<number>;
    insert(data: any): Promise<Product>;
    upsert(key: number, data: any, context: any): Promise<Product>;
    update(key: number, delta: any): Promise<number>;
    remove(key: number): Promise<number>;
    getCheapest(): Promise<Product>;
    getInPriceRange(min: number, max: number): Promise<Product[]>;
    swapPrice(a: number, b: number): Promise<void>;
    discountProduct(productId: number, percent: number): Promise<void>;
}
export declare class CategoriesController extends ODataController {
    select(query: ODataQuery): Promise<Category[]>;
    selectOne(key: number, query: ODataQuery): Promise<Category>;
    getProducts(category: Category, query: ODataQuery): Promise<Product[]>;
    getProduct(key: number, category: Category, query: ODataQuery): Promise<Product>;
    setCategory(key: number, link: string): Promise<number>;
    unsetCategory(key: number, link: string): Promise<number>;
    insert(data: any): Promise<Category>;
    upsert(key: number, data: any, context: any): Promise<Category>;
    update(key: number, delta: any): Promise<number>;
    remove(key: number): Promise<number>;
}
