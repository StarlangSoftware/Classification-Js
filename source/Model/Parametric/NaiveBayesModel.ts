import {GaussianModel} from "./GaussianModel";
import {Instance} from "../../Instance/Instance";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {ContinuousAttribute} from "../../Attribute/ContinuousAttribute";
import {DiscreteAttribute} from "../../Attribute/DiscreteAttribute";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {Partition} from "../../InstanceList/Partition";
import {InstanceListOfSameClass} from "../../InstanceList/InstanceListOfSameClass";
import {InstanceList} from "../../InstanceList/InstanceList";
import {Parameter} from "../../Parameter/Parameter";

export class NaiveBayesModel extends GaussianModel{

    private classMeans: Map<string, Vector> = undefined
    private classDeviations: Map<string, Vector> = undefined
    private classAttributeDistributions: Map<string, Array<DiscreteDistribution>> = undefined

    /**
     * Loads a naive Bayes model from an input model file.
     * @param fileName Model file name.
     */
    constructor3(fileName: string) {
        let input = new FileContents(fileName)
        let size = this.loadPriorDistribution(input)
        this.classMeans = this.loadVectors(input, size)
        this.classDeviations = this.loadVectors(input, size)
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

    /**
     * Training algorithm for Naive Bayes algorithm with a continuous data set.
     *
     * @param classLists        Instances are divided into K lists, where each list contains only instances from a single class
     */
    private trainContinuousVersion(classLists: Partition){
        this.classMeans = new Map<string, Vector>();
        this.classDeviations = new Map<string, Vector>();
        for (let i = 0; i < classLists.size(); i++){
            let classLabel = (<InstanceListOfSameClass> classLists.get(i)).getClassLabel();
            let averageVector = classLists.get(i).average().toVector();
            this.classMeans.set(classLabel, averageVector);
            let standardDeviationVector = classLists.get(i).standardDeviation().toVector();
            this.classDeviations.set(classLabel, standardDeviationVector);
        }
    }

    /**
     * Training algorithm for Naive Bayes algorithm with a discrete data set.
     * @param classLists Instances are divided into K lists, where each list contains only instances from a single class
     */
    private trainDiscreteVersion(classLists: Partition){
        this.classAttributeDistributions = new Map<string, Array<DiscreteDistribution>>();
        for (let i = 0; i < classLists.size(); i++){
            this.classAttributeDistributions.set((<InstanceListOfSameClass> classLists.get(i)).getClassLabel(),
                classLists.get(i).allAttributesDistribution());
        }
    }

    /**
     * Training algorithm for Naive Bayes algorithm. It basically calls trainContinuousVersion for continuous data sets,
     * trainDiscreteVersion for discrete data sets.
     * @param trainSet Training data given to the algorithm
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        this.priorDistribution = trainSet.classDistribution();
        let classLists = new Partition(trainSet);
        if (classLists.get(0).get(0).getAttribute(0) instanceof DiscreteAttribute){
            this.trainDiscreteVersion(classLists);
        } else {
            this.trainContinuousVersion(classLists);
        }
    }

    /**
     * Loads the naive Bayes model from an input file.
     * @param fileName File name of the naive Bayes model.
     */
    loadModel(fileName: string): void{
        this.constructor3(fileName)
    }

}