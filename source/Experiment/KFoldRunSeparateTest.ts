import {KFoldRun} from "./KFoldRun";
import {Classifier} from "../Classifier/Classifier";
import {Parameter} from "../Parameter/Parameter";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {InstanceList} from "../InstanceList/InstanceList";
import {CrossValidation} from "nlptoolkit-sampling/dist/CrossValidation";
import {Instance} from "../Instance/Instance";
import {Experiment} from "./Experiment";
import {KFoldCrossValidation} from "nlptoolkit-sampling/dist/KFoldCrossValidation";
import {Partition} from "../InstanceList/Partition";

export class KFoldRunSeparateTest extends KFoldRun{

    /**
     * Constructor for KFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation.
     *
     * @param K K of the K-fold cross-validation.
     */
    constructor(K: number) {
        super(K);
    }

    protected runExperiment(classifier: Classifier,
                            parameter: Parameter,
                            experimentPerformance: ExperimentPerformance,
                            crossValidation: CrossValidation<Instance>,
                            testSet?: InstanceList) {
        for (let i = 0; i < this.K; i++) {
            let trainSet = new InstanceList(crossValidation.getTrainFold(i));
            classifier.train(trainSet, parameter);
            experimentPerformance.add(classifier.test(testSet));
        }
    }

    /**
     * Execute K-fold cross-validation with separate test set with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance {
        let result = new ExperimentPerformance();
        let instanceList = experiment.getDataSet().getInstanceList();
        let partition = new Partition(instanceList, 0.25, true);
        let crossValidation = new KFoldCrossValidation<Instance>(partition.get(1).getInstances(), this.K, experiment.getParameter().getSeed());
        this.runExperiment(experiment.getClassifier(), experiment.getParameter(), result, crossValidation, partition.get(0));
        return result;
    }

}