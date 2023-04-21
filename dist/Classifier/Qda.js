(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "nlptoolkit-math/dist/Vector", "../InstanceList/Partition", "../Model/QdaModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Qda = void 0;
    const Classifier_1 = require("./Classifier");
    const Vector_1 = require("nlptoolkit-math/dist/Vector");
    const Partition_1 = require("../InstanceList/Partition");
    const QdaModel_1 = require("../Model/QdaModel");
    class Qda extends Classifier_1.Classifier {
        /**
         * Training algorithm for the quadratic discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters -
         */
        train(trainSet, parameters) {
            let determinant = 0;
            let w0 = new Map();
            let w = new Map();
            let W = new Map();
            let classLists = new Partition_1.Partition(trainSet);
            let priorDistribution = trainSet.classDistribution();
            for (let i = 0; i < classLists.size(); i++) {
                let Ci = classLists.get(i).getClassLabel();
                let averageVector = new Vector_1.Vector(classLists.get(i).continuousAttributeAverage());
                let classCovariance = classLists.get(i).covariance(averageVector);
                determinant = classCovariance.determinant();
                classCovariance.inverse();
                let Wi = classCovariance.clone();
                Wi.multiplyWithConstant(-0.5);
                W.set(Ci, Wi);
                let wi = classCovariance.multiplyWithVectorFromLeft(averageVector);
                w.set(Ci, wi);
                let w0i = -0.5 * (wi.dotProduct(averageVector) + Math.log(determinant)) + Math.log(priorDistribution.getProbability(Ci));
                w0.set(Ci, w0i);
            }
            this.model = new QdaModel_1.QdaModel(priorDistribution, W, w, w0);
        }
        loadModel(fileName) {
            this.model = new QdaModel_1.QdaModel(fileName);
        }
    }
    exports.Qda = Qda;
});
//# sourceMappingURL=Qda.js.map