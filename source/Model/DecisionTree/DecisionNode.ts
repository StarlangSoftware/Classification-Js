import {InstanceList} from "../../InstanceList/InstanceList";
import {DecisionCondition} from "./DecisionCondition";
import {RandomForestParameter} from "../../Parameter/RandomForestParameter";
import {Model} from "../Model";
import {DiscreteIndexedAttribute} from "../../Attribute/DiscreteIndexedAttribute";
import {DiscreteAttribute} from "../../Attribute/DiscreteAttribute";
import {ContinuousAttribute} from "../../Attribute/ContinuousAttribute";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {Partition} from "../../InstanceList/Partition";
import {Instance} from "../../Instance/Instance";
import {CompositeInstance} from "../../Instance/CompositeInstance";
import {RandomArray} from "nlptoolkit-util/dist/RandomArray";
import {FileContents} from "nlptoolkit-util/dist/FileContents";

export class DecisionNode {

    children: Array<DecisionNode> = undefined
    private EPSILON: number = 0.0000000001;
    private data : InstanceList = undefined
    private classLabel : string = undefined
    leaf: boolean = false
    private condition: DecisionCondition = undefined

    constructor1(data: InstanceList, condition?: DecisionCondition | number, parameter?: RandomForestParameter, isStump?: boolean){
        let bestAttribute = -1
        let bestSplitValue = 0
        if (condition instanceof DecisionCondition){
            this.condition = condition;
        }
        this.data = data;
        this.classLabel = Model.getMaximum(data.getClassLabels());
        this.leaf = true;
        let classLabels = data.getDistinctClassLabels();
        if (classLabels.length == 1) {
            return;
        }
        if (isStump && condition != null) {
            return;
        }
        let indexList
        let size
        if (parameter != undefined && parameter.getAttributeSubsetSize() < data.get(0).attributeSize()) {
            indexList = RandomArray.indexArray(data.get(0).attributeSize(), parameter.getSeed())
            size = parameter.getAttributeSubsetSize();
        } else {
            indexList = new Array<number>();
            for (let i = 0; i < data.get(0).attributeSize(); i++) {
                indexList.push(i);
            }
            size = data.get(0).attributeSize();
        }
        let classDistribution = data.classDistribution();
        let bestEntropy = data.classDistribution().entropy();
        for (let j = 0; j < size; j++) {
            let index = indexList[j];
            if (data.get(0).getAttribute(index) instanceof DiscreteIndexedAttribute) {
                for (let k = 0; k < (<DiscreteIndexedAttribute>data.get(0).getAttribute(index)).getMaxIndex(); k++) {
                    let distribution = data.discreteIndexedAttributeClassDistribution(index, k);
                    if (distribution.getSum() > 0) {
                        classDistribution.removeDistribution(distribution);
                        let entropy = (classDistribution.entropy() * classDistribution.getSum() + distribution.entropy() * distribution.getSum()) / data.size();
                        if (entropy + this.EPSILON < bestEntropy) {
                            bestEntropy = entropy;
                            bestAttribute = index;
                            bestSplitValue = k;
                        }
                        classDistribution.addDistribution(distribution);
                    }
                }
            } else {
                if (data.get(0).getAttribute(index) instanceof DiscreteAttribute) {
                    let entropy = this.entropyForDiscreteAttribute(index);
                    if (entropy + this.EPSILON < bestEntropy) {
                        bestEntropy = entropy;
                        bestAttribute = index;
                    }
                } else {
                    if (data.get(0).getAttribute(index) instanceof ContinuousAttribute) {
                        data.sort(index);
                        let previousValue = Number.NEGATIVE_INFINITY;
                        let leftDistribution = data.classDistribution();
                        let rightDistribution = new DiscreteDistribution();
                        for (let k = 0; k < data.size(); k++) {
                            let instance = data.get(k);
                            if (k == 0) {
                                previousValue = (<ContinuousAttribute>instance.getAttribute(index)).getValue();
                            } else {
                                if ((<ContinuousAttribute>instance.getAttribute(index)).getValue() != previousValue) {
                                    let splitValue = (previousValue + (<ContinuousAttribute>instance.getAttribute(index)).getValue()) / 2;
                                    previousValue = (<ContinuousAttribute>instance.getAttribute(index)).getValue();
                                    let entropy = (leftDistribution.getSum() / data.size()) * leftDistribution.entropy() + (rightDistribution.getSum() / data.size()) * rightDistribution.entropy();
                                    if (entropy + this.EPSILON < bestEntropy) {
                                        bestEntropy = entropy;
                                        bestSplitValue = splitValue;
                                        bestAttribute = index;
                                    }
                                }
                            }
                            leftDistribution.removeItem(instance.getClassLabel());
                            rightDistribution.addItem(instance.getClassLabel());
                        }
                    }
                }
            }
        }
        if (bestAttribute != -1) {
            this.leaf = false;
            if (data.get(0).getAttribute(bestAttribute) instanceof DiscreteIndexedAttribute) {
                this.createChildrenForDiscreteIndexed(bestAttribute, bestSplitValue, parameter, isStump);
            } else {
                if (data.get(0).getAttribute(bestAttribute) instanceof DiscreteAttribute) {
                    this.createChildrenForDiscrete(bestAttribute, parameter, isStump);
                } else {
                    if (data.get(0).getAttribute(bestAttribute) instanceof ContinuousAttribute) {
                        this.createChildrenForContinuous(bestAttribute, bestSplitValue, parameter, isStump);
                    }
                }
            }
        }
    }

