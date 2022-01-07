import { SingleRun } from "./SingleRun";
import { Experiment } from "./Experiment";
import { Instance } from "../Instance/Instance";
import { Performance } from "../Performance/Performance";
import { Classifier } from "../Classifier/Classifier";
import { Parameter } from "../Parameter/Parameter";
import { CrossValidation } from "nlptoolkit-sampling/dist/CrossValidation";
export declare class SingleRunWithK implements SingleRun {
    private K;
    constructor(K: number);
    runExperiment(classifier: Classifier, parameter: Parameter, crossValidation: CrossValidation<Instance>): Performance;
    /**
     * Execute Single K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return A Performance instance
     */
    execute(experiment: Experiment): Performance;
}
