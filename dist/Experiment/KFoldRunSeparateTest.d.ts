import { KFoldRun } from "./KFoldRun";
import { Classifier } from "../Classifier/Classifier";
import { Parameter } from "../Parameter/Parameter";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
import { InstanceList } from "../InstanceList/InstanceList";
import { CrossValidation } from "nlptoolkit-sampling/dist/CrossValidation";
import { Instance } from "../Instance/Instance";
import { Experiment } from "./Experiment";
export declare class KFoldRunSeparateTest extends KFoldRun {
    /**
     * Constructor for KFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation.
     *
     * @param K K of the K-fold cross-validation.
     */
    constructor(K: number);
    protected runExperiment(classifier: Classifier, parameter: Parameter, experimentPerformance: ExperimentPerformance, crossValidation: CrossValidation<Instance>, testSet?: InstanceList): void;
    /**
     * Execute K-fold cross-validation with separate test set with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance;
}