    constructor2(contents: FileContents){
        let items = contents.readLine().split(" ")
        if (items[0] != "-1"){
            if (items[1][0] == '='){
                this.condition = new DecisionCondition(parseInt(items[0]), new DiscreteAttribute(items[2]), items[1][0])
            } else {
                if (items[1][0] == ':'){
                    this.condition = new DecisionCondition(parseInt(items[0]), new DiscreteIndexedAttribute("", parseInt(items[2]), parseInt(items[3])), '=')
                } else {
                    this.condition = new DecisionCondition(parseInt(items[0]), new ContinuousAttribute(parseFloat(items[2])), items[1][0])
                }
            }
        } else {
            this.condition = null
        }
        let numberOfChildren = parseInt(contents.readLine())
        if (numberOfChildren != 0){
            this.leaf = false
            this.children = new Array<DecisionNode>()
            for (let i = 0; i < numberOfChildren; i++){
                this.children.push(new DecisionNode(contents))
            }
        } else {
            this.leaf = true
            this.classLabel = contents.readLine()
        }
    }

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
    constructor(data: InstanceList | FileContents, condition?: DecisionCondition, parameter?: RandomForestParameter, isStump?: boolean) {
        if (data instanceof InstanceList && (condition instanceof DecisionCondition || condition == undefined)){
            this.constructor1(data, condition, parameter, isStump)
        } else {
            if (data instanceof FileContents){
                this.constructor2(data)
            }
        }
    }

    /**
     * The entropyForDiscreteAttribute method takes an attributeIndex and creates an ArrayList of DiscreteDistribution.
     * Then loops through the distributions and calculates the total entropy.
     *
     * @param attributeIndex Index of the attribute.
     * @return Total entropy for the discrete attribute.
     */
    private entropyForDiscreteAttribute(attributeIndex: number): number{
        let sum = 0.0;
        let distributions = this.data.attributeClassDistribution(attributeIndex);
        for (let distribution of distributions) {
            sum += (distribution.getSum() / this.data.size()) * distribution.entropy();
        }
        return sum;
    }

