import { ODataServer, ODataController, Edm, odata, ODataQuery } from "odata-v4-server";
import { ProductsController, CategoriesController } from "./controller";
import connect from "./utils/connect";
import categories from "./categories";
import products from "./products";
import insert from "./utils/insert";

@odata.namespace("Northwind")
@odata.controller(ProductsController, true)
@odata.controller(CategoriesController, true)
export class NorthwindServer extends ODataServer {

  @Edm.ActionImport
  async initDb() {
    const db = await connect();

    await db.query(`DROP TABLE IF EXISTS "Categories", "Products"`);

    await db.query(`CREATE TABLE "Categories" (
							"Id" SERIAL PRIMARY KEY,
							"Name" VARCHAR(32),
							"Description" VARCHAR(25)
						);`);

    await db.query(`CREATE TABLE "Products" (
							"Id" SERIAL PRIMARY KEY,
							"Name" VARCHAR(32),
							"QuantityPerUnit" VARCHAR(20),
							"UnitPrice" NUMERIC(5,2),
							"CategoryId" INT,
							"Discontinued" BOOLEAN
						);`);

    await insert(db, "Categories", categories);

    await insert(db, "Products", products);
  }
}