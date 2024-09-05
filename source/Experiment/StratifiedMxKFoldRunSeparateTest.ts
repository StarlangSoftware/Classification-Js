import {StratifiedKFoldRunSeparateTest} from "./StratifiedKFoldRunSeparateTest";
import {Experiment} from "./Experiment";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {Partition} from "../InstanceList/Partition";
import {Instance} from "../Instance/Instance";
import {StratifiedKFoldCrossValidation} from "nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation";

export class StratifiedMxKFoldRunSeparateTest extends StratifiedKFoldRunSeparateTest{

    protected M: number

    /**
     * Constructor for StratifiedMxKFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation and M for the number of times.
     *
     * @param M number of cross-validation times.
     * @param K K of the K-fold cross-validation.
     */
    constructor(M: number, K: number) {
        super(K);
        this.M = M
    }

    /**
     * Execute the Stratified MxK-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance {
        let result = new ExperimentPerformance();
        let instanceList = experiment.getDataSet().getInstanceList();
        let partition = new Partition(instanceList, 0.25, true);
        for (let j = 0; j < this.M; j++) {
            let crossValidation = new StratifiedKFoldCrossValidation<Instance>(new Partition(partition.get(1)).getLists(),
                this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation, partition.get(0));
        }
        return result;
    }
}