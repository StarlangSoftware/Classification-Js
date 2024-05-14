import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {Partition} from "../InstanceList/Partition";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {InstanceListOfSameClass} from "../InstanceList/InstanceListOfSameClass";
import {NaiveBayesModel} from "../Model/NaiveBayesModel";
import {DiscreteAttribute} from "../Attribute/DiscreteAttribute";

export class NaiveBayes extends Classifier{

    /**
     * Training algorithm for Naive Bayes algorithm with a continuous data set.
     *
     * @param priorDistribution Probability distribution of classes P(C_i)
     * @param classLists        Instances are divided into K lists, where each list contains only instances from a single class
     */
    private trainContinuousVersion(priorDistribution: DiscreteDistribution, classLists: Partition){
        let classMeans = new Map<string, Vector>();
        let classDeviations = new Map<string, Vector>();
        for (let i = 0; i < classLists.size(); i++){
            let classLabel = (<InstanceListOfSameClass> classLists.get(i)).getClassLabel();
            let averageVector = classLists.get(i).average().toVector();
            classMeans.set(classLabel, averageVector);
            let standardDeviationVector = classLists.get(i).standardDeviation().toVector();
            classDeviations.set(classLabel, standardDeviationVector);
        }
        this.model = new NaiveBayesModel(priorDistribution, classMeans, classDeviations);
    }

    /**
     * Training algorithm for Naive Bayes algorithm with a discrete data set.
     * @param priorDistribution Probability distribution of classes P(C_i)
     * @param classLists Instances are divided into K lists, where each list contains only instances from a single class
     */
    private trainDiscreteVersion(priorDistribution: DiscreteDistribution, classLists: Partition){
        let classAttributeDistributions = new Map<String, Array<DiscreteDistribution>>();
        for (let i = 0; i < classLists.size(); i++){
            classAttributeDistributions.set((<InstanceListOfSameClass> classLists.get(i)).getClassLabel(),
                classLists.get(i).allAttributesDistribution());
        }
        this.model = new NaiveBayesModel(priorDistribution, classAttributeDistributions);
    }

    /**
     * Training algorithm for Naive Bayes algorithm. It basically calls trainContinuousVersion for continuous data sets,
     * trainDiscreteVersion for discrete data sets.
     * @param trainSet Training data given to the algorithm
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let priorDistribution = trainSet.classDistribution();
        let classLists = new Partition(trainSet);
        if (classLists.get(0).get(0).getAttribute(0) instanceof DiscreteAttribute){
            this.trainDiscreteVersion(priorDistribution, classLists);
        } else {
            this.trainContinuousVersion(priorDistribution, classLists);
        }
    }

    /**
     * Loads the naive Bayes model from an input file.
     * @param fileName File name of the naive Bayes model.
     */
    loadModel(fileName: string): void{
        this.model = new NaiveBayesModel(fileName)
    }

}