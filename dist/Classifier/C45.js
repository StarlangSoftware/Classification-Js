(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../InstanceList/Partition", "../Model/DecisionTree/DecisionTree", "../Model/DecisionTree/DecisionNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.C45 = void 0;
    const Classifier_1 = require("./Classifier");
    const Partition_1 = require("../InstanceList/Partition");
    const DecisionTree_1 = require("../Model/DecisionTree/DecisionTree");
    const DecisionNode_1 = require("../Model/DecisionTree/DecisionNode");
    class C45 extends Classifier_1.Classifier {
        /**
         * Training algorithm for C4.5 univariate decision tree classifier. 20 percent of the data are left aside for pruning
         * 80 percent of the data is used for constructing the tree.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters -
         */
        train(trainSet, parameters) {
            let tree;
            if (parameters.isPrune()) {
                let partition = new Partition_1.Partition(trainSet, parameters.getCrossValidationRatio(), true);
                tree = new DecisionTree_1.DecisionTree(new DecisionNode_1.DecisionNode(partition.get(1), undefined, undefined, false));
                tree.prune(partition.get(0));
            }
            else {
                tree = new DecisionTree_1.DecisionTree(new DecisionNode_1.DecisionNode(trainSet, undefined, undefined, false));
            }
            this.model = tree;
        }
        /**
         * Loads the decision tree model from an input file.
         * @param fileName File name of the decision tree model.
         */
        loadModel(fileName) {
            this.model = new DecisionTree_1.DecisionTree(fileName);
        }
    }
    exports.C45 = C45;
});
//# sourceMappingURL=C45.js.map