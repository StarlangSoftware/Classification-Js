import { Instance } from "../Instance/Instance";
import { FileContents } from "nlptoolkit-util/dist/FileContents";
import { InstanceList } from "../InstanceList/InstanceList";
import { Matrix } from "nlptoolkit-math/dist/Matrix";
import { DiscreteDistribution } from "nlptoolkit-math/dist/DiscreteDistribution";
import { Parameter } from "../Parameter/Parameter";
import { Performance } from "../Performance/Performance";
export declare abstract class Model {
    abstract predict(instance: Instance): string;
    abstract predictProbability(instance: Instance): Map<string, number>;
    abstract saveTxt(fileName: String): void;
    abstract train(trainSet: InstanceList, parameters: Parameter): void;
    abstract loadModel(fileName: string): void;
    /**
     * Given an array of class labels, returns the maximum occurred one.
     *
     * @param classLabels An array of class labels.
     * @return The class label that occurs most in the array of class labels (mod of class label list).
     */
    static getMaximum(classLabels: Array<string>): string;
    /**
     * Loads a single instance from a single line.
     * @param line Line containing the instance.
     * @param attributeTypes Type of the attributes of the instance. If th attribute is discrete, it is "DISCRETE",
     *                       otherwise it is "CONTINUOUS".
     * @return Instance read from the line.
     */
    loadInstance(line: string, attributeTypes: string[]): Instance;
    /**
     * Loads a discrete distribution from an input model file
     * @param input Input model file.
     * @return Discrete distribution read from an input model file.
     */
    static loadDiscreteDistribution(input: FileContents): DiscreteDistribution;
    /**
     * Loads an instance list from an input model file.
     * @param input Input model file.
     * @return Instance list read from an input model file.
     */
    loadInstanceList(input: FileContents): InstanceList;
    /**
     * Loads a matrix from an input model file.
     * @param input Input model file.
     * @return Matrix read from the input model file.
     */
    loadMatrix(input: FileContents): Matrix;
    /**
     * Checks given instance's attribute and returns true if it is a discrete indexed attribute, false otherwise.
     *
     * @param instance Instance to check.
     * @return True if instance is a discrete indexed attribute, false otherwise.
     */
    discreteCheck(instance: Instance): boolean;
    /**
     * TestClassification an instance list with the current model.
     *
     * @param testSet Test data (list of instances) to be tested.
     * @return The accuracy (and error) of the model as an instance of Performance class.
     */
    test(testSet: InstanceList): Performance;
    /**
     * Runs current classifier with the given train and test data.
     *
     * @param parameter Parameter of the classifier to be trained.
     * @param trainSet  Training data to be used in training the classifier.
     * @param testSet   Test data to be tested after training the model.
     * @return The accuracy (and error) of the trained model as an instance of Performance class.
     * @throws DiscreteFeaturesNotAllowed Exception for discrete features.
     */
    singleRun(parameter: Parameter, trainSet: InstanceList, testSet: InstanceList): Performance;
}
