import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {StatisticalTestResult} from "./StatisticalTestResult";
import {StatisticalTestResultType} from "./StatisticalTestResultType";

export abstract class PairedTest {

    abstract compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult

    compare(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance, alpha: number): number{
        let testResult1 = this.compareClassifiers(classifier1, classifier2);
        let testResult2 = this.compareClassifiers(classifier2, classifier1);
        let testResultType1 = testResult1.oneTailed(alpha);
        let testResultType2 = testResult2.oneTailed(alpha);
        if (testResultType1 == StatisticalTestResultType.REJECT){
            return 1;
        } else {
            if (testResultType2 == StatisticalTestResultType.REJECT){
                return -1;
            } else {
                return 0;
            }
        }
    }
}