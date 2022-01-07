import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
import { StatisticalTestResult } from "./StatisticalTestResult";
export declare abstract class PairedTest {
    abstract compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult;
    compare(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance, alpha: number): number;
}
