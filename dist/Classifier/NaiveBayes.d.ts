import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class NaiveBayes extends Classifier {
    /**
     * Training algorithm for Naive Bayes algorithm with a continuous data set.
     *
     * @param priorDistribution Probability distribution of classes P(C_i)
     * @param classLists        Instances are divided into K lists, where each list contains only instances from a single class
     */
    private trainContinuousVersion;
    /**
     * Training algorithm for Naive Bayes algorithm with a discrete data set.
     * @param priorDistribution Probability distribution of classes P(C_i)
     * @param classLists Instances are divided into K lists, where each list contains only instances from a single class
     */
    private trainDiscreteVersion;
    /**
     * Training algorithm for Naive Bayes algorithm. It basically calls trainContinuousVersion for continuous data sets,
     * trainDiscreteVersion for discrete data sets.
     * @param trainSet Training data given to the algorithm
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the naive Bayes model from an input file.
     * @param fileName File name of the naive Bayes model.
     */
    loadModel(fileName: string): void;
}
