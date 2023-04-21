(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../Model/KnnModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Knn = void 0;
    const Classifier_1 = require("./Classifier");
    const KnnModel_1 = require("../Model/KnnModel");
    class Knn extends Classifier_1.Classifier {
        /**
         * Training algorithm for K-nearest neighbor classifier.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters K: k parameter of the K-nearest neighbor algorithm
         *                   distanceMetric: distance metric used to calculate the distance between two instances.
         */
        train(trainSet, parameters) {
            this.model = new KnnModel_1.KnnModel(trainSet, parameters.getK(), parameters.getDistanceMetric());
        }
        loadModel(fileName) {
            this.model = new KnnModel_1.KnnModel(fileName);
        }
    }
    exports.Knn = Knn;
});
//# sourceMappingURL=Knn.js.map