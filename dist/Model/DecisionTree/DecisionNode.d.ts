import { InstanceList } from "../../InstanceList/InstanceList";
import { DecisionCondition } from "./DecisionCondition";
import { RandomForestParameter } from "../../Parameter/RandomForestParameter";
import { Instance } from "../../Instance/Instance";
export declare class DecisionNode {
    children: Array<DecisionNode>;
    private EPSILON;
    private readonly data;
    private readonly classLabel;
    leaf: boolean;
    private condition;
    /**
     * The DecisionNode method takes {@link InstanceList} data as input, and then it sets the class label parameter by finding
     * the most occurred class label of given data, it then gets distinct class labels as class labels ArrayList. Later, it adds ordered
     * indices to the indexList and shuffles them randomly. Then, it gets the class distribution of given data and finds the best entropy value
     * of these class distribution.
     * <p>
     * If an attribute of given data is {@link DiscreteIndexedAttribute}, it creates a Distribution according to discrete indexed attribute class distribution
     * and finds the entropy. If it is better than the last best entropy it reassigns the best entropy, best attribute and best split value according to
     * the newly founded best entropy's index. At the end, it also adds new distribution to the class distribution .
     * <p>
     * If an attribute of given data is {@link DiscreteAttribute}, it directly finds the entropy. If it is better than the last best entropy it
     * reassigns the best entropy, best attribute and best split value according to the newly founded best entropy's index.
     * <p>
     * If an attribute of given data is {@link ContinuousAttribute}, it creates two distributions; left and right according to class distribution
     * and discrete distribution respectively, and finds the entropy. If it is better than the last best entropy it reassigns the best entropy,
     * best attribute and best split value according to the newly founded best entropy's index. At the end, it also adds new distribution to
     * the right distribution and removes from left distribution .
     *
     * @param data      {@link InstanceList} input.
     * @param condition {@link DecisionCondition} to check.
     * @param parameter RandomForestParameter like seed, ensembleSize, attributeSubsetSize.
     * @param isStump   Refers to decision trees with only 1 splitting rule.
     */
    constructor(data: InstanceList, condition: DecisionCondition, parameter: RandomForestParameter, isStump: boolean);
    /**
     * The entropyForDiscreteAttribute method takes an attributeIndex and creates an ArrayList of DiscreteDistribution.
     * Then loops through the distributions and calculates the total entropy.
     *
     * @param attributeIndex Index of the attribute.
     * @return Total entropy for the discrete attribute.
     */
    private entropyForDiscreteAttribute;
    /**
     * The createChildrenForDiscreteIndexed method creates an ArrayList of DecisionNodes as children and a partition with respect to
     * indexed attribute.
     *
     * @param attributeIndex Index of the attribute.
     * @param attributeValue Value of the attribute.
     * @param parameter      RandomForestParameter like seed, ensembleSize, attributeSubsetSize.
     * @param isStump        Refers to decision trees with only 1 splitting rule.
     */
    private createChildrenForDiscreteIndexed;
    /**
     * The createChildrenForDiscrete method creates an ArrayList of values, a partition with respect to attributes and an ArrayList
     * of DecisionNodes as children.
     *
     * @param attributeIndex Index of the attribute.
     * @param parameter      RandomForestParameter like seed, ensembleSize, attributeSubsetSize.
     * @param isStump        Refers to decision trees with only 1 splitting rule.
     */
    private createChildrenForDiscrete;
    /**
     * The createChildrenForContinuous method creates an ArrayList of DecisionNodes as children and a partition with respect to
     * continuous attribute and the given split value.
     *
     * @param attributeIndex Index of the attribute.
     * @param parameter      RandomForestParameter like seed, ensembleSize, attributeSubsetSize.
     * @param isStump        Refers to decision trees with only 1 splitting rule.
     * @param splitValue     Split value is used for partitioning.
     */
    private createChildrenForContinuous;
    /**
     * The predict method takes an {@link Instance} as input and performs prediction on the DecisionNodes and returns the prediction
     * for that instance.
     *
     * @param instance Instance to make prediction.
     * @return The prediction for given instance.
     */
    predict(instance: Instance): string;
    predictProbabilityDistribution(instance: Instance): Map<string, number>;
}
