import { ODataServer } from "odata-v4-server";
export declare class NorthwindServer extends ODataServer {
    initDb(): Promise<void>;
}
