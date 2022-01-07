import { GaussianModel } from "./GaussianModel";
import { Instance } from "../Instance/Instance";
import { Vector } from "nlptoolkit-math/dist/Vector";
import { DiscreteDistribution } from "nlptoolkit-math/dist/DiscreteDistribution";
export declare class NaiveBayesModel extends GaussianModel {
    private classMeans;
    private classDeviations;
    private readonly classAttributeDistributions;
    /**
     * A constructor that sets the priorDistribution, classMeans and classDeviations.
     *
     * @param priorDistribution {@link DiscreteDistribution} input.
     * @param classMeans        A {@link Map} of String and {@link Vector}.
     * @param classDeviations   A {@link Map} of String and {@link Vector}.
     */
    constructor(priorDistribution: DiscreteDistribution, classMeans: any, classDeviations?: Map<string, Vector>);
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
}
