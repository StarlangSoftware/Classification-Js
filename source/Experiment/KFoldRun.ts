import {MultipleRun} from "./MultipleRun";
import {Experiment} from "./Experiment";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {Classifier} from "../Classifier/Classifier";
import {Parameter} from "../Parameter/Parameter";
import {CrossValidation} from "nlptoolkit-sampling/dist/CrossValidation";
import {Instance} from "../Instance/Instance";
import {InstanceList} from "../InstanceList/InstanceList";
import {KFoldCrossValidation} from "nlptoolkit-sampling/dist/KFoldCrossValidation";

export class KFoldRun implements MultipleRun{

    protected K: number

    constructor(K: number) {
        this.K = K
    }

    protected runExperiment(classifier: Classifier,
                            parameter: Parameter,
                            experimentPerformance: ExperimentPerformance,
                            crossValidation: CrossValidation<Instance>){
        for (let i = 0; i < this.K; i++) {
            let trainSet = new InstanceList(crossValidation.getTrainFold(i));
            let testSet = new InstanceList(crossValidation.getTestFold(i));
            classifier.train(trainSet, parameter);
            experimentPerformance.add(classifier.test(testSet));
        }
    }

    /**
     * Execute K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance {
        let result = new ExperimentPerformance();
        let crossValidation = new KFoldCrossValidation<Instance>(experiment.getDataSet().getInstances(), this.K, experiment.getParameter().getSeed());
        this.runExperiment(experiment.getClassifier(), experiment.getParameter(), result, crossValidation);
        return result;
    }

}