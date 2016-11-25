import * as pg from "pg";

export default async function (db: pg.Client, tableName: string, id: number, delta: any) {

  const properties = Object.keys(delta);

  const clause = `UPDATE "${tableName}"
                  SET ${properties.map((propName, i) => `"${propName}" = $${i + 1}`).join(', ')}
                  WHERE "Id" = ${id}
                  RETURNING *`;

  const values = properties.map(propName => delta[propName]);

  return await db.query(clause, values);
}