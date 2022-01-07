import { StatisticalTestResultType } from "./StatisticalTestResultType";
export declare class StatisticalTestResult {
    private readonly pValue;
    private readonly onlyTwoTailed;
    constructor(pValue: number, onlyTwoTailed: boolean);
    oneTailed(alpha: number): StatisticalTestResultType;
    twoTailed(alpha: number): StatisticalTestResultType;
    getPValue(): number;
}
