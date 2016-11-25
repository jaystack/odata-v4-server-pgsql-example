import * as pg from "pg";
export default function (db: pg.Client, tableName: string, id: number, item: any): Promise<pg.QueryResult>;
