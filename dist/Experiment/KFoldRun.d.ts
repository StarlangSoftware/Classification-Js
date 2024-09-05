import { MultipleRun } from "./MultipleRun";
import { Experiment } from "./Experiment";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
import { Parameter } from "../Parameter/Parameter";
import { CrossValidation } from "nlptoolkit-sampling/dist/CrossValidation";
import { Instance } from "../Instance/Instance";
import { Model } from "../Model/Model";
export declare class KFoldRun implements MultipleRun {
    protected K: number;
    /**
     * Constructor for KFoldRun class. Basically sets K parameter of the K-fold cross-validation.
     *
     * @param K K of the K-fold cross-validation.
     */
    constructor(K: number);
    /**
     * Runs a K fold cross-validated experiment for the given classifier with the given parameters. The experiment
     * results will be added to the experimentPerformance.
     * @param model Model for the experiment
     * @param parameter Hyperparameters of the classifier of the experiment
     * @param experimentPerformance Storage to add experiment results
     * @param crossValidation K-fold crossvalidated dataset.
     * @throws DiscreteFeaturesNotAllowed If the classifier does not allow discrete features and the dataset contains
     * discrete features, DiscreteFeaturesNotAllowed will be thrown.
     */
    protected runExperiment(model: Model, parameter: Parameter, experimentPerformance: ExperimentPerformance, crossValidation: CrossValidation<Instance>): void;
    /**
     * Execute K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance;
}
