"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const odata_v4_server_1 = require("odata-v4-server");
const connect_1 = require("./utils/connect");
let Product = class Product {
    getUnitPrice(result) {
        return result.UnitPrice;
    }
    invertDiscontinued(result) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            yield db.query(`UPDATE "Products" SET "Discontinued" = $1 WHERE "Id" = $2`, [!result.Discontinued, result.Id]);
        });
    }
    setDiscontinued(result, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            yield db.query(`UPDATE "Products" SET "Discontinued" = $1 WHERE "Id" = $2`, [value, result.Id]);
        });
    }
};
__decorate([
    odata_v4_server_1.Edm.Key,
    odata_v4_server_1.Edm.Computed,
    odata_v4_server_1.Edm.Int32,
    odata_v4_server_1.Edm.Annotate({
        term: "UI.DisplayName",
        string: "Product identifier"
    }, {
        term: "UI.ControlHint",
        string: "ReadOnly"
    })
], Product.prototype, "Id", void 0);
__decorate([
    odata_v4_server_1.Edm.Int32,
    odata_v4_server_1.Edm.Required
], Product.prototype, "CategoryId", void 0);
__decorate([
    odata_v4_server_1.Edm.EntityType("Category"),
    odata_v4_server_1.Edm.Partner("Products")
], Product.prototype, "Category", void 0);
__decorate([
    odata_v4_server_1.Edm.Boolean
], Product.prototype, "Discontinued", void 0);
__decorate([
    odata_v4_server_1.Edm.String,
    odata_v4_server_1.Edm.Annotate({
        term: "UI.DisplayName",
        string: "Product title"
    }, {
        term: "UI.ControlHint",
        string: "ShortText"
    })
], Product.prototype, "Name", void 0);
__decorate([
    odata_v4_server_1.Edm.String,
    odata_v4_server_1.Edm.Annotate({
        term: "UI.DisplayName",
        string: "Product English name"
    }, {
        term: "UI.ControlHint",
        string: "ShortText"
    })
], Product.prototype, "QuantityPerUnit", void 0);
__decorate([
    odata_v4_server_1.Edm.Decimal,
    odata_v4_server_1.Edm.Annotate({
        term: "UI.DisplayName",
        string: "Unit price of product"
    }, {
        term: "UI.ControlHint",
        string: "Decimal"
    })
], Product.prototype, "UnitPrice", void 0);
__decorate([
    odata_v4_server_1.Edm.Function,
    odata_v4_server_1.Edm.Decimal,
    __param(0, odata_v4_server_1.odata.result)
], Product.prototype, "getUnitPrice", null);
__decorate([
    odata_v4_server_1.Edm.Action,
    __param(0, odata_v4_server_1.odata.result)
], Product.prototype, "invertDiscontinued", null);
__decorate([
    odata_v4_server_1.Edm.Action,
    __param(0, odata_v4_server_1.odata.result),
    __param(1, odata_v4_server_1.Edm.Boolean)
], Product.prototype, "setDiscontinued", null);
Product = __decorate([
    odata_v4_server_1.Edm.Annotate({
        term: "UI.DisplayName",
        string: "Products"
    })
], Product);
exports.Product = Product;
let Category = class Category {
};
__decorate([
    odata_v4_server_1.Edm.Key,
    odata_v4_server_1.Edm.Computed,
    odata_v4_server_1.Edm.Int32,
    odata_v4_server_1.Edm.Annotate({
        term: "UI.DisplayName",
        string: "Category identifier"
    }, {
        term: "UI.ControlHint",
        string: "ReadOnly"
    })
], Category.prototype, "Id", void 0);
__decorate([
    odata_v4_server_1.Edm.String
], Category.prototype, "Description", void 0);
__decorate([
    odata_v4_server_1.Edm.String,
    odata_v4_server_1.Edm.Annotate({
        term: "UI.DisplayName",
        string: "Category name"
    }, {
        term: "UI.ControlHint",
        string: "ShortText"
    })
], Category.prototype, "Name", void 0);
__decorate([
    odata_v4_server_1.Edm.Collection(odata_v4_server_1.Edm.EntityType("Product")),
    odata_v4_server_1.Edm.Partner("Category")
], Category.prototype, "Products", void 0);
Category = __decorate([
    odata_v4_server_1.Edm.Annotate({
        term: "UI.DisplayName",
        string: "Categories"
    })
], Category);
exports.Category = Category;
//# sourceMappingURL=model.js.map