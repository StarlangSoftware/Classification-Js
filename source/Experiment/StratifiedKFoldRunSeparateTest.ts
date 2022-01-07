import {KFoldRunSeparateTest} from "./KFoldRunSeparateTest";
import {Experiment} from "./Experiment";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {Partition} from "../InstanceList/Partition";
import {StratifiedKFoldCrossValidation} from "nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation";
import {Instance} from "../Instance/Instance";

export class StratifiedKFoldRunSeparateTest extends KFoldRunSeparateTest{

    /**
     * Constructor for StratifiedKFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation.
     *
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
        let instanceList = experiment.getDataSet().getInstanceList();
        let partition = new Partition(instanceList, 0.25, true);
        let crossValidation = new StratifiedKFoldCrossValidation<Instance>(new Partition(partition.get(1)).getLists(), this.K, experiment.getParameter().getSeed());
        this.runExperiment(experiment.getClassifier(), experiment.getParameter(), result, crossValidation, partition.get(0));
        return result;
    }
}