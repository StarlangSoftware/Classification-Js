import { Experiment } from "./Experiment";
import { Performance } from "../Performance/Performance";
export declare class StratifiedSingleRunWithK {
    private readonly K;
    /**
     * Constructor for StratifiedSingleRunWithK class. Basically sets K parameter of the K-fold cross-validation.
     *
     * @param K K of the K-fold cross-validation.
     */
    constructor(K: number);
    /**
     * Execute Stratified Single K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return A Performance instance.
     */
    execute(experiment: Experiment): Performance;
}
