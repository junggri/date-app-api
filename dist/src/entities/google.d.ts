import { Base } from "@src/entities/BaseEntity";
interface TotalsForAllResults {
    user: string;
    session: string;
}
export declare class Google extends Base {
    totalsForAllResults: TotalsForAllResults;
    rows: number;
}
export {};
