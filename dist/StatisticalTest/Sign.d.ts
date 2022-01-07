import { PairedTest } from "./PairedTest";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
import { StatisticalTestResult } from "./StatisticalTestResult";
export declare class Sign extends PairedTest {
    private factorial;
    private binomial;
    compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult;
}
