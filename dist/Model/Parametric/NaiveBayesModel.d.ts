import { GaussianModel } from "./GaussianModel";
import { Instance } from "../../Instance/Instance";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Parameter } from "../../Parameter/Parameter";
export declare class NaiveBayesModel extends GaussianModel {
    private classMeans;
    private classDeviations;
    private classAttributeDistributions;
    /**
     * Loads a naive Bayes model from an input model file.
     * @param fileName Model file name.
     */
    constructor3(fileName: string): void;
    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs, and it returns the log likelihood of
     * these inputs.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The log likelihood of inputs.
     */
    calculateMetric(instance: Instance, Ci: string): number;
    /**
     * The logLikelihoodContinuous method takes an {@link Instance} and a class label as inputs. First it gets the logarithm
     * of given class label's probability via prior distribution as logLikelihood. Then it loops times of given instance attribute size, and accumulates the
     * logLikelihood by calculating -0.5 * ((xi - mi) / si )** 2).
     *
     * @param classLabel String input class label.
     * @param instance   {@link Instance} input.
     * @return The log likelihood of given class label and {@link Instance}.
     */
    private logLikelihoodContinuous;
    /**
     * The logLikelihoodDiscrete method takes an {@link Instance} and a class label as inputs. First it gets the logarithm
     * of given class label's probability via prior distribution as logLikelihood and gets the class attribute distribution of given class label.
     * Then it loops times of given instance attribute size, and accumulates the logLikelihood by calculating the logarithm of
     * corresponding attribute distribution's smoothed probability by using laplace smoothing on xi.
     *
     * @param classLabel String input class label.
     * @param instance   {@link Instance} input.
     * @return The log likelihood of given class label and {@link Instance}.
     */
    private logLikelihoodDiscrete;
    saveTxt(fileName: string): void;
    /**
     * Training algorithm for Naive Bayes algorithm with a continuous data set.
     *
     * @param classLists        Instances are divided into K lists, where each list contains only instances from a single class
     */
    private trainContinuousVersion;
    /**
     * Training algorithm for Naive Bayes algorithm with a discrete data set.
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
