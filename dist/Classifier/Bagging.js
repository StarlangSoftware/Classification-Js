(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../InstanceList/InstanceList", "../Model/DecisionTree/DecisionTree", "../Model/DecisionTree/DecisionNode", "../Model/TreeEnsembleModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Bagging = void 0;
    const Classifier_1 = require("./Classifier");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const DecisionTree_1 = require("../Model/DecisionTree/DecisionTree");
    const DecisionNode_1 = require("../Model/DecisionTree/DecisionNode");
    const TreeEnsembleModel_1 = require("../Model/TreeEnsembleModel");
    class Bagging extends Classifier_1.Classifier {
        /**
         * Bagging bootstrap ensemble method that creates individuals for its ensemble by training each classifier on a random
         * redistribution of the training set.
         * This training method is for a bagged decision tree classifier. 20 percent of the instances are left aside for pruning of the trees
         * 80 percent of the instances are used for training the trees. The number of trees (forestSize) is a parameter, and basically
         * the method will learn an ensemble of trees as a model.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters Parameters of the bagging trees algorithm. ensembleSize returns the number of trees in the bagged forest.
         */
        train(trainSet, parameters) {
            let forestSize = parameters.getEnsembleSize();
            let forest = new Array();
            for (let i = 0; i < forestSize; i++) {
                let bootstrap = trainSet.bootstrap(i);
                let tree = new DecisionTree_1.DecisionTree(new DecisionNode_1.DecisionNode(new InstanceList_1.InstanceList(bootstrap.getSample()), undefined, undefined, false));
                forest.push(tree);
            }
            this.model = new TreeEnsembleModel_1.TreeEnsembleModel(forest);
        }
    }
    exports.Bagging = Bagging;
});
//# sourceMappingURL=Bagging.js.map