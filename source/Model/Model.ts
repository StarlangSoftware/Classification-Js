import {Instance} from "../Instance/Instance";
import {CounterHashMap} from "nlptoolkit-datastructure/dist/CounterHashMap";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {InstanceList} from "../InstanceList/InstanceList";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {Parameter} from "../Parameter/Parameter";
import {DiscreteAttribute} from "../Attribute/DiscreteAttribute";
import {DiscreteIndexedAttribute} from "../Attribute/DiscreteIndexedAttribute";
import {Performance} from "../Performance/Performance";
import {ConfusionMatrix} from "../Performance/ConfusionMatrix";
import {DetailedClassificationPerformance} from "../Performance/DetailedClassificationPerformance";

export abstract class Model {

    abstract predict(instance: Instance): string
    abstract predictProbability(instance: Instance): Map<string, number>
    abstract saveTxt(fileName: String): void
    abstract train(trainSet: InstanceList, parameters: Parameter):void
    abstract loadModel(fileName: string): void

    /**
     * Given an array of class labels, returns the maximum occurred one.
     *
     * @param classLabels An array of class labels.
     * @return The class label that occurs most in the array of class labels (mod of class label list).
     */
    static getMaximum(classLabels: Array<string>): string{
        let frequencies = new CounterHashMap<string>();
        for (let label of classLabels) {
            frequencies.put(label);
        }
        return frequencies.max();
    }

    /**
     * Loads a single instance from a single line.
     * @param line Line containing the instance.
     * @param attributeTypes Type of the attributes of the instance. If th attribute is discrete, it is "DISCRETE",
     *                       otherwise it is "CONTINUOUS".
     * @return Instance read from the line.
     */
    loadInstance(line: string, attributeTypes: string[]): Instance{
        let items = line.split(",")
        let instance = new Instance(items[items.length - 1])
        for (let i = 0; i < items.length - 1; i++){
            switch (attributeTypes[i]){
                case "DISCRETE":
                    instance.addAttribute(items[i])
                    break
                case "CONTINUOUS":
                    instance.addAttribute(parseFloat(items[i]))
                    break
            }
        }
        return instance
    }

    /**
     * Loads a discrete distribution from an input model file
     * @param input Input model file.
     * @return Discrete distribution read from an input model file.
     */
    static loadDiscreteDistribution(input: FileContents): DiscreteDistribution{
        let distribution = new DiscreteDistribution()
        let size = parseInt(input.readLine())
        for (let i = 0; i < size; i++){
            let line = input.readLine()
            let items = line.split(" ")
            let count = parseInt(items[1])
            for (let j = 0; j < count; j++){
                distribution.addItem(items[0])
            }
        }
        return distribution
    }

    /**
     * Loads an instance list from an input model file.
     * @param input Input model file.
     * @return Instance list read from an input model file.
     */
    loadInstanceList(input: FileContents): InstanceList{
        let types = input.readLine().split(" ")
        let instanceCount = parseInt(input.readLine())
        let instanceList = new InstanceList()
        for (let i = 0; i < instanceCount; i++){
            instanceList.add(this.loadInstance(input.readLine(), types))
        }
        return instanceList;
    }

    /**
     * Loads a matrix from an input model file.
     * @param input Input model file.
     * @return Matrix read from the input model file.
     */
    loadMatrix(input: FileContents): Matrix{
        let items = input.readLine().split(" ")
        let matrix = new Matrix(parseInt(items[0]), parseInt(items[1]))
        for (let j = 0; j < matrix.getRow(); j++){
            let line = input.readLine()
            items = line.split(" ")
            for (let k = 0; k < matrix.getColumn(); k++){
                matrix.setValue(j, k, parseFloat(items[k]))
            }
        }
        return matrix
    }

    /**
     * Checks given instance's attribute and returns true if it is a discrete indexed attribute, false otherwise.
     *
     * @param instance Instance to check.
     * @return True if instance is a discrete indexed attribute, false otherwise.
     */
    discreteCheck(instance: Instance): boolean{
        for (let i = 0; i < instance.attributeSize(); i++) {
            if (instance.getAttribute(i) instanceof DiscreteAttribute &&
                !(instance.getAttribute(i) instanceof DiscreteIndexedAttribute)) {
                return false;
            }
        }
        return true;
    }

    /**
     * TestClassification an instance list with the current model.
     *
     * @param testSet Test data (list of instances) to be tested.
     * @return The accuracy (and error) of the model as an instance of Performance class.
     */
    test(testSet: InstanceList): Performance{
        let classLabels = testSet.getUnionOfPossibleClassLabels();
        let confusion = new ConfusionMatrix(classLabels);
        for (let i = 0; i < testSet.size(); i++) {
            let instance = testSet.get(i);
            confusion.classify(instance.getClassLabel(), this.predict(instance));
        }
        return new DetailedClassificationPerformance(confusion);
    }

    /**
     * Runs current classifier with the given train and test data.
     *
     * @param parameter Parameter of the classifier to be trained.
     * @param trainSet  Training data to be used in training the classifier.
     * @param testSet   Test data to be tested after training the model.
     * @return The accuracy (and error) of the trained model as an instance of Performance class.
     * @throws DiscreteFeaturesNotAllowed Exception for discrete features.
     */
    singleRun(parameter: Parameter, trainSet: InstanceList, testSet: InstanceList): Performance{
        this.train(trainSet, parameter);
        return this.test(testSet);
    }

}