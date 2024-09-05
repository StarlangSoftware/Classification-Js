import {KFoldRun} from "./KFoldRun";
import {Experiment} from "./Experiment";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {KFoldCrossValidation} from "nlptoolkit-sampling/dist/KFoldCrossValidation";
import {Instance} from "../Instance/Instance";

export class MxKFoldRun extends KFoldRun{

    protected M: number

    /**
     * Constructor for MxKFoldRun class. Basically sets K parameter of the K-fold cross-validation and M for the number of times.
     *
     * @param M number of cross-validation times.
     * @param K K of the K-fold cross-validation.
     */
    constructor(M: number, K: number) {
        super(K);
        this.M = M
    }

    /**
     * Execute the MxKFold run with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance {
        let result = new ExperimentPerformance();
        for (let j = 0; j < this.M; j++) {
            let crossValidation = new KFoldCrossValidation<Instance>(experiment.getDataSet().getInstances(), this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation);
        }
        return result;
    }

}