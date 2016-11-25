"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const insert_1 = require("./insert");
function default_1(db, tableName, id, item) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.query(`DELETE FROM "${tableName}" WHERE "Id" = $1`, [id]);
        return yield insert_1.default(db, tableName, [Object.assign({}, item, { Id: id })]);
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=replace.js.map