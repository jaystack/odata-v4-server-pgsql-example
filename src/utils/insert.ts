import * as pg from "pg";
import { flatten } from "ramda";

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

function getPrepareClause(items: any[], types?: string[]): string {
  const metaColumns = Array.from({ length: Object.keys(items[0]).length });
  return items.map(
    (item, i) => '(' + metaColumns.map(
      (_, j) => types ? `$${i * metaColumns.length + j + 1}::${types[j]}` : `$${i * metaColumns.length + j + 1}`
    ).join(', ') + ')'
  ).join(',\n');
}

async function ensureIdIncrement(db: pg.Client, tableName: string, items: any[]) {
  if (!items.some(item => "Id" in item))
    return;
  
  const {rows: [{"?column?": max}]} = await db.query(`SELECT MAX("Id")+1 FROM "${tableName}"`);

  await db.query(`ALTER SEQUENCE "${tableName}_Id_seq" RESTART WITH ${max}`);
}

export default async function (db: pg.Client, tableName: string, items: any[], propertyNameProjection?: string[], types?: string[]) {
  if (items.length === 0)
    return;
  
  const properties = propertyNameProjection || Object.keys(items[0]);

  const clause = `INSERT INTO "${tableName}"
							      (${properties.map(propName => `"${propName}"`).join(', ')})
						      VALUES
							      ${getPrepareClause(items, types)}
						      RETURNING *`;

  const values = flatten(items.map(item => properties.map(propName => item[propName])));

  const insertionResult = await db.query(clause, values);

  await ensureIdIncrement(db, tableName, items);

  return insertionResult;
}