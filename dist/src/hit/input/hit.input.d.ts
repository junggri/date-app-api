export declare enum DashBoardFrequency {
    ONE_DAY = "one_day",
    SEVEN_DAY = "seven_day",
    FIFTEEN_DAY = "fifteen_day",
    ONE_MONTH = "one_month",
    THREE_MONTH = "three_month",
    SIX_MONTH = "six_month"
}
export declare class HitInput {
    postHashId: string;
}
export declare class DashBoardInput {
    frequency: DashBoardFrequency;
}
