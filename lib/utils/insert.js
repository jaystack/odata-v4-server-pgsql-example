"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const ramda_1 = require("ramda");
/**
 * This function returns a clause string such as:
 * ($1, $2, $3),
 * ($2, $3, $4),
 * ($5, $5, $7)
 *
 * The parameters are the
 * 	1) the items in Object[] format: [{Id: 1, Name: 'foo', Active: true}]
 * 	2) if you provide types, it will enforce the type annotation such as:
 * 		($1::int, $2::varchar, $3::boolean),
 * 		($2::int, $3::varchar, $4::boolean),
 * 		($5::int, $5::varchar, $7::boolean)
 */
function getPrepareClause(items, types) {
    const metaColumns = Array.from({ length: Object.keys(items[0]).length });
    return items.map((item, i) => '(' + metaColumns.map((_, j) => types ? `$${i * metaColumns.length + j + 1}::${types[j]}` : `$${i * metaColumns.length + j + 1}`).join(', ') + ')').join(',\n');
}
function ensureIdIncrement(db, tableName, items) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!items.some(item => "Id" in item))
            return;
        const { rows: [{ "?column?": max }] } = yield db.query(`SELECT MAX("Id")+1 FROM "${tableName}"`);
        yield db.query(`ALTER SEQUENCE "${tableName}_Id_seq" RESTART WITH ${max}`);
    });
}
function default_1(db, tableName, items, propertyNameProjection, types) {
    return __awaiter(this, void 0, void 0, function* () {
        if (items.length === 0)
            return;
        const properties = propertyNameProjection || Object.keys(items[0]);
        const clause = `INSERT INTO "${tableName}"
							      (${properties.map(propName => `"${propName}"`).join(', ')})
						      VALUES
							      ${getPrepareClause(items, types)}
						      RETURNING *`;
        const values = ramda_1.flatten(items.map(item => properties.map(propName => item[propName])));
        const insertionResult = yield db.query(clause, values);
        yield ensureIdIncrement(db, tableName, items);
        return insertionResult;
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=insert.js.map