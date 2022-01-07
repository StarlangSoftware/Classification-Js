import { KFoldRunSeparateTest } from "./KFoldRunSeparateTest";
import { Experiment } from "./Experiment";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
export declare class StratifiedKFoldRunSeparateTest extends KFoldRunSeparateTest {
    /**
     * Constructor for StratifiedKFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation.
     *
     * @param K K of the K-fold cross-validation.
     */
    constructor(K: number);
    /**
     * Execute Stratified K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance;
}
