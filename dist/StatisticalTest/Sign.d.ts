import { PairedTest } from "./PairedTest";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
import { StatisticalTestResult } from "./StatisticalTestResult";
export declare class Sign extends PairedTest {
    /**
     * Calculates n!.
     * @param n n is n!
     * @return n!.
     */
    private factorial;
    /**
     * Calculates m of n that is C(n, m)
     * @param m m in C(m, n)
     * @param n n in C(m, n)
     * @return C(m, n)
     */
    private binomial;
    /**
     * Compares two classification algorithms based on their performances (accuracy or error rate) using sign test.
     * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
     * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
     * @return Statistical test result of the comparison.
     */
    compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult;
}
