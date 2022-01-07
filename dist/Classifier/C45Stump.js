(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../Model/DecisionTree/DecisionTree", "../Model/DecisionTree/DecisionNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.C45Stump = void 0;
    const Classifier_1 = require("./Classifier");
    const DecisionTree_1 = require("../Model/DecisionTree/DecisionTree");
    const DecisionNode_1 = require("../Model/DecisionTree/DecisionNode");
    class C45Stump extends Classifier_1.Classifier {
        /**
         * Training algorithm for C4.5 Stump univariate decision tree classifier.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters -
         */
        train(trainSet, parameters) {
            this.model = new DecisionTree_1.DecisionTree(new DecisionNode_1.DecisionNode(trainSet, undefined, undefined, true));
        }
    }
    exports.C45Stump = C45Stump;
});
//# sourceMappingURL=C45Stump.js.map