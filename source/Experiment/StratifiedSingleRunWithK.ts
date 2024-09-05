import {Experiment} from "./Experiment";
import {Performance} from "../Performance/Performance";
import {StratifiedKFoldCrossValidation} from "nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation";
import {Instance} from "../Instance/Instance";
import {InstanceList} from "../InstanceList/InstanceList";

export class StratifiedSingleRunWithK {

    private readonly K: number

    /**
     * Constructor for StratifiedSingleRunWithK class. Basically sets K parameter of the K-fold cross-validation.
     *
     * @param K K of the K-fold cross-validation.
     */
    constructor(K: number) {
        this.K = K
    }

    /**
     * Execute Stratified Single K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return A Performance instance.
     */
    execute(experiment: Experiment): Performance{
        let crossValidation = new StratifiedKFoldCrossValidation<Instance>(experiment.getDataSet().getClassInstances(),
            this.K, experiment.getParameter().getSeed());
        let trainSet = new InstanceList(crossValidation.getTrainFold(0));
        let testSet = new InstanceList(crossValidation.getTestFold(0));
        return experiment.getmodel().singleRun(experiment.getParameter(), trainSet, testSet);
    }
}