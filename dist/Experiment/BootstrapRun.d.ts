import { MultipleRun } from "./MultipleRun";
import { Experiment } from "./Experiment";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
export declare class BootstrapRun implements MultipleRun {
    private numberOfBootstraps;
    /**
     * Constructor for BootstrapRun class. Basically sets the number of bootstrap runs.
     *
     * @param numberOfBootstraps Number of bootstrap runs.
     */
    constructor(numberOfBootstraps: number);
    /**
     * Execute the bootstrap run with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance;
}
