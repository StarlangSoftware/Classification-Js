import {StatisticalTestResultType} from "./StatisticalTestResultType";

export class StatisticalTestResult {

    private readonly pValue: number
    private readonly onlyTwoTailed: boolean

    constructor(pValue: number, onlyTwoTailed: boolean) {
        this.pValue = pValue
        this.onlyTwoTailed = onlyTwoTailed
    }

    oneTailed(alpha: number): StatisticalTestResultType{
        if (!this.onlyTwoTailed){
            if (this.pValue < alpha){
                return StatisticalTestResultType.REJECT;
            } else {
                return StatisticalTestResultType.FAILED_TO_REJECT;
            }
        }
    }

    twoTailed(alpha: number): StatisticalTestResultType{
        if (this.onlyTwoTailed){
            if (this.pValue < alpha){
                return StatisticalTestResultType.REJECT;
            } else {
                return StatisticalTestResultType.FAILED_TO_REJECT;
            }
        } else {
            if (this.pValue < alpha / 2 || this.pValue > 1 - alpha / 2){
                return StatisticalTestResultType.REJECT;
            } else {
                return StatisticalTestResultType.FAILED_TO_REJECT;
            }
        }
    }

    getPValue(): number{
        return this.pValue
    }
}