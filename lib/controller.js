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
const odata_v4_pg_1 = require("odata-v4-pg");
const convertResults_1 = require("./utils/convertResults");
const model_1 = require("./model");
const connect_1 = require("./utils/connect");
const insert_1 = require("./utils/insert");
const replace_1 = require("./utils/replace");
const update_1 = require("./utils/update");
let ProductsController = class ProductsController extends odata_v4_server_1.ODataController {
    select(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const sqlQuery = odata_v4_pg_1.createQuery(query);
            const { rows } = yield db.query(sqlQuery.from('"Products"'), sqlQuery.parameters);
            return convertResults_1.default(rows);
        });
    }
    selectOne(key, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const sqlQuery = odata_v4_pg_1.createQuery(query);
            const { rows } = yield db.query(`SELECT ${sqlQuery.select} FROM "Products"
                                   WHERE "Id" = $${sqlQuery.parameters.length + 1} AND
                                         (${sqlQuery.where})`, [...sqlQuery.parameters, key]);
            return convertResults_1.default(rows)[0];
        });
    }
    getCategory(product, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const sqlQuery = odata_v4_pg_1.createQuery(query);
            const { rows } = yield db.query(`SELECT ${sqlQuery.select} FROM "Categories"
                                   WHERE "Id" = $${sqlQuery.parameters.length + 1} AND
                                         (${sqlQuery.where})`, [...sqlQuery.parameters, product.CategoryId]);
            return convertResults_1.default(rows)[0];
        });
    }
    setCategory(key, link) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rowCount } = yield db.query(`UPDATE "Products" SET "CategoryId" = $2 WHERE "Id" = $1`, [key, link]);
            return rowCount;
        });
    }
    unsetCategory(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rowCount } = yield db.query(`UPDATE "Products" SET "CategoryId" = NULL WHERE "Id" = $1`, [key]);
            return rowCount;
        });
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rows } = yield insert_1.default(db, "Products", [data]);
            return convertResults_1.default(rows)[0];
        });
    }
    upsert(key, data, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rows } = yield replace_1.default(db, "Products", key, data);
            return convertResults_1.default(rows)[0];
        });
    }
    update(key, delta) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rows } = yield update_1.default(db, "Products", key, delta);
            return convertResults_1.default(rows)[0];
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rowCount } = yield db.query(`DELETE FROM "Products" WHERE "Id" = $1`, [key]);
            return rowCount;
        });
    }
    getCheapest() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rows } = yield db.query(`SELECT * FROM "Products" ORDER BY "UnitPrice"`);
            return convertResults_1.default(rows)[0];
        });
    }
    getInPriceRange(min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rows } = yield db.query(`SELECT * FROM "Products" WHERE "UnitPrice" >= $1 AND "UnitPrice" <= $2`, [min, max]);
            return convertResults_1.default(rows);
        });
    }
    swapPrice(a, b) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rows } = yield db.query(`SELECT "Id", "UnitPrice" FROM "Products" WHERE "Id" IN ($1, $2)`, [a, b]);
            const aProduct = rows.find(product => product.Id === a);
            const bProduct = rows.find(product => product.Id === b);
            yield db.query(`UPDATE "Products" SET "UnitPrice" = $1 WHERE "Id" = $2`, [bProduct.UnitPrice, aProduct.Id]);
            yield db.query(`UPDATE "Products" SET "UnitPrice" = $1 WHERE "Id" = $2`, [aProduct.UnitPrice, bProduct.Id]);
        });
    }
    discountProduct(productId, percent) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            yield db.query(`UPDATE "Products" SET "UnitPrice" = $1 * "UnitPrice" WHERE "Id" = $2`, [((100 - percent) / 100), productId]);
        });
    }
};
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.query)
], ProductsController.prototype, "select", null);
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.query)
], ProductsController.prototype, "selectOne", null);
__decorate([
    odata_v4_server_1.odata.GET("Category"),
    __param(0, odata_v4_server_1.odata.result),
    __param(1, odata_v4_server_1.odata.query)
], ProductsController.prototype, "getCategory", null);
__decorate([
    odata_v4_server_1.odata.POST("Category").$ref,
    odata_v4_server_1.odata.PUT("Category").$ref,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.link)
], ProductsController.prototype, "setCategory", null);
__decorate([
    odata_v4_server_1.odata.DELETE("Category").$ref,
    __param(0, odata_v4_server_1.odata.key)
], ProductsController.prototype, "unsetCategory", null);
__decorate([
    odata_v4_server_1.odata.POST,
    __param(0, odata_v4_server_1.odata.body)
], ProductsController.prototype, "insert", null);
__decorate([
    odata_v4_server_1.odata.PUT,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.body),
    __param(2, odata_v4_server_1.odata.context)
], ProductsController.prototype, "upsert", null);
__decorate([
    odata_v4_server_1.odata.PATCH,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.body)
], ProductsController.prototype, "update", null);
__decorate([
    odata_v4_server_1.odata.DELETE,
    __param(0, odata_v4_server_1.odata.key)
], ProductsController.prototype, "remove", null);
__decorate([
    odata_v4_server_1.Edm.Function,
    odata_v4_server_1.Edm.EntityType(model_1.Product)
], ProductsController.prototype, "getCheapest", null);
__decorate([
    odata_v4_server_1.Edm.Function,
    odata_v4_server_1.Edm.Collection(odata_v4_server_1.Edm.EntityType(model_1.Product)),
    __param(0, odata_v4_server_1.Edm.Decimal),
    __param(1, odata_v4_server_1.Edm.Decimal)
], ProductsController.prototype, "getInPriceRange", null);
__decorate([
    odata_v4_server_1.Edm.Action,
    __param(0, odata_v4_server_1.Edm.String),
    __param(1, odata_v4_server_1.Edm.String)
], ProductsController.prototype, "swapPrice", null);
__decorate([
    odata_v4_server_1.Edm.Action,
    __param(0, odata_v4_server_1.Edm.String),
    __param(1, odata_v4_server_1.Edm.Int32)
], ProductsController.prototype, "discountProduct", null);
ProductsController = __decorate([
    odata_v4_server_1.odata.type(model_1.Product)
], ProductsController);
exports.ProductsController = ProductsController;
let CategoriesController = class CategoriesController extends odata_v4_server_1.ODataController {
    select(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const sqlQuery = odata_v4_pg_1.createQuery(query);
            const { rows } = yield db.query(sqlQuery.from('"Categories"'), sqlQuery.parameters);
            return convertResults_1.default(rows);
        });
    }
    selectOne(key, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const sqlQuery = odata_v4_pg_1.createQuery(query);
            const { rows } = yield db.query(`SELECT ${sqlQuery.select} FROM "Categories"
                                   WHERE "Id" = $${sqlQuery.parameters.length + 1} AND
                                         (${sqlQuery.where})`, [...sqlQuery.parameters, key]);
            return convertResults_1.default(rows)[0];
        });
    }
    getProducts(category, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const sqlQuery = odata_v4_pg_1.createQuery(query);
            const { rows } = yield db.query(`SELECT ${sqlQuery.select} FROM "Products"
                                   WHERE "CategoryId" = $${sqlQuery.parameters.length + 1} AND
                                         (${sqlQuery.where})`, [...sqlQuery.parameters, category.Id]);
            return convertResults_1.default(rows);
        });
    }
    getProduct(key, category, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const sqlQuery = odata_v4_pg_1.createQuery(query);
            const { rows } = yield db.query(`SELECT ${sqlQuery.select} FROM "Products"
                                   WHERE "Id" = $${sqlQuery.parameters.length + 1} AND
                                         "CategoryId" = $${sqlQuery.parameters.length + 2} AND
                                         (${sqlQuery.where})`, [...sqlQuery.parameters, key, category.Id]);
            return convertResults_1.default(rows)[0];
        });
    }
    setCategory(key, link) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rowCount } = yield db.query(`UPDATE "Products" SET "CategoryId" = $1 WHERE "Id" = $2`, [key, link]);
            return rowCount;
        });
    }
    unsetCategory(key, link) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rowCount } = yield db.query(`UPDATE "Products" SET "CategoryId" = NULL WHERE "Id" = $1`, [key]);
            return rowCount;
        });
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rows } = yield insert_1.default(db, "Categories", [data]);
            return convertResults_1.default(rows)[0];
        });
    }
    upsert(key, data, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rows } = yield replace_1.default(db, "Categories", key, data);
            return convertResults_1.default(rows)[0];
        });
    }
    update(key, delta) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rows } = yield update_1.default(db, "Categories", key, delta);
            return convertResults_1.default(rows)[0];
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield connect_1.default();
            const { rowCount } = yield db.query(`DELETE FROM "Categories" WHERE "Id" = $1`, [key]);
            return rowCount;
        });
    }
};
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.query)
], CategoriesController.prototype, "select", null);
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.query)
], CategoriesController.prototype, "selectOne", null);
__decorate([
    odata_v4_server_1.odata.GET("Products"),
    __param(0, odata_v4_server_1.odata.result),
    __param(1, odata_v4_server_1.odata.query)
], CategoriesController.prototype, "getProducts", null);
__decorate([
    odata_v4_server_1.odata.GET("Products"),
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.result),
    __param(2, odata_v4_server_1.odata.query)
], CategoriesController.prototype, "getProduct", null);
__decorate([
    odata_v4_server_1.odata.POST("Products").$ref,
    odata_v4_server_1.odata.PUT("Products").$ref,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.link)
], CategoriesController.prototype, "setCategory", null);
__decorate([
    odata_v4_server_1.odata.DELETE("Products").$ref,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.link)
], CategoriesController.prototype, "unsetCategory", null);
__decorate([
    odata_v4_server_1.odata.POST,
    __param(0, odata_v4_server_1.odata.body)
], CategoriesController.prototype, "insert", null);
__decorate([
    odata_v4_server_1.odata.PUT,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.body),
    __param(2, odata_v4_server_1.odata.context)
], CategoriesController.prototype, "upsert", null);
__decorate([
    odata_v4_server_1.odata.PATCH,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.body)
], CategoriesController.prototype, "update", null);
__decorate([
    odata_v4_server_1.odata.DELETE,
    __param(0, odata_v4_server_1.odata.key)
], CategoriesController.prototype, "remove", null);
CategoriesController = __decorate([
    odata_v4_server_1.odata.type(model_1.Category)
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=controller.js.map