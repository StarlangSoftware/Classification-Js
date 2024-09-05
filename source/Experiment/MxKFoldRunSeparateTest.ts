import {KFoldRunSeparateTest} from "./KFoldRunSeparateTest";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {Experiment} from "./Experiment";
import {Partition} from "../InstanceList/Partition";
import {KFoldCrossValidation} from "nlptoolkit-sampling/dist/KFoldCrossValidation";
import {Instance} from "../Instance/Instance";

export class MxKFoldRunSeparateTest extends KFoldRunSeparateTest{

    protected M: number

    /**
     * Constructor for KFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation and M for
     * the number of times.
     *
     * @param M number of cross-validation times.
     * @param K K of the K-fold cross-validation.
     */
    constructor(M: number, K: number) {
        super(K);
        this.M = M
    }

    /**
     * Execute the MxKFold run with separate test set with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance {
        let result = new ExperimentPerformance();
        let instanceList = experiment.getDataSet().getInstanceList();
        let partition = new Partition(instanceList, 0.25, true);
        for (let j = 0; j < this.M; j++) {
            let crossValidation = new KFoldCrossValidation<Instance>(partition.get(1).getInstances(), this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation, partition.get(0));
        }
        return result;
    }
}