    /**
     * The createChildrenForDiscreteIndexed method creates an ArrayList of DecisionNodes as children and a partition with respect to
     * indexed attribute.
     *
     * @param attributeIndex Index of the attribute.
     * @param attributeValue Value of the attribute.
     * @param parameter      RandomForestParameter like seed, ensembleSize, attributeSubsetSize.
     * @param isStump        Refers to decision trees with only 1 splitting rule.
     */
    private createChildrenForDiscreteIndexed(attributeIndex: number, attributeValue: number, parameter: RandomForestParameter, isStump: boolean){
        let childrenData = new Partition(this.data, attributeIndex, attributeValue);
        this.children = new Array<DecisionNode>();
        this.children.push(new DecisionNode(childrenData.get(0), new DecisionCondition(attributeIndex, new DiscreteIndexedAttribute("", attributeValue, (<DiscreteIndexedAttribute> this.data.get(0).getAttribute(attributeIndex)).getMaxIndex())), parameter, isStump));
        this.children.push(new DecisionNode(childrenData.get(1), new DecisionCondition(attributeIndex, new DiscreteIndexedAttribute("", -1, (<DiscreteIndexedAttribute> this.data.get(0).getAttribute(attributeIndex)).getMaxIndex())), parameter, isStump));
    }

    /**
     * The createChildrenForDiscrete method creates an ArrayList of values, a partition with respect to attributes and an ArrayList
     * of DecisionNodes as children.
     *
     * @param attributeIndex Index of the attribute.
     * @param parameter      RandomForestParameter like seed, ensembleSize, attributeSubsetSize.
     * @param isStump        Refers to decision trees with only 1 splitting rule.
     */
    private createChildrenForDiscrete(attributeIndex: number, parameter: RandomForestParameter, isStump: boolean){
        let valueList = this.data.getAttributeValueList(attributeIndex);
        let childrenData = new Partition(this.data, attributeIndex);
        this.children = new Array<DecisionNode>();
        for (let i = 0; i < valueList.length; i++) {
            this.children.push(new DecisionNode(childrenData.get(i), new DecisionCondition(attributeIndex, new DiscreteAttribute(valueList[i])), parameter, isStump));
        }
    }

    /**
     * The createChildrenForContinuous method creates an ArrayList of DecisionNodes as children and a partition with respect to
     * continuous attribute and the given split value.
     *
     * @param attributeIndex Index of the attribute.
     * @param parameter      RandomForestParameter like seed, ensembleSize, attributeSubsetSize.
     * @param isStump        Refers to decision trees with only 1 splitting rule.
     * @param splitValue     Split value is used for partitioning.
     */
    private createChildrenForContinuous(attributeIndex: number, splitValue: number, parameter: RandomForestParameter, isStump: boolean){
        let childrenData = new Partition(this.data, attributeIndex, splitValue + 0.0000001);
        this.children = new Array<DecisionNode>();
        this.children.push(new DecisionNode(childrenData.get(0), new DecisionCondition(attributeIndex, new ContinuousAttribute(splitValue), "<"), parameter, isStump));
        this.children.push(new DecisionNode(childrenData.get(1), new DecisionCondition(attributeIndex, new ContinuousAttribute(splitValue), ">"), parameter, isStump));
    }

    /**
     * The predict method takes an {@link Instance} as input and performs prediction on the DecisionNodes and returns the prediction
     * for that instance.
     *
     * @param instance Instance to make prediction.
     * @return The prediction for given instance.
     */
    predict(instance: Instance): string{
        if (instance instanceof CompositeInstance) {
            let possibleClassLabels = (<CompositeInstance> instance).getPossibleClassLabels();
            let distribution = this.data.classDistribution();
            let predictedClass = distribution.getMaxItem(possibleClassLabels);
            if (this.leaf) {
                return predictedClass;
            } else {
                for (let node of this.children) {
                    if (node.condition.satisfy(instance)) {
                        let childPrediction = node.predict(instance);
                        if (childPrediction != undefined) {
                            return childPrediction;
                        } else {
                            return predictedClass;
                        }
                    }
                }
                return predictedClass;
            }
        } else {
            if (this.leaf) {
                return this.classLabel;
            } else {
                for (let node of this.children) {
                    if (node.condition.satisfy(instance)) {
                        return node.predict(instance);
                    }
                }
                return this.classLabel;
            }
        }
    }

    predictProbabilityDistribution(instance: Instance): Map<string, number>{
        if (this.leaf) {
            return this.data.classDistribution().getProbabilityDistribution();
        } else {
            for (let node of this.children) {
                if (node.condition.satisfy(instance)) {
                    return node.predictProbabilityDistribution(instance);
                }
            }
            return this.data.classDistribution().getProbabilityDistribution();
        }
    }
}