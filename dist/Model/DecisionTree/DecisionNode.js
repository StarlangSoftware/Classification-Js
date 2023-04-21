(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../InstanceList/InstanceList", "./DecisionCondition", "../Model", "../../Attribute/DiscreteIndexedAttribute", "../../Attribute/DiscreteAttribute", "../../Attribute/ContinuousAttribute", "nlptoolkit-math/dist/DiscreteDistribution", "../../InstanceList/Partition", "../../Instance/CompositeInstance", "nlptoolkit-util/dist/RandomArray", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DecisionNode = void 0;
    const InstanceList_1 = require("../../InstanceList/InstanceList");
    const DecisionCondition_1 = require("./DecisionCondition");
    const Model_1 = require("../Model");
    const DiscreteIndexedAttribute_1 = require("../../Attribute/DiscreteIndexedAttribute");
    const DiscreteAttribute_1 = require("../../Attribute/DiscreteAttribute");
    const ContinuousAttribute_1 = require("../../Attribute/ContinuousAttribute");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    const Partition_1 = require("../../InstanceList/Partition");
    const CompositeInstance_1 = require("../../Instance/CompositeInstance");
    const RandomArray_1 = require("nlptoolkit-util/dist/RandomArray");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class DecisionNode {
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
        constructor(data, condition, parameter, isStump) {
            this.children = undefined;
            this.EPSILON = 0.0000000001;
            this.data = undefined;
            this.classLabel = undefined;
            this.leaf = false;
            this.condition = undefined;
            if (data instanceof InstanceList_1.InstanceList && (condition instanceof DecisionCondition_1.DecisionCondition || condition == undefined)) {
                this.constructor1(data, condition, parameter, isStump);
            }
            else {
                if (data instanceof FileContents_1.FileContents) {
                    this.constructor2(data);
                }
            }
        }
        constructor1(data, condition, parameter, isStump) {
            let bestAttribute = -1;
            let bestSplitValue = 0;
            if (condition instanceof DecisionCondition_1.DecisionCondition) {
                this.condition = condition;
            }
            this.data = data;
            this.classLabel = Model_1.Model.getMaximum(data.getClassLabels());
            this.leaf = true;
            let classLabels = data.getDistinctClassLabels();
            if (classLabels.length == 1) {
                return;
            }
            if (isStump && condition != null) {
                return;
            }
            let indexList;
            let size;
            if (parameter != undefined && parameter.getAttributeSubsetSize() < data.get(0).attributeSize()) {
                indexList = RandomArray_1.RandomArray.indexArray(data.get(0).attributeSize(), parameter.getSeed());
                size = parameter.getAttributeSubsetSize();
            }
            else {
                indexList = new Array();
                for (let i = 0; i < data.get(0).attributeSize(); i++) {
                    indexList.push(i);
                }
                size = data.get(0).attributeSize();
            }
            let classDistribution = data.classDistribution();
            let bestEntropy = data.classDistribution().entropy();
            for (let j = 0; j < size; j++) {
                let index = indexList[j];
                if (data.get(0).getAttribute(index) instanceof DiscreteIndexedAttribute_1.DiscreteIndexedAttribute) {
                    for (let k = 0; k < data.get(0).getAttribute(index).getMaxIndex(); k++) {
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
                }
                else {
                    if (data.get(0).getAttribute(index) instanceof DiscreteAttribute_1.DiscreteAttribute) {
                        let entropy = this.entropyForDiscreteAttribute(index);
                        if (entropy + this.EPSILON < bestEntropy) {
                            bestEntropy = entropy;
                            bestAttribute = index;
                        }
                    }
                    else {
                        if (data.get(0).getAttribute(index) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                            data.sort(index);
                            let previousValue = Number.NEGATIVE_INFINITY;
                            let leftDistribution = data.classDistribution();
                            let rightDistribution = new DiscreteDistribution_1.DiscreteDistribution();
                            for (let k = 0; k < data.size(); k++) {
                                let instance = data.get(k);
                                if (k == 0) {
                                    previousValue = instance.getAttribute(index).getValue();
                                }
                                else {
                                    if (instance.getAttribute(index).getValue() != previousValue) {
                                        let splitValue = (previousValue + instance.getAttribute(index).getValue()) / 2;
                                        previousValue = instance.getAttribute(index).getValue();
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
                if (data.get(0).getAttribute(bestAttribute) instanceof DiscreteIndexedAttribute_1.DiscreteIndexedAttribute) {
                    this.createChildrenForDiscreteIndexed(bestAttribute, bestSplitValue, parameter, isStump);
                }
                else {
                    if (data.get(0).getAttribute(bestAttribute) instanceof DiscreteAttribute_1.DiscreteAttribute) {
                        this.createChildrenForDiscrete(bestAttribute, parameter, isStump);
                    }
                    else {
                        if (data.get(0).getAttribute(bestAttribute) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                            this.createChildrenForContinuous(bestAttribute, bestSplitValue, parameter, isStump);
                        }
                    }
                }
            }
        }
        constructor2(contents) {
            let items = contents.readLine().split(" ");
            if (items[0] != "-1") {
                if (items[1][0] == '=') {
                    this.condition = new DecisionCondition_1.DecisionCondition(parseInt(items[0]), new DiscreteAttribute_1.DiscreteAttribute(items[2]), items[1][0]);
                }
                else {
                    this.condition = new DecisionCondition_1.DecisionCondition(parseInt(items[0]), new ContinuousAttribute_1.ContinuousAttribute(parseFloat(items[2])), items[1][0]);
                }
            }
            else {
                this.condition = null;
            }
            let numberOfChildren = parseInt(contents.readLine());
            if (numberOfChildren != 0) {
                this.leaf = false;
                this.children = new Array();
                for (let i = 0; i < numberOfChildren; i++) {
                    this.children.push(new DecisionNode(contents));
                }
            }
            else {
                this.leaf = true;
                this.classLabel = contents.readLine();
            }
        }
        /**
         * The entropyForDiscreteAttribute method takes an attributeIndex and creates an ArrayList of DiscreteDistribution.
         * Then loops through the distributions and calculates the total entropy.
         *
         * @param attributeIndex Index of the attribute.
         * @return Total entropy for the discrete attribute.
         */
        entropyForDiscreteAttribute(attributeIndex) {
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
        createChildrenForDiscreteIndexed(attributeIndex, attributeValue, parameter, isStump) {
            let childrenData = new Partition_1.Partition(this.data, attributeIndex, attributeValue);
            this.children = new Array();
            this.children.push(new DecisionNode(childrenData.get(0), new DecisionCondition_1.DecisionCondition(attributeIndex, new DiscreteIndexedAttribute_1.DiscreteIndexedAttribute("", attributeValue, this.data.get(0).getAttribute(attributeIndex).getMaxIndex())), parameter, isStump));
            this.children.push(new DecisionNode(childrenData.get(1), new DecisionCondition_1.DecisionCondition(attributeIndex, new DiscreteIndexedAttribute_1.DiscreteIndexedAttribute("", -1, this.data.get(0).getAttribute(attributeIndex).getMaxIndex())), parameter, isStump));
        }
        /**
         * The createChildrenForDiscrete method creates an ArrayList of values, a partition with respect to attributes and an ArrayList
         * of DecisionNodes as children.
         *
         * @param attributeIndex Index of the attribute.
         * @param parameter      RandomForestParameter like seed, ensembleSize, attributeSubsetSize.
         * @param isStump        Refers to decision trees with only 1 splitting rule.
         */
        createChildrenForDiscrete(attributeIndex, parameter, isStump) {
            let valueList = this.data.getAttributeValueList(attributeIndex);
            let childrenData = new Partition_1.Partition(this.data, attributeIndex);
            this.children = new Array();
            for (let i = 0; i < valueList.length; i++) {
                this.children.push(new DecisionNode(childrenData.get(i), new DecisionCondition_1.DecisionCondition(attributeIndex, new DiscreteAttribute_1.DiscreteAttribute(valueList[i])), parameter, isStump));
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
        createChildrenForContinuous(attributeIndex, splitValue, parameter, isStump) {
            let childrenData = new Partition_1.Partition(this.data, attributeIndex, splitValue + 0.0000001);
            this.children = new Array();
            this.children.push(new DecisionNode(childrenData.get(0), new DecisionCondition_1.DecisionCondition(attributeIndex, new ContinuousAttribute_1.ContinuousAttribute(splitValue), "<"), parameter, isStump));
            this.children.push(new DecisionNode(childrenData.get(1), new DecisionCondition_1.DecisionCondition(attributeIndex, new ContinuousAttribute_1.ContinuousAttribute(splitValue), ">"), parameter, isStump));
        }
        /**
         * The predict method takes an {@link Instance} as input and performs prediction on the DecisionNodes and returns the prediction
         * for that instance.
         *
         * @param instance Instance to make prediction.
         * @return The prediction for given instance.
         */
        predict(instance) {
            if (instance instanceof CompositeInstance_1.CompositeInstance) {
                let possibleClassLabels = instance.getPossibleClassLabels();
                let distribution = this.data.classDistribution();
                let predictedClass = distribution.getMaxItem(possibleClassLabels);
                if (this.leaf) {
                    return predictedClass;
                }
                else {
                    for (let node of this.children) {
                        if (node.condition.satisfy(instance)) {
                            let childPrediction = node.predict(instance);
                            if (childPrediction != undefined) {
                                return childPrediction;
                            }
                            else {
                                return predictedClass;
                            }
                        }
                    }
                    return predictedClass;
                }
            }
            else {
                if (this.leaf) {
                    return this.classLabel;
                }
                else {
                    for (let node of this.children) {
                        if (node.condition.satisfy(instance)) {
                            return node.predict(instance);
                        }
                    }
                    return this.classLabel;
                }
            }
        }
        predictProbabilityDistribution(instance) {
            if (this.leaf) {
                return this.data.classDistribution().getProbabilityDistribution();
            }
            else {
                for (let node of this.children) {
                    if (node.condition.satisfy(instance)) {
                        return node.predictProbabilityDistribution(instance);
                    }
                }
                return this.data.classDistribution().getProbabilityDistribution();
            }
        }
    }
    exports.DecisionNode = DecisionNode;
});
//# sourceMappingURL=DecisionNode.js.map