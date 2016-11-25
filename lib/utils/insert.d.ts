import * as pg from "pg";
export default function (db: pg.Client, tableName: string, items: any[], propertyNameProjection?: string[], types?: string[]): Promise<pg.QueryResult>;
