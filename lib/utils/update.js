"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function default_1(db, tableName, id, delta) {
    return __awaiter(this, void 0, void 0, function* () {
        const properties = Object.keys(delta);
        const clause = `UPDATE "${tableName}"
                  SET ${properties.map((propName, i) => `"${propName}" = $${i + 1}`).join(', ')}
                  WHERE "Id" = ${id}
                  RETURNING *`;
        const values = properties.map(propName => delta[propName]);
        return yield db.query(clause, values);
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=update.js.map