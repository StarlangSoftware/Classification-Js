import {MxKFoldRun} from "./MxKFoldRun";
import {Experiment} from "./Experiment";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {StratifiedKFoldCrossValidation} from "nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation";
import {Instance} from "../Instance/Instance";

export class StratifiedMxKFoldRun extends MxKFoldRun{

    /**
     * Constructor for StratifiedMxKFoldRun class. Basically sets K parameter of the K-fold cross-validation and M for the number of times.
     *
     * @param M number of cross-validation times.
     * @param K K of the K-fold cross-validation.
     */
    constructor(M: number, K: number) {
        super(M, K);
    }

    /**
     * Execute the Stratified MxK-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance {
        let result = new ExperimentPerformance();
        for (let j = 0; j < this.M; j++) {
            let crossValidation = new StratifiedKFoldCrossValidation<Instance>(experiment.getDataSet().getClassInstances(),
                this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation);
        }
        return result;
    }
}