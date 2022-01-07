import { MxKFoldRun } from "./MxKFoldRun";
import { Experiment } from "./Experiment";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
export declare class StratifiedMxKFoldRun extends MxKFoldRun {
    /**
     * Constructor for StratifiedMxKFoldRun class. Basically sets K parameter of the K-fold cross-validation and M for the number of times.
     *
     * @param M number of cross-validation times.
     * @param K K of the K-fold cross-validation.
     */
    constructor(M: number, K: number);
    /**
     * Execute the Stratified MxK-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance;
}
