import { MultipleRun } from "./MultipleRun";
import { Experiment } from "./Experiment";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
import { Classifier } from "../Classifier/Classifier";
import { Parameter } from "../Parameter/Parameter";
import { CrossValidation } from "nlptoolkit-sampling/dist/CrossValidation";
import { Instance } from "../Instance/Instance";
export declare class KFoldRun implements MultipleRun {
    protected K: number;
    constructor(K: number);
    protected runExperiment(classifier: Classifier, parameter: Parameter, experimentPerformance: ExperimentPerformance, crossValidation: CrossValidation<Instance>): void;
    /**
     * Execute K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance;
}
