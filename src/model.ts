import { Edm, odata } from "odata-v4-server";
import connect from "./utils/connect";

@Edm.Annotate({
  term: "UI.DisplayName",
  string: "Products"
})
export class Product {
  @Edm.Key
  @Edm.Computed
  @Edm.Int32
  @Edm.Annotate({
    term: "UI.DisplayName",
    string: "Product identifier"
  }, {
      term: "UI.ControlHint",
      string: "ReadOnly"
    })
  Id: number

  @Edm.Int32
  @Edm.Required
  CategoryId: number

  @Edm.EntityType("Category")
  @Edm.Partner("Products")
  Category: Category

  @Edm.Boolean
  Discontinued: boolean

  @Edm.String
  @Edm.Annotate({
    term: "UI.DisplayName",
    string: "Product title"
  }, {
      term: "UI.ControlHint",
      string: "ShortText"
    })
  Name: string

  @Edm.String
  @Edm.Annotate({
    term: "UI.DisplayName",
    string: "Product English name"
  }, {
      term: "UI.ControlHint",
      string: "ShortText"
    })
  QuantityPerUnit: string

  @Edm.Decimal
  @Edm.Annotate({
    term: "UI.DisplayName",
    string: "Unit price of product"
  }, {
      term: "UI.ControlHint",
      string: "Decimal"
    })
  UnitPrice: number

  @Edm.Function
  @Edm.Decimal
  getUnitPrice( @odata.result result: Product) {
    return result.UnitPrice;
  }

  @Edm.Action
  async invertDiscontinued( @odata.result result: Product) {
    const db = await connect();
    await db.query(`UPDATE "Products" SET "Discontinued" = $1 WHERE "Id" = $2`, [!result.Discontinued, result.Id]);
  }

  @Edm.Action
  async setDiscontinued( @odata.result result: Product, @Edm.Boolean value: boolean) {
    const db = await connect();
    await db.query(`UPDATE "Products" SET "Discontinued" = $1 WHERE "Id" = $2`, [value, result.Id]);
  }
}

@Edm.Annotate({
  term: "UI.DisplayName",
  string: "Categories"
})
export class Category {
  @Edm.Key
  @Edm.Computed
  @Edm.Int32
  @Edm.Annotate({
    term: "UI.DisplayName",
    string: "Category identifier"
  },
    {
      term: "UI.ControlHint",
      string: "ReadOnly"
    })
  Id: number

  @Edm.String
  Description: string

  @Edm.String
  @Edm.Annotate({
    term: "UI.DisplayName",
    string: "Category name"
  },
    {
      term: "UI.ControlHint",
      string: "ShortText"
    })
  Name: string

  @Edm.Collection(Edm.EntityType("Product"))
  @Edm.Partner("Category")
  Products: Product[]
}