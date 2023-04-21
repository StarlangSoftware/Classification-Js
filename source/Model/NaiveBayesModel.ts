import {GaussianModel} from "./GaussianModel";
import {Instance} from "../Instance/Instance";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {ContinuousAttribute} from "../Attribute/ContinuousAttribute";
import {DiscreteAttribute} from "../Attribute/DiscreteAttribute";
import {FileContents} from "nlptoolkit-util/dist/FileContents";

export class NaiveBayesModel extends GaussianModel{

    private classMeans: Map<string, Vector> = undefined
    private classDeviations: Map<string, Vector> = undefined
    private readonly classAttributeDistributions: Map<string, Array<DiscreteDistribution>> = undefined

    /**
     * A constructor that sets the priorDistribution, classMeans and classDeviations.
     *
     * @param priorDistribution {@link DiscreteDistribution} input.
     * @param classMeans        A {@link Map} of String and {@link Vector}.
     * @param classDeviations   A {@link Map} of String and {@link Vector}.
     */
    constructor(priorDistribution: DiscreteDistribution | string, classMeans?: any, classDeviations?: Map<string, Vector>) {
        super()
        if (priorDistribution instanceof DiscreteDistribution){
            this.priorDistribution = priorDistribution
            if (classDeviations != undefined){
                this.classMeans = classMeans
                this.classDeviations = classDeviations
            } else {
                this.classAttributeDistributions = classMeans
            }
        } else {
            let input = new FileContents(priorDistribution)
            let size = this.loadPriorDistribution(input)
            this.classMeans = this.loadVectors(input, size)
            this.classDeviations = this.loadVectors(input, size)
        }
    }

    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs, and it returns the log likelihood of
     * these inputs.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The log likelihood of inputs.
     */
    calculateMetric(instance: Instance, Ci: string): number {
        if (this.classAttributeDistributions == undefined) {
            return this.logLikelihoodContinuous(Ci, instance);
        } else {
            return this.logLikelihoodDiscrete(Ci, instance);
        }
    }

    /**
     * The logLikelihoodContinuous method takes an {@link Instance} and a class label as inputs. First it gets the logarithm
     * of given class label's probability via prior distribution as logLikelihood. Then it loops times of given instance attribute size, and accumulates the
     * logLikelihood by calculating -0.5 * ((xi - mi) / si )** 2).
     *
     * @param classLabel String input class label.
     * @param instance   {@link Instance} input.
     * @return The log likelihood of given class label and {@link Instance}.
     */
    private logLikelihoodContinuous(classLabel: string, instance: Instance): number{
        let logLikelihood = Math.log(this.priorDistribution.getProbability(classLabel));
        for (let i = 0; i < instance.attributeSize(); i++) {
            let xi = (<ContinuousAttribute> instance.getAttribute(i)).getValue();
            let mi = this.classMeans.get(classLabel).getValue(i);
            let si = this.classDeviations.get(classLabel).getValue(i);
            if (si != 0){
                logLikelihood += -0.5 * Math.pow((xi - mi) / si, 2);
            }
        }
        return logLikelihood;
    }

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
    private logLikelihoodDiscrete(classLabel: string, instance: Instance): number{
        let logLikelihood = Math.log(this.priorDistribution.getProbability(classLabel));
        let attributeDistributions = this.classAttributeDistributions.get(classLabel);
        for (let i = 0; i < instance.attributeSize(); i++) {
            let xi = (<DiscreteAttribute> instance.getAttribute(i)).getValue();
            logLikelihood += Math.log(attributeDistributions[i].getProbabilityLaplaceSmoothing(xi));
        }
        return logLikelihood;
    }

    saveTxt(fileName: string){
    }

}