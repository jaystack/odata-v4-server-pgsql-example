"use strict";
function filterNullValues(item) {
    const newItem = {};
    Object.keys(item)
        .filter(key => item[key] !== null)
        .forEach(key => newItem[key] = item[key]);
    return newItem;
}
function default_1(rows) {
    return rows.map(row => Object.assign({}, filterNullValues(row), "UnitPrice" in row && row.UnitPrice !== null ?
        { UnitPrice: parseFloat(row.UnitPrice) } :
        {}));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=convertResults.js.map