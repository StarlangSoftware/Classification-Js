"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionTree = void 0;
const ValidatedModel_1 = require("../ValidatedModel");
const DecisionNode_1 = require("./DecisionNode");
const CompositeInstance_1 = require("../../Instance/CompositeInstance");
const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
const Partition_1 = require("../../InstanceList/Partition");
class DecisionTree extends ValidatedModel_1.ValidatedModel {
    root;
    constructor2(fileName) {
        let contents = new FileContents_1.FileContents(fileName);
        this.root = new DecisionNode_1.DecisionNode(contents);
    }
    constructor(root) {
        super();
        this.root = root;
    }
    /**
     * The predict method  performs prediction on the root node of given instance, and if it is null, it returns the
     * possible class labels. Otherwise, it returns the returned class labels.
     *
     * @param instance Instance make prediction.
     * @return Possible class labels.
     */
    predict(instance) {
        let predictedClass = this.root.predict(instance);
        if ((predictedClass == null) && ((instance instanceof CompositeInstance_1.CompositeInstance))) {
            predictedClass = instance.getPossibleClassLabels()[0];
        }
        return predictedClass;
    }
    /**
     * Calculates the posterior probability distribution for the given instance according to Decision tree model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance) {
        return this.root.predictProbabilityDistribution(instance);
    }
    saveTxt(fileName) {
    }
    /**
     * The prune method takes a {@link DecisionNode} and an {@link InstanceList} as inputs. It checks the classification performance
     * of given InstanceList before pruning, i.e making a node leaf, and after pruning. If the after performance is better than the
     * before performance it prune the given InstanceList from the tree.
     *
     * @param node     DecisionNode that will be pruned if conditions hold.
     * @param pruneSet Small subset of tree that will be removed from tree.
     */
    pruneNode(node, pruneSet) {
        if (node.leaf) {
            return;
        }
        let before = this.testClassifier(pruneSet);
        node.leaf = true;
        let after = this.testClassifier(pruneSet);
        if (after.getAccuracy() < before.getAccuracy()) {
            node.leaf = false;
            for (let child of node.children) {
                this.pruneNode(child, pruneSet);
            }
        }
    }
    /**
     * The prune method takes an {@link InstanceList} and  performs pruning to the root node.
     *
     * @param pruneSet {@link InstanceList} to perform pruning.
     */
    prune(pruneSet) {
        this.pruneNode(this.root, pruneSet);
    }
    /**
     * Training algorithm for C4.5 univariate decision tree classifier. 20 percent of the data are left aside for pruning
     * 80 percent of the data is used for constructing the tree.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet, parameters) {
        if (parameters.isPrune()) {
            let partition = new Partition_1.Partition(trainSet, parameters.getCrossValidationRatio(), true);
            this.root = new DecisionNode_1.DecisionNode(partition.get(1), undefined, undefined, false);
            this.prune(partition.get(0));
        }
        else {
            this.root = new DecisionNode_1.DecisionNode(trainSet, undefined, undefined, false);
        }
    }
    /**
     * Loads the decision tree model from an input file.
     * @param fileName File name of the decision tree model.
     */
    loadModel(fileName) {
        this.constructor2(fileName);
    }
}
exports.DecisionTree = DecisionTree;
//# sourceMappingURL=DecisionTree.js.map