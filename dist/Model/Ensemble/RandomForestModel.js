(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TreeEnsembleModel", "../../InstanceList/InstanceList", "../DecisionTree/DecisionTree", "../DecisionTree/DecisionNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomForestModel = void 0;
    const TreeEnsembleModel_1 = require("./TreeEnsembleModel");
    const InstanceList_1 = require("../../InstanceList/InstanceList");
    const DecisionTree_1 = require("../DecisionTree/DecisionTree");
    const DecisionNode_1 = require("../DecisionTree/DecisionNode");
    class RandomForestModel extends TreeEnsembleModel_1.TreeEnsembleModel {
        /**
         * Training algorithm for random forest classifier. Basically the algorithm creates K distinct decision trees from
         * K bootstrap samples of the original training set.
         *
         * @param trainSet   Training data given to the algorithm
         * @param parameters Parameters of the bagging trees algorithm. ensembleSize returns the number of trees in the random forest.
         */
        train(trainSet, parameters) {
            let forestSize = parameters.getEnsembleSize();
            this.forest = new Array();
            for (let i = 0; i < forestSize; i++) {
                let bootstrap = trainSet.bootstrap(i);
                let tree = new DecisionTree_1.DecisionTree(new DecisionNode_1.DecisionNode(new InstanceList_1.InstanceList(bootstrap.getSample()), undefined, parameters, false));
                this.forest.push(tree);
            }
        }
        /**
         * Loads the random forest model from an input file.
         * @param fileName File name of the random forest model.
         */
        loadModel(fileName) {
            this.constructor2(fileName);
        }
    }
    exports.RandomForestModel = RandomForestModel;
});
//# sourceMappingURL=RandomForestModel.js.map