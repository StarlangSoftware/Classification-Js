import {KFoldRun} from "./KFoldRun";
import {Experiment} from "./Experiment";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {StratifiedKFoldCrossValidation} from "nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation";
import {Instance} from "../Instance/Instance";

export class StratifiedKFoldRun extends KFoldRun{

    /**
     * Constructor for KFoldRun class. Basically sets K parameter of the K-fold cross-validation.
     * @param K K of the K-fold cross-validation.
     */
    constructor(K: number) {
        super(K);
    }

    /**
     * Execute Stratified K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance {
        let result = new ExperimentPerformance();
        let crossValidation = new StratifiedKFoldCrossValidation<Instance>(experiment.getDataSet().getClassInstances(), this.K, experiment.getParameter().getSeed());
        this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation);
        return result;
    }

}