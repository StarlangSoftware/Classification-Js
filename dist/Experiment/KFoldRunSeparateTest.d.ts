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
    /**
     * Runs a K fold cross-validated experiment for the given classifier with the given parameters. Testing will be
     * done on the separate test set. The experiment results will be added to the experimentPerformance.
     * @param classifier Classifier for the experiment
     * @param parameter Hyperparameters of the classifier of the experiment
     * @param experimentPerformance Storage to add experiment results
     * @param crossValidation K-fold crossvalidated dataset.
     * @param testSet Test set on which experiment performance is calculated.
     * @throws DiscreteFeaturesNotAllowed If the classifier does not allow discrete features and the dataset contains
     * discrete features, DiscreteFeaturesNotAllowed will be thrown.
     */
    protected runExperiment(classifier: Classifier, parameter: Parameter, experimentPerformance: ExperimentPerformance, crossValidation: CrossValidation<Instance>, testSet?: InstanceList): void;
    /**
     * Execute K-fold cross-validation with separate test set with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance;
}
