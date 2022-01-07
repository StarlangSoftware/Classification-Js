import {SingleRun} from "./SingleRun";
import {Experiment} from "./Experiment";
import {KFoldCrossValidation} from "nlptoolkit-sampling/dist/KFoldCrossValidation";
import {Instance} from "../Instance/Instance";
import {Performance} from "../Performance/Performance";
import {InstanceList} from "../InstanceList/InstanceList";
import {Classifier} from "../Classifier/Classifier";
import {Parameter} from "../Parameter/Parameter";
import {CrossValidation} from "nlptoolkit-sampling/dist/CrossValidation";

export class SingleRunWithK implements SingleRun{

    private K: number

    constructor(K: number) {
        this.K = K
    }

    runExperiment(classifier: Classifier,
                  parameter: Parameter,
                  crossValidation: CrossValidation<Instance>){
        let trainSet = new InstanceList(crossValidation.getTrainFold(0));
        let testSet = new InstanceList(crossValidation.getTestFold(0));
        return classifier.singleRun(parameter, trainSet, testSet);
    }

    /**
     * Execute Single K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return A Performance instance
     */
    execute(experiment: Experiment): Performance {
        let crossValidation = new KFoldCrossValidation<Instance>(experiment.getDataSet().getInstances(), this.K,
            experiment.getParameter().getSeed());
        return this.runExperiment(experiment.getClassifier(), experiment.getParameter(), crossValidation);
    }

}