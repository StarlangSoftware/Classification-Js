import { SingleRun } from "./SingleRun";
import { Experiment } from "./Experiment";
import { Instance } from "../Instance/Instance";
import { Performance } from "../Performance/Performance";
import { Parameter } from "../Parameter/Parameter";
import { CrossValidation } from "nlptoolkit-sampling/dist/CrossValidation";
import { Model } from "../Model/Model";
export declare class SingleRunWithK implements SingleRun {
    private readonly K;
    /**
     * Constructor for SingleRunWithK class. Basically sets K parameter of the K-fold cross-validation.
     *
     * @param K K of the K-fold cross-validation.
     */
    constructor(K: number);
    /**
     * Runs first fold of a K fold cross-validated experiment for the given classifier with the given parameters.
     * The experiment result will be returned.
     * @param model Classifier for the experiment
     * @param parameter Hyperparameters of the classifier of the experiment
     * @param crossValidation K-fold crossvalidated dataset.
     * @return The experiment result of the first fold of the K-fold cross-validated experiment.
     * @throws DiscreteFeaturesNotAllowed If the classifier does not allow discrete features and the dataset contains
     * discrete features, DiscreteFeaturesNotAllowed will be thrown.
     */
    runExperiment(model: Model, parameter: Parameter, crossValidation: CrossValidation<Instance>): Performance;
    /**
     * Execute Single K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return A Performance instance
     */
    execute(experiment: Experiment): Performance;
}
