(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../ValidatedModel", "./DecisionNode", "../../Instance/CompositeInstance", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DecisionTree = void 0;
    const ValidatedModel_1 = require("../ValidatedModel");
    const DecisionNode_1 = require("./DecisionNode");
    const CompositeInstance_1 = require("../../Instance/CompositeInstance");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class DecisionTree extends ValidatedModel_1.ValidatedModel {
        /**
         * Constructor that sets root node of the decision tree.
         *
         * @param rootOrFileName DecisionNode type input or fileName
         */
        constructor(rootOrFileName) {
            super();
            if (rootOrFileName instanceof DecisionNode_1.DecisionNode) {
                this.root = rootOrFileName;
            }
            else {
                let contents = new FileContents_1.FileContents(rootOrFileName);
                this.root = new DecisionNode_1.DecisionNode(contents);
            }
        }
        /**
         * The predict method  performs prediction on the root node of given instance, and if it is null, it returns the possible class labels.
         * Otherwise it returns the returned class labels.
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
    }
    exports.DecisionTree = DecisionTree;
});
//# sourceMappingURL=DecisionTree.js.map