function filterNullValues(item) {
  const newItem = {};
  Object.keys(item)
    .filter(key => item[key] !== null)
    .forEach(key => newItem[key] = item[key]);
  return newItem;
}

export default function (rows) {
  return rows.map(row =>
    Object.assign({}, filterNullValues(row), "UnitPrice" in row && row.UnitPrice !== null ?
      { UnitPrice: parseFloat(row.UnitPrice) } :
      {}
    )
  );
}