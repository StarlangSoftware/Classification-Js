"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaggingModel = void 0;
const TreeEnsembleModel_1 = require("./TreeEnsembleModel");
const InstanceList_1 = require("../../InstanceList/InstanceList");
const DecisionTree_1 = require("../DecisionTree/DecisionTree");
const DecisionNode_1 = require("../DecisionTree/DecisionNode");
class BaggingModel extends TreeEnsembleModel_1.TreeEnsembleModel {
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
        this.forest = new Array();
        for (let i = 0; i < forestSize; i++) {
            let bootstrap = trainSet.bootstrap(i);
            let tree = new DecisionTree_1.DecisionTree(new DecisionNode_1.DecisionNode(new InstanceList_1.InstanceList(bootstrap.getSample()), undefined, undefined, false));
            this.forest.push(tree);
        }
    }
    /**
     * Loads the Bagging ensemble model from an input file.
     * @param fileName File name of the decision tree model.
     */
    loadModel(fileName) {
        this.constructor2(fileName);
    }
}
exports.BaggingModel = BaggingModel;
//# sourceMappingURL=BaggingModel.js.map