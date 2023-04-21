(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../InstanceList/InstanceList", "../InstanceList/Partition", "../Model/KMeansModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KMeans = void 0;
    const Classifier_1 = require("./Classifier");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const Partition_1 = require("../InstanceList/Partition");
    const KMeansModel_1 = require("../Model/KMeansModel");
    class KMeans extends Classifier_1.Classifier {
        /**
         * Training algorithm for K-Means classifier. K-Means finds the mean of each class for training.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters distanceMetric: distance metric used to calculate the distance between two instances.
         */
        train(trainSet, parameters) {
            let priorDistribution = trainSet.classDistribution();
            let classMeans = new InstanceList_1.InstanceList();
            let classLists = new Partition_1.Partition(trainSet);
            for (let i = 0; i < classLists.size(); i++) {
                classMeans.add(classLists.get(i).average());
            }
            this.model = new KMeansModel_1.KMeansModel(priorDistribution, classMeans, parameters.getDistanceMetric());
        }
        loadModel(fileName) {
            this.model = new KMeansModel_1.KMeansModel(fileName);
        }
    }
    exports.KMeans = KMeans;
});
//# sourceMappingURL=KMeans.js.map