import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
import { StatisticalTestResult } from "./StatisticalTestResult";
export declare abstract class PairedTest {
    abstract compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult;
    /**
     * Compares two classification algorithms based on their performances (accuracy or error rate). The method first
     * checks the null hypothesis mu1 < mu2, if the test rejects this null hypothesis with alpha level of confidence, it
     * decides mu1 > mu2. The algorithm then checks the null hypothesis mu1 > mu2, if the test rejects that null
     * hypothesis with alpha level of confidence, if decides mu1 < mu2. If none of the two tests are rejected, it can not
     * make a decision about the performances of algorithms.
     * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
     * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
     * @param alpha Alpha level defined for the statistical test.
     * @return 1 if the performance of the first algorithm is larger than the second algorithm, -1 if the performance of
     * the second algorithm is larger than the first algorithm, 0 if they have similar performance.
     */
    compare(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance, alpha: number): number;
}
