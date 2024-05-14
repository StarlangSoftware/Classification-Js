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

    private readonly K: number

    /**
     * Constructor for SingleRunWithK class. Basically sets K parameter of the K-fold cross-validation.
     *
     * @param K K of the K-fold cross-validation.
     */
    constructor(K: number) {
        this.K = K
    }

    /**
     * Runs first fold of a K fold cross-validated experiment for the given classifier with the given parameters.
     * The experiment result will be returned.
     * @param classifier Classifier for the experiment
     * @param parameter Hyperparameters of the classifier of the experiment
     * @param crossValidation K-fold crossvalidated dataset.
     * @return The experiment result of the first fold of the K-fold cross-validated experiment.
     * @throws DiscreteFeaturesNotAllowed If the classifier does not allow discrete features and the dataset contains
     * discrete features, DiscreteFeaturesNotAllowed will be thrown.
     */
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