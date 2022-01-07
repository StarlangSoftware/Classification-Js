import { PairedTest } from "./PairedTest";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
import { StatisticalTestResult } from "./StatisticalTestResult";
export declare class Pairedt extends PairedTest {
    private testStatistic;
    compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult;
}
